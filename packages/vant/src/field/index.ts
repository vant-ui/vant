import { withInstall } from '../utils';
import _Field, { FieldProps } from './Field';

export const Field = withInstall(_Field);
export default Field;
export { fieldProps } from './Field';
export type { FieldProps };
export type {
  FieldType,
  FieldRule,
  FieldInstance,
  FieldTextAlign,
  FieldThemeVars,
  FieldRuleMessage,
  FieldClearTrigger,
  FieldFormatTrigger,
  FieldRuleValidator,
  FiledRuleFormatter,
  FieldValidateError,
  FieldAutosizeConfig,
  FieldValidateTrigger,
  FieldValidationStatus,
} from './types';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VanField: typeof Field;
  }
}
