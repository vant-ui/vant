import { withInstall } from '../utils';
import _RollingTextGroup from './RollingTextGroup';

export const RollingTextGroup = withInstall(_RollingTextGroup);
export default RollingTextGroup;

export type {
  RollingTextGroupInstance,
} from './types';

declare module 'vue' {
  export interface GlobalComponents {
    RollingTextGroup: typeof RollingTextGroup;
  }
}
