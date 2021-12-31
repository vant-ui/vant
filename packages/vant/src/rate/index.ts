import { withInstall } from '../utils';
import _Rate from './Rate';

export const Rate = withInstall(_Rate);
export default Rate;
export type { RateProps } from './Rate';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanRate: typeof Rate;
  }
}
