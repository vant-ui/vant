import { defineComponent } from 'vue';
import { createNamespace, addUnit, UnknownProp } from '../utils';
import { useLinkField } from '../composables/use-link-field';
import Loading from '../loading';

const [name, bem] = createNamespace('switch');

export default defineComponent({
  name,

  props: {
    size: [Number, String],
    loading: Boolean,
    disabled: Boolean,
    modelValue: UnknownProp,
    activeColor: String,
    inactiveColor: String,
    activeValue: {
      type: UnknownProp,
      default: true as unknown,
    },
    inactiveValue: {
      type: UnknownProp,
      default: false as unknown,
    },
  },

  emits: ['change', 'update:modelValue'],

  setup(props, { emit }) {
    const isChecked = () => props.modelValue === props.activeValue;

    const onClick = () => {
      if (!props.disabled && !props.loading) {
        const newValue = isChecked() ? props.inactiveValue : props.activeValue;
        emit('update:modelValue', newValue);
        emit('change', newValue);
      }
    };

    const renderLoading = () => {
      if (props.loading) {
        const color = isChecked() ? props.activeColor : props.inactiveColor;
        return <Loading class={bem('loading')} color={color} />;
      }
    };

    useLinkField(() => props.modelValue);

    return () => {
      const { size, loading, disabled, activeColor, inactiveColor } = props;
      const checked = isChecked();
      const style = {
        fontSize: addUnit(size),
        backgroundColor: checked ? activeColor : inactiveColor,
      };

      return (
        <div
          role="switch"
          class={bem({
            on: checked,
            loading,
            disabled,
          })}
          style={style}
          aria-checked={checked}
          onClick={onClick}
        >
          <div class={bem('node')}>{renderLoading()}</div>
        </div>
      );
    };
  },
});
