import { PropType, defineComponent, ExtractPropTypes } from 'vue';
import { createNamespace } from '../utils';
import { useChildren } from '@vant/use';

const [name, bem] = createNamespace('steps');

export const STEPS_KEY = Symbol(name);

export type StepsDirection = 'horizontal' | 'vertical';

const props = {
  finishIcon: String,
  activeColor: String,
  inactiveIcon: String,
  inactiveColor: String,
  active: {
    type: [Number, String],
    default: 0,
  },
  direction: {
    type: String as PropType<StepsDirection>,
    default: 'horizontal',
  },
  activeIcon: {
    type: String,
    default: 'checked',
  },
};

export type StepsProvide = {
  props: ExtractPropTypes<typeof props>;
  onClickStep: (index: number) => void;
};

export default defineComponent({
  name,

  props,

  emits: ['click-step'],

  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(STEPS_KEY);

    const onClickStep = (index: number) => emit('click-step', index);

    linkChildren({
      props,
      onClickStep,
    });

    return () => (
      <div class={bem([props.direction])}>
        <div class={bem('items')}>{slots.default?.()}</div>
      </div>
    );
  },
});
