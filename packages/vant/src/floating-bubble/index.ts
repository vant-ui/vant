import { withInstall } from '../utils';
import _FloatingBubble from './FloatingBubble';

export const FloatingBubble = withInstall(_FloatingBubble);
export default FloatingBubble;

export { floatingBubbleProps } from './FloatingBubble';
export type {
  FloatingBubbleProps,
  FloatingBubbleAxis,
  FloatingBubbleMagnetic,
  FloatingBubbleOffset,
} from './FloatingBubble';

declare module 'vue' {
  export interface GlobalComponents {
    FloatingBubble: typeof FloatingBubble;
  }
}
