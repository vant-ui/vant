import { withInstall } from '../utils';
import _RadioGroup from './RadioGroup';

export const RadioGroup = withInstall(_RadioGroup);
export default RadioGroup;
export type { RadioGroupProps, RadioGroupDirection } from './RadioGroup';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanRadioGroup: typeof RadioGroup;
  }
}
