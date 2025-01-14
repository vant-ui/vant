import {
  PropType,
  Teleport,
  TeleportProps,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
  onActivated,
  onDeactivated,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue';

// Utils
import {
  pick,
  addUnit,
  closest,
  createNamespace,
  makeNumberProp,
  makeStringProp,
  windowWidth,
  windowHeight,
} from '../utils';

// Composables
import { useRect, useEventListener } from '@vant/use';
import { useTouch } from '../composables/use-touch';

// Components
import Icon from '../icon';

// Types
import {
  FloatingBubbleAxis,
  FloatingBubbleMagnetic,
  FloatingBubbleOffset,
  FloatingBubbleBoundary,
} from './types';

export const floatingBubbleProps = {
  gap: makeNumberProp(24),
  icon: String,
  axis: makeStringProp<FloatingBubbleAxis>('y'),
  magnetic: String as PropType<FloatingBubbleMagnetic>,
  offset: {
    type: Object as unknown as PropType<FloatingBubbleOffset>,
    default: () => ({ x: -1, y: -1 }),
  },
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
};

export type FloatingBubbleProps = ExtractPropTypes<typeof floatingBubbleProps>;

const [name, bem] = createNamespace('floating-bubble');

export default defineComponent({
  name,

  inheritAttrs: false,

  props: floatingBubbleProps,

  emits: ['click', 'update:offset', 'offsetChange'],

  setup(props, { slots, emit, attrs }) {
    const rootRef = ref<HTMLDivElement>();

    const state = ref({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const boundary = computed<FloatingBubbleBoundary>(() => ({
      top: props.gap,
      right: windowWidth.value - state.value.width - props.gap,
      bottom: windowHeight.value - state.value.height - props.gap,
      left: props.gap,
    }));

    const dragging = ref(false);
    let initialized = false;

    const rootStyle = computed(() => {
      const style: CSSProperties = {};

      const x = addUnit(state.value.x);
      const y = addUnit(state.value.y);
      style.transform = `translate3d(${x}, ${y}, 0)`;

      if (dragging.value || !initialized) {
        style.transition = 'none';
      }

      return style;
    });

    const updateState = () => {
      // onDeactivated with window size change will cause this
      if (!show.value) return;

      const { width, height } = useRect(rootRef.value!);
      const { offset } = props;
      state.value = {
        x: offset.x > -1 ? offset.x : windowWidth.value - width - props.gap + offset.x,
        y: offset.y > -1 ? offset.y : windowHeight.value - height - props.gap + offset.y,
        width,
        height,
      };
    };

    const touch = useTouch();
    let prevX = 0;
    let prevY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touch.start(e);
      dragging.value = true;

      prevX = state.value.x;
      prevY = state.value.y;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      touch.move(e);

      if (props.axis === 'lock') return;

      if (!touch.isTap.value) {
        if (props.axis === 'x' || props.axis === 'xy') {
          let nextX = prevX + touch.deltaX.value;
          if (nextX < boundary.value.left) nextX = boundary.value.left;
          if (nextX > boundary.value.right) nextX = boundary.value.right;
          state.value.x = nextX;
        }

        if (props.axis === 'y' || props.axis === 'xy') {
          let nextY = prevY + touch.deltaY.value;
          if (nextY < boundary.value.top) nextY = boundary.value.top;
          if (nextY > boundary.value.bottom) nextY = boundary.value.bottom;
          state.value.y = nextY;
        }

        const offset = pick(state.value, ['x', 'y']);
        emit('update:offset', offset);
      }
    };

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    useEventListener('touchmove', onTouchMove, {
      target: rootRef,
    });

    const onTouchEnd = () => {
      dragging.value = false;

      nextTick(() => {
        if (props.magnetic === 'x') {
          const nextX = closest(
            [boundary.value.left, boundary.value.right],
            state.value.x,
          );
          state.value.x = nextX;
        }
        if (props.magnetic === 'y') {
          const nextY = closest(
            [boundary.value.top, boundary.value.bottom],
            state.value.y,
          );
          state.value.y = nextY;
        }

        if (!touch.isTap.value) {
          const offset = pick(state.value, ['x', 'y']);
          emit('update:offset', offset);
          if (prevX !== offset.x || prevY !== offset.y) {
            emit('offsetChange', offset);
          }
        }
      });
    };

    const onClick = (e: MouseEvent) => {
      if (touch.isTap.value) emit('click', e);
      else e.stopPropagation();
    };

    onMounted(() => {
      updateState();
      nextTick(() => {
        initialized = true;
      });
    });

    watch(
      [windowWidth, windowHeight, () => props.gap, () => props.offset],
      updateState,
      { deep: true },
    );

    const show = ref(true);

    onActivated(() => {
      show.value = true;
    });

    onDeactivated(() => {
      if (props.teleport) {
        show.value = false;
      }
    });

    return () => {
      const Content = (
        <div
          class={bem()}
          ref={rootRef}
          onTouchstartPassive={onTouchStart}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
          onClickCapture={onClick}
          style={rootStyle.value}
          v-show={show.value}
          {...attrs}
        >
          {slots.default ? (
            slots.default()
          ) : (
            <Icon name={props.icon} class={bem('icon')} />
          )}
        </div>
      );
      return props.teleport ? (
        <Teleport to={props.teleport}>{Content}</Teleport>
      ) : (
        Content
      );
    };
  },
});
