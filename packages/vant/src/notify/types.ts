import { Notify } from './function-call';

export type NotifyMessage = string | number;

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning';

export type NotifyPosition = 'top' | 'bottom';

export type NotifyOptions = {
  type?: NotifyType;
  color?: string;
  message?: NotifyMessage;
  duration?: number;
  position?: NotifyPosition;
  className?: unknown;
  background?: string;
  lockScroll?: boolean;
  onClick?: (event: MouseEvent) => void;
  onClose?: () => void;
  onOpened?: () => void;
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $notify: typeof Notify;
  }
}
