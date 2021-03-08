import { defineComponent } from 'vue';
import { pick, createNamespace } from '../utils';
import { useParent } from '@vant/use';
import Checker, { checkerProps } from '../checkbox/Checker';
import { RADIO_KEY, RadioGroupProvide } from '../radio-group';

const [name, bem] = createNamespace('radio');

export default defineComponent({
  name,

  props: checkerProps,

  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const { parent } = useParent<RadioGroupProvide>(RADIO_KEY);

    const checked = () => {
      const value = parent ? parent.props.modelValue : props.modelValue;
      return value === props.name;
    };

    const toggle = () => {
      if (parent) {
        parent.updateValue(props.name);
      } else {
        emit('update:modelValue', props.name);
      }
    };

    return () => (
      <Checker
        v-slots={pick(slots, ['default', 'icon'])}
        bem={bem}
        role="radio"
        parent={parent}
        checked={checked()}
        onToggle={toggle}
        {...props}
      />
    );
  },
});
