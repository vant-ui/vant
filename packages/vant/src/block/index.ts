import { withInstall } from '../utils';
import _Block from './Block';

export const Block = withInstall(_Block);
export default Block;
export { blockProps } from './Block';
export type { BlockProps } from './Block';
export type { BlockThemeVars } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VanBlock: typeof Block;
  }
}
