import { withInstall } from '../utils';
import _Tabs, { TabsProps } from './Tabs';

export const Tabs = withInstall(_Tabs);
export default Tabs;
export type { TabsProps };
export type { TabsType, TabsInstance } from './types';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanTabs: typeof Tabs;
  }
}
