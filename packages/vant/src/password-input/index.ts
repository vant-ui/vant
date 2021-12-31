import { withInstall } from '../utils';
import _PasswordInput from './PasswordInput';

export const PasswordInput = withInstall(_PasswordInput);
export default PasswordInput;
export type { PasswordInputProps } from './PasswordInput';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanPasswordInput: typeof PasswordInput;
  }
}
