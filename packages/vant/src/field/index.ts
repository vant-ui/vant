import { withInstall } from '../utils';
import _Field, { FieldProps } from './Field';

export const Field = withInstall(_Field);
export default Field;
export type { FieldProps };
export type {
  FieldType,
  FieldRule,
  FieldInstance,
  FieldTextAlign,
  FieldRuleMessage,
  FieldClearTrigger,
  FieldFormatTrigger,
  FieldRuleValidator,
  FiledRuleFormatter,
  FieldValidateError,
  FieldAutosizeConfig,
  FieldValidateTrigger,
} from './types';
