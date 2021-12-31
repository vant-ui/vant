import { withInstall } from '../utils';
import _CouponCell from './CouponCell';

export const CouponCell = withInstall(_CouponCell);
export default CouponCell;
export type { CouponCellProps } from './CouponCell';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanCouponCell: typeof CouponCell;
  }
}
