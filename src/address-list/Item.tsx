import { PropType } from 'vue';

// Utils
import { createNamespace } from '../utils';

// Components
import Tag from '../tag';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio';

const [createComponent, bem] = createNamespace('address-item');

export type AddressListItem = {
  id: number | string;
  tel: number | string;
  name: string;
  address: string;
  isDefault?: boolean;
};

export default createComponent({
  props: {
    disabled: Boolean,
    switchable: Boolean,
    defaultTagText: String,
    address: {
      type: Object as PropType<AddressListItem>,
      required: true,
    },
  },

  emits: ['edit', 'click', 'select'],

  setup(props, { slots, emit }) {
    const onClick = () => {
      if (props.switchable) {
        emit('select');
      }
      emit('click');
    };

    const renderRightIcon = () => (
      <Icon
        name="edit"
        class={bem('edit')}
        onClick={(event) => {
          event.stopPropagation();
          emit('edit');
          emit('click');
        }}
      />
    );

    const renderTag = () => {
      if (slots.tag) {
        return slots.tag({ ...props.address, defaultTagText: props.defaultTagText});
      }
      if (props.address.isDefault && props.defaultTagText) {
        return (
          <Tag type="danger" round class={bem('tag')}>
            {props.defaultTagText}
          </Tag>
        );
      }
    };

    const renderContent = () => {
      const { address, disabled, switchable } = props;

      const Info = [
        <div class={bem('name')}>
          {`${address.name} ${address.tel}`}
          {renderTag()}
        </div>,
        <div class={bem('address')}>{address.address}</div>,
      ];

      if (switchable && !disabled) {
        return (
          <Radio name={address.id} iconSize={18}>
            {Info}
          </Radio>
        );
      }

      return Info;
    };

    return () => {
      const { disabled } = props;

      return (
        <div class={bem({ disabled })} onClick={onClick}>
          <Cell
            v-slots={{
              default: renderContent,
              'right-icon': renderRightIcon,
            }}
            border={false}
            valueClass={bem('value')}
          />
          {slots.bottom?.({ ...props.address, disabled })}
        </div>
      );
    };
  },
});
