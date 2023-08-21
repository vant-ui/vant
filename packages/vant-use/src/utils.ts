export const inBrowser = typeof window !== 'undefined';

// Keep forward compatible
// should be removed in next major version
export const supportsPassive = true;

export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}

export function cancelRaf(id: number) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}

export function useRaf(fn: FrameRequestCallback): () => void {
  if (inBrowser) {
    const id = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(id);
  }
  return () => {};
}

// double raf for animation
export function doubleRaf(fn: FrameRequestCallback): void {
  raf(() => raf(fn));
}
