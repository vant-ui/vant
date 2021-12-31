import { withInstall } from '../utils';
import _AddressList from './AddressList';

export const AddressList = withInstall(_AddressList);
export default AddressList;
export type { AddressListProps } from './AddressList';
export type { AddressListAddress } from './AddressListItem';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanAddressList: typeof AddressList;
  }
}
