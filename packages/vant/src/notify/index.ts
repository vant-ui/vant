import { withInstall } from '../utils';
import _Notify from './Notify';

export const Notify = withInstall(_Notify);
export default Notify;
export {
  showNotify,
  hideNotify,
  setNotifyDefaultOptions,
  resetNotifyDefaultOptions,
} from './function-call';

export type { NotifyProps } from './Notify';
export type { NotifyType, NotifyOptions } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VanNotify: typeof Notify.Component;
  }
}
