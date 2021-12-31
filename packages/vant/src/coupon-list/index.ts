import { withInstall } from '../utils';
import _CouponList from './CouponList';

export const CouponList = withInstall(_CouponList);
export default CouponList;
export type { CouponListProps } from './CouponList';

// define global components for volar
declare module 'vue' {
  export interface GlobalComponents {
    VanCouponList: typeof CouponList;
  }
}
