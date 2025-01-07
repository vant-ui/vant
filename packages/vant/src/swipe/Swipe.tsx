import {
  ref,
  watch,
  reactive,
  computed,
  onMounted,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  defineComponent,
  nextTick,
  type ExtractPropTypes,
  type CSSProperties,
  type InjectionKey,
} from 'vue';

// Utils
import {
  clamp,
  isHidden,
  truthProp,
  numericProp,
  windowWidth,
  windowHeight,
  preventDefault,
  createNamespace,
  makeNumericProp,
  isRtl,
} from '../utils';

// Composables
import {
  doubleRaf,
  useChildren,
  useEventListener,
  usePageVisibility,
} from '@vant/use';
import { useTouch } from '../composables/use-touch';
import { useExpose } from '../composables/use-expose';
import { onPopupReopen } from '../composables/on-popup-reopen';

// Types
import { SwipeState, SwipeExpose, SwipeProvide, SwipeToOptions } from './types';

const [name, bem] = createNamespace('swipe');

export const swipeProps = {
  loop: truthProp,
  width: numericProp,
  height: numericProp,
  vertical: Boolean,
  autoplay: makeNumericProp(0),
  duration: makeNumericProp(500),
  touchable: truthProp,
  lazyRender: Boolean,
  initialSwipe: makeNumericProp(0),
  indicatorColor: String,
  showIndicators: truthProp,
  stopPropagation: truthProp,
};

export type SwipeProps = ExtractPropTypes<typeof swipeProps>;

export const SWIPE_KEY: InjectionKey<SwipeProvide> = Symbol(name);

