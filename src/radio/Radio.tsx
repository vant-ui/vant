import { defineComponent } from 'vue';

// Utils
import { pick, createNamespace } from '../utils';
import { RADIO_KEY, RadioGroupProvide } from '../radio-group/RadioGroup';

// Composables
import { useParent } from '@vant/use';

// Components
import Checker, { checkerProps } from '../checkbox/Checker';

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
