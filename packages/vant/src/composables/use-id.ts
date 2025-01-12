import { getCurrentInstance, useId as _useId } from 'vue';

export function useId() {
  const vm = getCurrentInstance();
  const { name = 'unknown' } = vm?.type || {};
  if (vm) {
    vm.appContext.config.idPrefix = name;
  }

  // keep test snapshot stable
  if (process.env.NODE_ENV === 'test') {
    return name;
  }

  return _useId() ?? `${name}-${vm?.uid}`;
}
