import { ref, Ref, reactive, computed, PropType, defineComponent } from 'vue';

// Utils
import { range, isDef, createNamespace, preventDefault } from '../utils';
import { callInterceptor, Interceptor } from '../utils/interceptor';

// Composables
import { useRect, useClickAway } from '@vant/use';
import { useTouch } from '../composables/use-touch';
import { useExpose } from '../composables/use-expose';

const [name, bem] = createNamespace('swipe-cell');

export type SwipeCellSide = 'left' | 'right';
export type SwipeCellPosition = SwipeCellSide | 'cell' | 'outside';

export default defineComponent({
  name,

  props: {
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function as PropType<Interceptor>,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: '',
    },
  },

  emits: ['open', 'close', 'click'],

  setup(props, { emit, slots }) {
    let opened: boolean;
    let lockClick: boolean;
    let startOffset: number;

    const root = ref<HTMLElement>();
    const leftRef = ref<HTMLElement>();
    const rightRef = ref<HTMLElement>();

    const state = reactive({
      offset: 0,
      dragging: false,
    });

    const touch = useTouch();

    const getWidthByRef = (ref: Ref<HTMLElement | undefined>) =>
      ref.value ? useRect(ref).width : 0;

    const leftWidth = computed(() =>
      isDef(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef)
    );

    const rightWidth = computed(() =>
      isDef(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef)
    );

    const open = (side: SwipeCellSide) => {
      opened = true;
      state.offset = side === 'left' ? leftWidth.value : -rightWidth.value;

      emit('open', {
        name: props.name,
        position: side,
      });
    };

    const close = (position: SwipeCellPosition) => {
      state.offset = 0;

      if (opened) {
        opened = false;
        emit('close', {
          name: props.name,
          position,
        });
      }
    };

    const toggle = (side: SwipeCellSide) => {
      const offset = Math.abs(state.offset);
      const THRESHOLD = 0.15;
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      const width = side === 'left' ? leftWidth.value : rightWidth.value;

      if (width && offset > width * threshold) {
        open(side);
      } else {
        close(side);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!props.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (props.disabled) {
        return;
      }

      const { deltaX } = touch;
      touch.move(event);

      if (touch.isHorizontal()) {
        lockClick = true;
        state.dragging = true;

        const isEdge = !opened || deltaX.value * startOffset < 0;
        if (isEdge) {
          preventDefault(event, props.stopPropagation);
        }

        state.offset = range(
          deltaX.value + startOffset,
          -rightWidth.value,
          leftWidth.value
        );
      }
    };

    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? 'left' : 'right');

        // compatible with desktop scenario
        setTimeout(() => {
          lockClick = false;
        }, 0);
      }
    };

    const onClick = (position: SwipeCellPosition = 'outside') => {
      emit('click', position);

      if (opened && !lockClick) {
        callInterceptor({
          interceptor: props.beforeClose,
          args: [
            {
              name: props.name,
              position,
            },
          ],
          done: () => close(position),
        });
      }
    };

    const getClickHandler = (position: SwipeCellPosition, stop?: boolean) => (
      event: MouseEvent
    ) => {
      if (stop) {
        event.stopPropagation();
      }
      onClick(position);
    };

    const renderSideContent = (
      side: SwipeCellSide,
      ref: Ref<HTMLElement | undefined>
    ) => {
      const contentSlot = slots[side];
      if (contentSlot) {
        return (
          <div
            ref={ref}
            class={bem(side)}
            onClick={getClickHandler(side, true)}
          >
            {contentSlot()}
          </div>
        );
      }
    };

    useExpose({
      open,
      close,
    });

    useClickAway(root, () => onClick('outside'), { eventName: 'touchstart' });

    return () => {
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? '0s' : '.6s',
      };

      return (
        <div
          ref={root}
          class={bem()}
          onClick={getClickHandler('cell')}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
        >
          <div class={bem('wrapper')} style={wrapperStyle}>
            {renderSideContent('left', leftRef)}
            {slots.default?.()}
            {renderSideContent('right', rightRef)}
          </div>
        </div>
      );
    };
  },
});
