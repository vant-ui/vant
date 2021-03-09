import { ref, defineComponent } from 'vue';
import { pick, createNamespace, ComponentInstance } from '../utils';
import { useExpose } from '../composables/use-expose';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';

const [name, bem] = createNamespace('datetime-picker');

const timePickerProps = Object.keys(TimePicker.props);
const datePickerProps = Object.keys(DatePicker.props);

export default defineComponent({
  name,

  props: {
    ...TimePicker.props,
    ...DatePicker.props,
    modelValue: [String, Date],
  },

  setup(props, { attrs, slots }) {
    const root = ref<ComponentInstance>();

    useExpose({
      getPicker: () => root.value?.getPicker(),
    });

    return () => {
      const isTimePicker = props.type === 'time';
      const Component = isTimePicker ? TimePicker : DatePicker;
      const inheritProps = pick(
        props,
        isTimePicker ? timePickerProps : datePickerProps
      );

      return (
        <Component
          v-slots={slots}
          ref={root}
          class={bem()}
          {...{ ...inheritProps, ...attrs }}
        />
      );
    };
  },
});
