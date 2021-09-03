import { withInstall } from '../utils';
import _CountDown from './CountDown';

export const CountDown = withInstall(_CountDown);
export default CountDown;
export type { CountDownInstance, CountDownCurrentTime } from './CountDown';
