import {
  ref,
  watch,
  nextTick,
  PropType,
  reactive,
  onMounted,
  CSSProperties,
  defineComponent,
} from 'vue';

// Utils
import {
  pick,
  UnknownProp,
  createNamespace,
  ComponentInstance,
} from '../utils';
import { callInterceptor, Interceptor } from '../utils/interceptor';

// Composables
import { useWindowSize } from '@vant/use';
import { useExpose } from '../composables/use-expose';

// Components
import Icon from '../icon';
import Swipe, { SwipeToOptions } from '../swipe';
import Popup, { PopupCloseIconPosition } from '../popup';
import ImagePreviewItem from './ImagePreviewItem';

const [name, bem] = createNamespace('image-preview');

export type ScaleEventParams = {
  scale: number;
  index: number;
};

export default defineComponent({
  name,

  props: {
    show: Boolean,
    closeable: Boolean,
    transition: String,
    className: UnknownProp,
    beforeClose: Function as PropType<Interceptor>,
    overlayStyle: Object as PropType<CSSProperties>,
    showIndicators: Boolean,
    images: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    loop: {
      type: Boolean,
      default: true,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    minZoom: {
      type: [Number, String],
      default: 1 / 3,
    },
    maxZoom: {
      type: [Number, String],
      default: 3,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    swipeDuration: {
      type: [Number, String],
      default: 300,
    },
    startPosition: {
      type: [Number, String],
      default: 0,
    },
    closeIcon: {
      type: String,
      default: 'clear',
    },
    closeOnPopstate: {
      type: Boolean,
      default: true,
    },
    closeIconPosition: {
      type: String as PropType<PopupCloseIconPosition>,
      default: 'top-right',
    },
  },

  emits: ['scale', 'close', 'closed', 'change', 'update:show'],

  setup(props, { emit, slots }) {
    const swipeRef = ref<ComponentInstance>();
    const windowSize = useWindowSize();

    const state = reactive({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
    });

    const resize = () => {
      if (swipeRef.value) {
        const rect = swipeRef.value.$el.getBoundingClientRect();
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };

    const emitScale = (args: ScaleEventParams) => emit('scale', args);

    const updateShow = (show: boolean) => emit('update:show', show);

    const emitClose = () => {
      callInterceptor({
        interceptor: props.beforeClose,
        args: [state.active],
        done: () => updateShow(false),
      });
    };

    const setActive = (active: number) => {
      if (active !== state.active) {
        state.active = active;
        emit('change', active);
      }
    };

    const renderIndex = () => {
      if (props.showIndex) {
        return (
          <div class={bem('index')}>
            {slots.index
              ? slots.index({ index: state.active })
              : `${state.active + 1} / ${props.images.length}`}
          </div>
        );
      }
    };

    const renderCover = () => {
      if (slots.cover) {
        return <div class={bem('cover')}>{slots.cover()}</div>;
      }
    };

    const renderImages = () => (
      <Swipe
        ref={swipeRef}
        lazyRender
        loop={props.loop}
        class={bem('swipe')}
        duration={props.swipeDuration}
        initialSwipe={props.startPosition}
        showIndicators={props.showIndicators}
        indicatorColor="white"
        onChange={setActive}
      >
        {props.images.map((image) => (
          <ImagePreviewItem
            src={image}
            show={props.show}
            active={state.active}
            maxZoom={props.maxZoom}
            minZoom={props.minZoom}
            rootWidth={state.rootWidth}
            rootHeight={state.rootHeight}
            onScale={emitScale}
            onClose={emitClose}
          />
        ))}
      </Swipe>
    );

    const renderClose = () => {
      if (props.closeable) {
        return (
          <Icon
            role="button"
            name={props.closeIcon}
            class={bem('close-icon', props.closeIconPosition)}
            onClick={emitClose}
          />
        );
      }
    };

    const onClosed = () => emit('closed');

    const swipeTo = (index: number, options?: SwipeToOptions) =>
      swipeRef.value?.swipeTo(index, options);

    useExpose({ swipeTo });

    onMounted(resize);

    watch([windowSize.width, windowSize.height], resize);

    watch(
      () => props.startPosition,
      (value) => setActive(+value)
    );

    watch(
      () => props.show,
      (value) => {
        const { images, startPosition } = props;
        if (value) {
          setActive(+startPosition);
          nextTick(() => {
            resize();
            swipeTo(+startPosition, { immediate: true });
          });
        } else {
          emit('close', {
            index: state.active,
            url: images[state.active],
          });
        }
      }
    );

    return () => (
      <Popup
        class={[bem(), props.className]}
        overlayClass={bem('overlay')}
        onClosed={onClosed}
        {...{
          ...pick(props, [
            'show',
            'transition',
            'overlayStyle',
            'closeOnPopstate',
          ]),
          'onUpdate:show': updateShow,
        }}
      >
        {renderClose()}
        {renderImages()}
        {renderIndex()}
        {renderCover()}
      </Popup>
    );
  },
});
