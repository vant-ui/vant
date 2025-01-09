import {
  ref,
  watch,
  computed,
  reactive,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue';

// Utils
import {
  clamp,
  numericProp,
  preventDefault,
  createNamespace,
  makeRequiredProp,
  LONG_PRESS_START_TIME,
  type ComponentInstance,
  makeNumberProp,
} from '../utils';

// Composables
import { useExpose } from '../composables/use-expose';
import { useTouch } from '../composables/use-touch';
import { raf, useEventListener, useRect } from '@vant/use';

// Components
import { Image } from '../image';
import { Loading } from '../loading';
import { SwipeItem } from '../swipe-item';

const getDistance = (touches: TouchList) =>
  Math.sqrt(
    (touches[0].clientX - touches[1].clientX) ** 2 +
      (touches[0].clientY - touches[1].clientY) ** 2,
  );

const getCenter = (touches: TouchList) => ({
  x: (touches[0].clientX + touches[1].clientX) / 2,
  y: (touches[0].clientY + touches[1].clientY) / 2,
});

const bem = createNamespace('image-preview')[1];

const longImageRatio = 2.6;

const imagePreviewItemProps = {
  src: String,
  show: Boolean,
  active: Number,
  minZoom: makeRequiredProp(numericProp),
  maxZoom: makeRequiredProp(numericProp),
  rootWidth: makeRequiredProp(Number),
  rootHeight: makeRequiredProp(Number),
  disableZoom: Boolean,
  doubleScale: Boolean,
  closeOnClickImage: Boolean,
  closeOnClickOverlay: Boolean,
  vertical: Boolean,
  rotateAngle: makeNumberProp(0),
};

export type ImagePreviewItemProps = ExtractPropTypes<
  typeof imagePreviewItemProps
>;

export default defineComponent({
  props: imagePreviewItemProps,

  emits: ['scale', 'close', 'longPress'],

  setup(props, { emit, slots }) {
    const state = reactive({
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      initializing: false,
      imageRatio: 0,
    });

    const touch = useTouch();
    const imageRef = ref<ComponentInstance>();
    const swipeItem = ref<ComponentInstance>();
    const vertical = ref(false);
    const isLongImage = ref(false);

    let initialMoveY = 0;

    const getRotatedDimensions = (
      width: number,
      height: number,
      angle: number,
    ) => {
      const radians = (Math.abs(angle) * Math.PI) / 180;
      const sin = Math.sin(radians);
      const cos = Math.cos(radians);
      const rotatedWidth = Math.abs(width * cos) + Math.abs(height * sin);
      const rotatedHeight = Math.abs(width * sin) + Math.abs(height * cos);
      return { width: rotatedWidth, height: rotatedHeight };
    };

    const getContainScale = computed(() => {
      if (!state.imageRatio) return 1;
      const { rootWidth, rootHeight, rotateAngle } = props;
      const naturalWidth = rootWidth;
      const naturalHeight = naturalWidth * state.imageRatio;
      const rotated = getRotatedDimensions(
        naturalWidth,
        naturalHeight,
        rotateAngle,
      );
      const scaleX = rootWidth / rotated.width;
      const scaleY = rootHeight / rotated.height;
      return Math.min(scaleX, scaleY);
    });
    watch(
      () => props.rotateAngle,
      () => {
        adjustPositionAfterRotate();
      },
    );

    const adjustPositionAfterRotate = () => {
      if (state.scale === 1) {
        state.moveX = 0;
        state.moveY = isLongImage.value ? initialMoveY : 0;
        return;
      }
      state.moveX = clamp(state.moveX, -maxMoveX.value, maxMoveX.value);
      state.moveY = clamp(state.moveY, -maxMoveY.value, maxMoveY.value);
      if (
        Math.abs(state.moveX) > maxMoveX.value ||
        Math.abs(state.moveY) > maxMoveY.value
      ) {
        state.moveX = 0;
        state.moveY = 0;
      }
    };

    const imageStyle = computed(() => {
      const { scale, moveX, moveY, moving, zooming, initializing } = state;
      const style: CSSProperties = {
        transitionDuration: zooming || moving || initializing ? '0s' : '.3s',
      };

      const transforms: string[] = [];
      const actualScale = scale * getContainScale.value;

      if (actualScale !== 1 || isLongImage.value) {
        transforms.push(
          `matrix(${actualScale}, 0, 0, ${actualScale}, ${moveX}, ${moveY})`,
        );
      }

      if (props.rotateAngle !== 0) {
        const angle = (props.rotateAngle * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        transforms.push(`matrix(${cos}, ${sin}, ${-sin}, ${cos}, 0, 0)`);
      }

      if (transforms.length) {
        style.transform = transforms.join(' ');
      }

      return style;
    });

    // 添加旋转后的尺寸计算
    const getRotatedImageSize = computed(() => {
      const { rootWidth } = props;
      const naturalWidth = rootWidth;
      const naturalHeight = naturalWidth * state.imageRatio;
      const { width: rotatedWidth, height: rotatedHeight } =
        getRotatedDimensions(naturalWidth, naturalHeight, props.rotateAngle);
      return {
        width: rotatedWidth,
        height: rotatedHeight,
      };
    });

    const maxMoveX = computed(() => {
      if (state.imageRatio) {
        const { rootWidth } = props;
        const { width: rotatedWidth } = getRotatedImageSize.value;
        const scaledWidth = rotatedWidth * state.scale * getContainScale.value;

        return Math.max(0, (scaledWidth - rootWidth) / 2);
      }
      return 0;
    });

    const maxMoveY = computed(() => {
      if (state.imageRatio) {
        const { rootHeight } = props;
        const { height: rotatedHeight } = getRotatedImageSize.value;
        const scaledHeight =
          rotatedHeight * state.scale * getContainScale.value;

        return Math.max(0, (scaledHeight - rootHeight) / 2);
      }
      return 0;
    });

    const setScale = (scale: number, center?: { x: number; y: number }) => {
      scale = clamp(scale, +props.minZoom, +props.maxZoom + 1);

      if (scale !== state.scale) {
        const ratio = scale / state.scale;
        state.scale = scale;

        if (center) {
          const imageRect = useRect(imageRef.value?.$el);
          const origin = {
            x: imageRect.width * 0.5,
            y: imageRect.height * 0.5,
          };
          const moveX =
            state.moveX - (center.x - imageRect.left - origin.x) * (ratio - 1);
          const moveY =
            state.moveY - (center.y - imageRect.top - origin.y) * (ratio - 1);

          state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
          state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
        } else {
          state.moveX = 0;
          state.moveY = isLongImage.value ? initialMoveY : 0;
        }

        emit('scale', {
          scale,
          index: props.active,
        });
      }
    };

    const resetScale = () => {
      setScale(1);
    };

    const toggleScale = () => {
      const scale = state.scale > 1 ? 1 : 2;

      setScale(
        scale,
        scale === 2 || isLongImage.value
          ? { x: touch.startX.value, y: touch.startY.value }
          : undefined,
      );
    };

    let fingerNum: number;
    let startMoveX: number;
    let startMoveY: number;
    let startScale: number;
    let startDistance: number;
    let lastCenter: { x: number; y: number };
    let doubleTapTimer: ReturnType<typeof setTimeout> | null;
    let touchStartTime: number;
    let isImageMoved = false;

    const onTouchStart = (event: TouchEvent) => {
      const { touches } = event;
      fingerNum = touches.length;

      if (fingerNum === 2 && props.disableZoom) {
        return;
      }

      const { offsetX } = touch;

      touch.start(event);

      startMoveX = state.moveX;
      startMoveY = state.moveY;
      touchStartTime = Date.now();

      // whether the image position is moved after scaling
      isImageMoved = false;

      state.moving =
        fingerNum === 1 && (state.scale !== 1 || isLongImage.value);
      state.zooming = fingerNum === 2 && !offsetX.value;

      if (state.zooming) {
        startScale = state.scale;
        startDistance = getDistance(touches);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const { touches } = event;

      touch.move(event);

      if (state.moving) {
        const { deltaX, deltaY } = touch;
        const moveX = deltaX.value + startMoveX;
        const moveY = deltaY.value + startMoveY;

        // if the image is moved to the edge, no longer trigger move,
        // allow user to swipe to next image
        if (
          (props.vertical
            ? touch.isVertical() && Math.abs(moveY) > maxMoveY.value
            : touch.isHorizontal() && Math.abs(moveX) > maxMoveX.value) &&
          !isImageMoved
        ) {
          state.moving = false;
          return;
        }

        isImageMoved = true;
        preventDefault(event, true);
        state.moveX = clamp(moveX, -maxMoveX.value, maxMoveX.value);
        state.moveY = clamp(moveY, -maxMoveY.value, maxMoveY.value);
      }

      if (state.zooming) {
        preventDefault(event, true);

        if (touches.length === 2) {
          const distance = getDistance(touches);
          const scale = (startScale * distance) / startDistance;
          lastCenter = getCenter(touches);
          setScale(scale, lastCenter);
        }
      }
    };

    const checkClose = (event: TouchEvent) => {
      const swipeItemEl: HTMLElement = swipeItem.value?.$el;

      if (!swipeItemEl) return;

      const imageEl = swipeItemEl.firstElementChild;
      const isClickOverlay = event.target === swipeItemEl;
      const isClickImage = imageEl?.contains(event.target as HTMLElement);

      if (!props.closeOnClickImage && isClickImage) return;
      if (!props.closeOnClickOverlay && isClickOverlay) return;

      emit('close');
    };

    const checkTap = (event: TouchEvent) => {
      if (fingerNum > 1) {
        return;
      }

      const deltaTime = Date.now() - touchStartTime;

      // Same as the default value of iOS double tap timeout
      const TAP_TIME = 250;

      if (touch.isTap.value) {
        if (deltaTime < TAP_TIME) {
          // allow double to scale
          if (props.doubleScale) {
            // tap or double tap
            if (doubleTapTimer) {
              clearTimeout(doubleTapTimer);
              doubleTapTimer = null;
              toggleScale();
            } else {
              doubleTapTimer = setTimeout(() => {
                checkClose(event);
                doubleTapTimer = null;
              }, TAP_TIME);
            }
          } else {
            checkClose(event);
          }
        }
        // long press
        else if (deltaTime > LONG_PRESS_START_TIME) {
          emit('longPress');
        }
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      let stopPropagation = false;

      /* istanbul ignore else */
      if (state.moving || state.zooming) {
        stopPropagation = true;

        if (
          state.moving &&
          startMoveX === state.moveX &&
          startMoveY === state.moveY
        ) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          if (state.zooming) {
            state.moveX = clamp(state.moveX, -maxMoveX.value, maxMoveX.value);
            state.moveY = clamp(state.moveY, -maxMoveY.value, maxMoveY.value);
            state.zooming = false;
          }

          state.moving = false;
          startMoveX = 0;
          startMoveY = 0;
          startScale = 1;

          if (state.scale < 1) {
            resetScale();
          }

          const maxZoom = +props.maxZoom;
          if (state.scale > maxZoom) {
            setScale(maxZoom, lastCenter);
          }
        }
      }

      // eliminate tap delay on safari
      preventDefault(event, stopPropagation);

      checkTap(event);
      touch.reset();
    };

    const resize = () => {
      const { rootWidth, rootHeight } = props;
      const rootRatio = rootHeight / rootWidth;
      const { imageRatio } = state;

      vertical.value =
        state.imageRatio > rootRatio && imageRatio < longImageRatio;
      isLongImage.value =
        state.imageRatio > rootRatio && imageRatio >= longImageRatio;

      if (isLongImage.value) {
        initialMoveY = (imageRatio * rootWidth - rootHeight) / 2;
        state.moveY = initialMoveY;
        state.initializing = true;
        raf(() => {
          state.initializing = false;
        });
      }

      resetScale();
    };

    const onLoad = (event: Event) => {
      const { naturalWidth, naturalHeight } = event.target as HTMLImageElement;
      state.imageRatio = naturalHeight / naturalWidth;
      resize();
    };

    watch(() => props.active, resetScale);
    watch(
      () => props.show,
      (value) => {
        if (!value) {
          resetScale();
        }
      },
    );
    watch(() => [props.rootWidth, props.rootHeight], resize);

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    useEventListener('touchmove', onTouchMove, {
      target: computed(() => swipeItem.value?.$el),
    });

    useExpose({ resetScale });

    return () => {
      const imageSlots = {
        loading: () => <Loading type="spinner" />,
      };

      return (
        <SwipeItem
          ref={swipeItem}
          class={bem('swipe-item')}
          onTouchstartPassive={onTouchStart}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
        >
          {slots.image ? (
            <div class={bem('image-wrap')}>
              {slots.image({
                src: props.src,
                onLoad,
                style: imageStyle.value,
              })}
            </div>
          ) : (
            <Image
              v-slots={imageSlots}
              ref={imageRef}
              src={props.src}
              fit="contain"
              class={bem('image', { vertical: vertical.value })}
              style={imageStyle.value}
              onLoad={onLoad}
            />
          )}
        </SwipeItem>
      );
    };
  },
});
