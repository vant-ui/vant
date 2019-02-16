import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio';

const [sfc, bem] = use('address-item');

function AddressItem(h, props, slots, ctx) {
  const { disabled, switchable } = props;

  const renderRightIcon = () => (
    <Icon
      name="edit"
      class={bem('edit')}
      onClick={event => {
        event.stopPropagation();
        emit(ctx, 'edit');
      }}
    />
  );

  const renderContent = () => {
    const { data } = props;
    const Info = [
      <div class={bem('name')}>{`${data.name}，${data.tel}`}</div>,
      <div class={bem('address')}>{data.address}</div>
    ];

    return props.disabled ? Info : <Radio name={data.id}>{Info}</Radio>;
  };

  const onSelect = () => {
    if (props.switchable) {
      emit(ctx, 'select');
    }
  };

  return (
    <Cell
      class={bem({ disabled, unswitchable: !switchable })}
      valueClass={bem('value')}
      isLink={!disabled && switchable}
      scopedSlots={{
        default: renderContent,
        'right-icon': renderRightIcon
      }}
      onClick={onSelect}
      {...inherit(ctx)}
    />
  );
}

AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean
};

export default sfc(AddressItem);
