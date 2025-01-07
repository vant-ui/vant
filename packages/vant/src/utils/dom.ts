import { useRect, useWindowSize } from '@vant/use';
import { unref, Ref } from 'vue';
import { isIOS as checkIsIOS } from './basic';

export type ScrollElement = Element | Window;

export function getScrollTop(el: ScrollElement): number {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}

export function setScrollTop(el: ScrollElement, value: number) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop(): number {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function setRootScrollTop(value: number) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}

// get distance from element top to page top or scroller top
export function getElementTop(el: ScrollElement, scroller?: ScrollElement) {
  if (el === window) {
    return 0;
  }

  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return useRect(el).top + scrollTop;
}

const isIOS = checkIsIOS();

// hack for iOS12 page scroll
// see: https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800
export function resetScroll() {
  if (isIOS) {
    setRootScrollTop(getRootScrollTop());
  }
}

export const stopPropagation = (event: Event) => event.stopPropagation();

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

export function isHidden(
  elementRef: HTMLElement | Ref<HTMLElement | undefined>,
) {
  const el = unref(elementRef);
  if (!el) {
    return false;
  }

  const style = window.getComputedStyle(el);
  const hidden = style.display === 'none';

  // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed
  const parentHidden = el.offsetParent === null && style.position !== 'fixed';

  return hidden || parentHidden;
}

export const { width: windowWidth, height: windowHeight } = useWindowSize();

function isContainingBlock(el: Element) {
  const css = window.getComputedStyle(el);

  return (
    css.transform !== 'none' ||
    css.perspective !== 'none' ||
    ['transform', 'perspective', 'filter'].some((value) =>
      (css.willChange || '').includes(value),
    )
  );
}

export function getContainingBlock(el: Element) {
  let node = el.parentElement;

  while (node) {
    if (
      node &&
      node.tagName !== 'HTML' &&
      node.tagName !== 'BODY' &&
      isContainingBlock(node)
    ) {
      return node;
    }

    node = node.parentElement;
  }

  return null;
}

export function isRtl(elementRef: Element | Ref<Element | undefined>) {
  const el = unref(elementRef);
  if (!el) {
    return false;
  }
  return window.getComputedStyle(el).direction === 'rtl';
}
