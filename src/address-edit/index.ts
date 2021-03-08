import { withInstall } from '../utils';
import _AddressEdit from './AddressEdit';

const AddressEdit = withInstall<typeof _AddressEdit>(_AddressEdit);

export default AddressEdit;
export { AddressEdit };
