import { withInstall } from '../utils';
import _AddressEdit, { AddressEditProps } from './AddressEdit';

export const AddressEdit = withInstall(_AddressEdit);
export default AddressEdit;
export type { AddressEditProps };
export type {
  AddressEditInfo,
  AddressEditInstance,
  AddressEditSearchItem,
} from './types';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanAddressEdit: typeof AddressEdit;
  }
}
