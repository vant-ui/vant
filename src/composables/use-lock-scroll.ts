import { Ref } from 'vue';
import { getScrollParent, supportsPassive } from '@vant/use';
import { useTouch } from './use-touch';
import { preventDefault } from '../utils';

let totalLockCount = 0;

const BODY_LOCK_CLASS = 'van-overflow-hidden';

export function useLockScroll(
  rootRef: Ref<HTMLElement | undefined>,
  shouldLock: () => boolean
) {
  const touch = useTouch();

  const onTouchMove = (event: TouchEvent) => {
    touch.move(event);

    const direction = touch.deltaY.value > 0 ? '10' : '01';
    const el = getScrollParent(
      event.target as Element,
      rootRef.value
    ) as HTMLElement;
    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = '11';

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }

    if (
      status !== '11' &&
      touch.isVertical() &&
      !(parseInt(status, 2) & parseInt(direction, 2))
    ) {
      preventDefault(event, true);
    }
  };

  const lock = () => {
    if (shouldLock()) {
      document.addEventListener('touchstart', touch.start);
      document.addEventListener(
        'touchmove',
        onTouchMove,
        supportsPassive ? { passive: false } : false
      );

      if (!totalLockCount) {
        document.body.classList.add(BODY_LOCK_CLASS);
      }

      totalLockCount++;
    }
  };

  const unlock = () => {
    if (shouldLock() && totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);

      totalLockCount--;

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };

  return [lock, unlock];
}
