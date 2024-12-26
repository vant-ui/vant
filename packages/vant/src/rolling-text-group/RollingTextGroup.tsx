import {
  defineComponent,
  type InjectionKey,
  type ExtractPropTypes,
  PropType,
} from 'vue';

// Utils
import { truthProp, createNamespace, makeNumberProp } from '../utils';

// Composables
import { useChildren } from '@vant/use';
import { useExpose } from '../composables/use-expose';
import { RollingTextGroupExpose } from './types';
import { RollingTextDirection, RollingTextStopOrder } from '../rolling-text';

const [name, bem] = createNamespace('rolling-text-group');

export const rollingTextGroupProps = {
  startNum: makeNumberProp(0),
  duration: Number,
  autoStart: truthProp,
  direction: String as PropType<RollingTextDirection>,
  stopOrder: String as PropType<RollingTextStopOrder>,
  height: Number,
};

export type RollingTextGroupProps = ExtractPropTypes<
  typeof rollingTextGroupProps
>;
export type RollingTextGroupProvide = {
  props: RollingTextGroupProps;
};
export const ROLLING_TEXT_KEY: InjectionKey<RollingTextGroupProvide> =
  Symbol(name);

export default defineComponent({
  name,

  props: rollingTextGroupProps,

  setup(props, { slots }) {
    const { children, linkChildren } = useChildren(ROLLING_TEXT_KEY);

    linkChildren({
      props,
    });

    const start = () => {
      children.map((ins) => {
        ins.start();
      });
    };

    const reset = () => {
      children.map((ins) => {
        ins.reset();
      });
    };

    useExpose<RollingTextGroupExpose>({
      start,
      reset,
    });

    if (slots.default) {
      return () => <div class={bem()}>{slots.default!()}</div>;
    }
  },
});
