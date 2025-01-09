import {
  ref,
  watch,
  nextTick,
  reactive,
  onMounted,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
  type TeleportProps,
} from 'vue';

// Utils
import {
  pick,
  truthProp,
  unknownProp,
  Interceptor,
  windowWidth,
  windowHeight,
  makeArrayProp,
  makeStringProp,
  makeNumericProp,
  callInterceptor,
  createNamespace,
  HAPTICS_FEEDBACK,
} from '../utils';

// Composables
import { useRect } from '@vant/use';
import { useExpose } from '../composables/use-expose';

// Components
import { Icon } from '../icon';
import { Swipe, SwipeInstance, SwipeToOptions } from '../swipe';
import { Popup, PopupCloseIconPosition } from '../popup';
import ImagePreviewItem from './ImagePreviewItem';

// Types
import {
  ImagePreviewScaleEventParams,
  ImagePreviewItemInstance,
} from './types';

const [name, bem] = createNamespace('image-preview');

const popupProps = [
  'show',
  'teleport',
  'transition',
  'overlayStyle',
  'closeOnPopstate',
] as const;

export const imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp<string>(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  vertical: Boolean,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: makeStringProp('clear'),
  transition: String,
  beforeClose: Function as PropType<Interceptor>,
  doubleScale: truthProp,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  showIndicators: Boolean,
  closeOnPopstate: truthProp,
  closeOnClickImage: truthProp,
  closeOnClickOverlay: truthProp,
  closeIconPosition: makeStringProp<PopupCloseIconPosition>('top-right'),
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  rotate: Boolean,
};

export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>;

export default defineComponent({
  name,

  props: imagePreviewProps,

  emits: ['scale', 'close', 'closed', 'change', 'longPress', 'update:show'],

  setup(props, { emit, slots }) {
    const swipeRef = ref<SwipeInstance>();
    const activedPreviewItemRef = ref<ImagePreviewItemInstance>();

    const state = reactive({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      disableZoom: false,
      rotateAngles: [] as number[],
    });

    const handleRotate = (direction: 'left' | 'right') => {
      if (!props.rotate) return;
      const angle = 90 * (direction === 'left' ? -1 : 1);
      // 更新当前图片的旋转角度
      state.rotateAngles[state.active] =
        (state.rotateAngles[state.active] || 0) + angle;
    };

    const resize = () => {
      if (swipeRef.value) {
        const rect = useRect(swipeRef.value.$el);
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };

    const emitScale = (args: ImagePreviewScaleEventParams) =>
      emit('scale', args);

    const updateShow = (show: boolean) => emit('update:show', show);

    const emitClose = () => {
      callInterceptor(props.beforeClose, {
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

    const onDragStart = () => {
      state.disableZoom = true;
    };

    const onDragEnd = () => {
      state.disableZoom = false;
    };

    const renderRotateButtons = () => {
      if (!props.rotate) return null;

      return (
        <div class={bem('rotate-buttons')}>
          <button
            class={bem('rotate-button')}
            onClick={() => handleRotate('left')}
          >
            <Icon
              role="button"
              name="replay"
              class={bem('rotate-icon--reverse')}
            />
          </button>
          <button
            class={bem('rotate-button')}
            onClick={() => handleRotate('right')}
          >
            <Icon role="button" name="replay" />
          </button>
        </div>
      );
    };

    const renderImages = () => (
      <Swipe
        ref={swipeRef}
        lazyRender
        loop={props.loop}
        class={bem('swipe')}
        vertical={props.vertical}
        duration={props.swipeDuration}
        initialSwipe={props.startPosition}
        showIndicators={props.showIndicators}
        indicatorColor="white"
        onChange={setActive}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        {props.images.map((image, index) => (
          <ImagePreviewItem
            v-slots={{
              image: slots.image,
            }}
            rotateAngle={state.rotateAngles[index]}
            ref={(item) => {
              if (index === state.active) {
                activedPreviewItemRef.value = item as ImagePreviewItemInstance;
              }
            }}
            src={image}
            show={props.show}
            active={state.active}
            maxZoom={props.maxZoom}
            minZoom={props.minZoom}
            rootWidth={state.rootWidth}
            rootHeight={state.rootHeight}
            disableZoom={state.disableZoom}
            doubleScale={props.doubleScale}
            closeOnClickImage={props.closeOnClickImage}
            closeOnClickOverlay={props.closeOnClickOverlay}
            vertical={props.vertical}
            onScale={emitScale}
            onClose={emitClose}
            onLongPress={() => emit('longPress', { index })}
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
            class={[
              bem('close-icon', props.closeIconPosition),
              HAPTICS_FEEDBACK,
            ]}
            onClick={emitClose}
          />
        );
      }
    };

    const onClosed = () => emit('closed');

    const swipeTo = (index: number, options?: SwipeToOptions) =>
      swipeRef.value?.swipeTo(index, options);

    useExpose({
      resetScale: () => {
        activedPreviewItemRef.value?.resetScale();
      },
      swipeTo,
    });

    onMounted(resize);

    watch([windowWidth, windowHeight], resize);

    watch(
      () => props.startPosition,
      (value) => setActive(+value),
    );

    watch(
      () => props.show,
      (value) => {
        const { images, startPosition } = props;
        if (value) {
          state.rotateAngles = images.map(() => 0);
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
      },
    );

    return () => (
      <Popup
        class={[bem(), props.className]}
        overlayClass={[bem('overlay'), props.overlayClass]}
        onClosed={onClosed}
        onUpdate:show={updateShow}
        {...pick(props, popupProps)}
      >
        {renderClose()}
        {renderImages()}
        {renderIndex()}
        {renderRotateButtons()}
        {renderCover()}
      </Popup>
    );
  },
});
