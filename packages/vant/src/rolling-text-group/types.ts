import { RollingTextGroupProps } from './RollingTextGroup';
import type { ComponentPublicInstance } from 'vue';

export type RollingTextGroupExpose = {
  start: () => void;
  reset: () => void;
};

export type RollingTextGroupInstance = ComponentPublicInstance<
  RollingTextGroupProps,
  RollingTextGroupExpose
>;
