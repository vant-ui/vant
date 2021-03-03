import { App, Plugin, TeleportProps } from 'vue';
import { ComponentInstance, inBrowser } from '../utils';
import { mountComponent, usePopupState } from '../utils/mount-component';
import { Interceptor } from '../utils/interceptor';
import { PopupCloseIconPosition } from '../popup';
import VanImagePreview from './ImagePreview';

let instance: ComponentInstance;

export type ImagePreviewOptions = {
  loop?: boolean;
  images: string[];
  maxZoom?: number;
  minZoom?: number;
  teleport?: TeleportProps['to'];
  className?: unknown;
  showIndex?: boolean;
  closeable?: boolean;
  closeIcon?: string;
  beforeClose?: Interceptor;
  swipeDuration?: number;
  startPosition?: number;
  showIndicators?: boolean;
  closeOnPopstate?: boolean;
  closeIconPosition?: PopupCloseIconPosition;
  onClose?(): void;
  onScale?(args: { scale: number; index: number }): void;
  onChange?(index: number): void;
};

const defaultConfig: ImagePreviewOptions = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: undefined,
  onClose: undefined,
  onChange: undefined,
  teleport: 'body',
  className: '',
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  beforeClose: undefined,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: 'top-right',
};

function initInstance() {
  ({ instance } = mountComponent({
    setup() {
      const { state, toggle } = usePopupState();
      const onClosed = () => {
        (state as any).images = [];
      };

      return () => (
        <VanImagePreview
          {...{
            ...state,
            onClosed,
            'onUpdate:show': toggle,
          }}
        />
      );
    },
  }));
}

const ImagePreview = (
  images: string[] | ImagePreviewOptions,
  startPosition = 0
) => {
  /* istanbul ignore if */
  if (!inBrowser) {
    return;
  }

  if (!instance) {
    initInstance();
  }

  const options = Array.isArray(images) ? { images, startPosition } : images;

  instance.open({
    ...defaultConfig,
    ...options,
  });

  return instance;
};

ImagePreview.Component = VanImagePreview;

ImagePreview.install = (app: App) => {
  app.use((VanImagePreview as unknown) as Plugin);
};

export default ImagePreview;
