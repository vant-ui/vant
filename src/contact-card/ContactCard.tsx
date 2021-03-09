import { PropType, defineComponent } from 'vue';
import { createNamespace } from '../utils';
import { Cell } from '../cell';

const [name, bem, t] = createNamespace('contact-card');

export type ContactCardType = 'add' | 'edit';

export default defineComponent({
  name,

  props: {
    tel: String,
    name: String,
    addText: String,
    editable: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as PropType<ContactCardType>,
      default: 'add',
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const onClick = (event: MouseEvent) => {
      if (props.editable) {
        emit('click', event);
      }
    };

    const renderContent = () => {
      if (props.type === 'add') {
        return props.addText || t('addText');
      }

      return [
        <div>{`${t('name')}：${props.name}`}</div>,
        <div>{`${t('tel')}：${props.tel}`}</div>,
      ];
    };

    return () => (
      <Cell
        center
        icon={props.type === 'edit' ? 'contact' : 'add-square'}
        class={bem([props.type])}
        border={false}
        isLink={props.editable}
        valueClass={bem('value')}
        onClick={onClick}
      >
        {renderContent()}
      </Cell>
    );
  },
});