export default defineComponent({
  name,

  props: swipeProps,

  emits: ['change', 'dragStart', 'dragEnd'],

  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>();
    const track = ref<HTMLElement>();
    const state = reactive<SwipeState>({
      rect: null,
      width: 0,
      height: 0,
      offset: 0,
      active: 0,
      swiping: false,
    });

    // Whether the user is dragging the swipe
    let dragging = false;
    let rtl = false;

    const touch = useTouch();
    const { children, linkChildren } = useChildren(SWIPE_KEY);

    const count = computed(() => children.length);

    const size = computed(() => state[props.vertical ? 'height' : 'width']);

    const delta = computed(() =>
      props.vertical ? touch.deltaY.value : touch.deltaX.value,
    );

    const minOffset = computed(() => {
      if (state.rect) {
        const base = props.vertical ? state.rect.height : state.rect.width;
        return rtl && !props.vertical
          ? size.value * count.value - base
          : base - size.value * count.value;
      }
      return 0;
    });

    const maxCount = computed(() =>
      size.value
        ? Math.ceil(Math.abs(minOffset.value) / size.value)
        : count.value,
    );

    const trackSize = computed(() => count.value * size.value);

    const activeIndicator = computed(() => {
      return (state.active + count.value) % count.value;
    });

    const isCorrectDirection = computed(() => {
      const expect = props.vertical ? 'vertical' : 'horizontal';
      return touch.direction.value === expect;
    });

    const trackStyle = computed(() => {
      const style: CSSProperties = {
        transitionDuration: `${state.swiping ? 0 : props.duration}ms`,
        transform: `translate${
          props.vertical ? 'Y' : 'X'
        }(${+state.offset.toFixed(2)}px)`,
      };

      if (size.value) {
        const mainAxis = props.vertical ? 'height' : 'width';
        const crossAxis = props.vertical ? 'width' : 'height';
        style[mainAxis] = `${trackSize.value}px`;
        style[crossAxis] = props[crossAxis] ? `${props[crossAxis]}px` : '';
      }

      return style;
    });

    const getTargetActive = (pace: number) => {
      const { active } = state;

      if (pace) {
        if (props.loop) {
          return clamp(active + pace, -1, count.value);
        }
        return clamp(active + pace, 0, maxCount.value);
      }
      return active;
    };

    const getTargetOffset = (targetActive: number, offset = 0) => {
      let currentPosition = targetActive * size.value;
      if (!props.loop) {
        currentPosition =
          rtl && !props.vertical
            ? Math.min(currentPosition, minOffset.value)
            : Math.min(currentPosition, -minOffset.value);
      }
      let targetOffset =
        rtl && !props.vertical
          ? offset + currentPosition
          : offset - currentPosition;
      if (!props.loop) {
        targetOffset =
          rtl && !props.vertical
            ? clamp(targetOffset, 0, minOffset.value)
            : clamp(targetOffset, minOffset.value, 0);
      }
      return targetOffset;
    };

    const move = ({
      pace = 0,
      offset = 0,
      emitChange,
    }: {
      pace?: number;
      offset?: number;
      emitChange?: boolean;
    }) => {
      if (count.value <= 1) {
        return;
      }

      const { active } = state;
      const targetActive = getTargetActive(pace);
      const targetOffset = getTargetOffset(targetActive, offset);
      // auto move first and last swipe in loop mode
      if (props.loop) {
        if (rtl && !props.vertical) {
          if (children[count.value - 1]) {
            const outRightBound = targetOffset < size.value;
            children[count.value - 1].setOffset(
              outRightBound ? trackSize.value : 0,
            );
          }

          if (children[0]) {
            const outLeftBound = targetOffset >= minOffset.value;
            children[0].setOffset(outLeftBound ? -trackSize.value : 0);
          }
        } else {
          if (children[0] && targetOffset !== minOffset.value) {
            const outRightBound = targetOffset < minOffset.value;
            children[0].setOffset(outRightBound ? trackSize.value : 0);
          }

          if (children[count.value - 1] && targetOffset !== 0) {
            const outLeftBound = targetOffset > 0;
            children[count.value - 1].setOffset(
              outLeftBound ? -trackSize.value : 0,
            );
          }
        }
      }
      state.active = targetActive;
      state.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        emit('change', activeIndicator.value);
      }
    };

    const correctPosition = () => {
      state.swiping = true;

      if (state.active <= -1) {
        move({ pace: count.value });
      } else if (state.active >= count.value) {
        move({ pace: -count.value });
      }
    };

    // swipe to prev item
    const prev = () => {
      correctPosition();
      touch.reset();

      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: -1,
          emitChange: true,
        });
      });
    };

    // swipe to next item
    const next = () => {
      correctPosition();
      touch.reset();

      doubleRaf(() => {
        state.swiping = false;
        move({
          pace: 1,
          emitChange: true,
        });
      });
    };

    let autoplayTimer: ReturnType<typeof setTimeout>;

    const stopAutoplay = () => clearTimeout(autoplayTimer);

    const autoplay = () => {
      stopAutoplay();
      if (+props.autoplay > 0 && count.value > 1) {
        autoplayTimer = setTimeout(() => {
          next();
          autoplay();
        }, +props.autoplay);
      }
    };

    // initialize swipe position
    const initialize = (active = +props.initialSwipe) => {
      if (!root.value) {
        return;
      }

      const cb = () => {
        if (!isHidden(root)) {
          const rect = {
            width: root.value!.offsetWidth,
            height: root.value!.offsetHeight,
          };
          state.rect = rect;
          state.width = +(props.width ?? rect.width);
          state.height = +(props.height ?? rect.height);
        }

        if (count.value) {
          active = Math.min(count.value - 1, active);

          if (active === -1) {
            active = count.value - 1;
          }
        }

        rtl = isRtl(root);
        state.active = active;
        state.swiping = true;
        state.offset = getTargetOffset(active);
        children.forEach((swipe) => {
          swipe.setOffset(0);
        });

        autoplay();
      };

      // issue: https://github.com/vant-ui/vant/issues/10052
      if (isHidden(root)) {
        nextTick().then(cb);
      } else {
        cb();
      }
    };

    const resize = () => initialize(state.active);

    let touchStartTime: number;

    const onTouchStart = (event: TouchEvent) => {
      if (
        !props.touchable ||
        // avoid resetting position on multi-finger touch
        event.touches.length > 1
      )
        return;

      touch.start(event);

      dragging = false;
      touchStartTime = Date.now();

      stopAutoplay();
      correctPosition();
    };

    const onTouchMove = (event: TouchEvent) => {
      if (props.touchable && state.swiping) {
        touch.move(event);

        if (isCorrectDirection.value) {
          const isEdgeTouch =
            !props.loop &&
            ((!rtl &&
              ((state.active === 0 && delta.value > 0) ||
                (state.active === count.value - 1 && delta.value < 0))) ||
              (rtl &&
                ((state.active === count.value - 1 && delta.value > 0) ||
                  (state.active === 0 && delta.value < 0)) &&
                !props.vertical));
          if (!isEdgeTouch) {
            preventDefault(event, props.stopPropagation);
            move({ offset: delta.value });

            if (!dragging) {
              emit('dragStart', { index: activeIndicator.value });
              dragging = true;
            }
          }
        }
      }
    };

    const onTouchEnd = () => {
      if (!props.touchable || !state.swiping) {
        return;
      }

      const duration = Date.now() - touchStartTime;
      const speed = delta.value / duration;
      const shouldSwipe =
        Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2;

      if (shouldSwipe && isCorrectDirection.value) {
        const offset = props.vertical
          ? touch.offsetY.value
          : touch.offsetX.value;
        let pace = 0;
        if (props.loop) {
          if (offset > 0) {
            pace = delta.value > 0 ? -1 : 1;
          } else {
            pace = 0;
          }
        } else {
          pace = -Math[delta.value > 0 ? 'ceil' : 'floor'](
            delta.value / size.value,
          );
        }
        pace = rtl && !props.vertical ? -pace : pace;

        move({
          pace,
          emitChange: true,
        });
      } else if (delta.value) {
        move({ pace: 0 });
      }

      dragging = false;
      state.swiping = false;

      emit('dragEnd', { index: activeIndicator.value });
      autoplay();
    };

    const swipeTo = (index: number, options: SwipeToOptions = {}) => {
      correctPosition();
      touch.reset();

      doubleRaf(() => {
        let targetIndex;
        if (props.loop && index === count.value) {
          targetIndex = state.active === 0 ? 0 : index;
        } else {
          targetIndex = index % count.value;
        }

        if (options.immediate) {
          doubleRaf(() => {
            state.swiping = false;
          });
        } else {
          state.swiping = false;
        }

        move({
          pace: targetIndex - state.active,
          emitChange: true,
        });
      });
    };

    const renderDot = (_: number, index: number) => {
      const active = index === activeIndicator.value;
      const style = active
        ? {
            backgroundColor: props.indicatorColor,
          }
        : undefined;

      return <i style={style} class={bem('indicator', { active })} />;
    };

    const renderIndicator = () => {
      if (slots.indicator) {
        return slots.indicator({
          active: activeIndicator.value,
          total: count.value,
        });
      }
      if (props.showIndicators && count.value > 1) {
        return (
          <div
            class={bem('indicators', {
              vertical: props.vertical,
              rtl: rtl,
            })}
          >
            {Array(count.value).fill('').map(renderDot)}
          </div>
        );
      }
    };

    useExpose<SwipeExpose>({
      prev,
      next,
      state,
      resize,
      swipeTo,
    });

    linkChildren({
      size,
      props,
      count,
      activeIndicator,
    });

    watch(
      () => props.initialSwipe,
      (value) => initialize(+value),
    );

    watch(count, () => initialize(state.active));
    watch(() => props.autoplay, autoplay);
    watch(
      [windowWidth, windowHeight, () => props.width, () => props.height],
      resize,
    );
    watch(usePageVisibility(), (visible) => {
      if (visible === 'visible') {
        autoplay();
      } else {
        stopAutoplay();
      }
    });

    onMounted(initialize);
    onActivated(() => initialize(state.active));
    onPopupReopen(() => initialize(state.active));
    onDeactivated(stopAutoplay);
    onBeforeUnmount(stopAutoplay);

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    useEventListener('touchmove', onTouchMove, {
      target: track,
    });

    return () => (
      <div ref={root} class={bem()}>
        <div
          ref={track}
          style={trackStyle.value}
          class={bem('track', { vertical: props.vertical })}
          onTouchstartPassive={onTouchStart}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
        >
          {slots.default?.()}
        </div>
        {renderIndicator()}
      </div>
    );
  },
});
