import { PropType, defineComponent } from 'vue';

// Utils
import { createNamespace, UnknownProp } from '../utils';

// Components
import { Tag } from '../tag';
import { Icon } from '../icon';
import { Cell } from '../cell';
import { Radio } from '../radio';
import { Button } from '../button';
import { RadioGroup } from '../radio-group';

const [name, bem, t] = createNamespace('contact-list');

export type ContactListItem = {
  id?: number | string;
  tel: number | string;
  name: string;
  isDefault?: boolean;
};

export default defineComponent({
  name,

  props: {
    list: Array as PropType<ContactListItem[]>,
    addText: String,
    modelValue: UnknownProp,
    defaultTagText: String,
  },

  emits: ['add', 'edit', 'select', 'update:modelValue'],

  setup(props, { emit }) {
    const renderItem = (item: ContactListItem, index: number) => {
      const onClick = () => {
        emit('update:modelValue', item.id);
        emit('select', item, index);
      };

      const renderRightIcon = () => (
        <Radio class={bem('radio')} name={item.id} iconSize={16} />
      );

      const renderEditIcon = () => (
        <Icon
          name="edit"
          class={bem('edit')}
          onClick={(event) => {
            event.stopPropagation();
            emit('edit', item, index);
          }}
        />
      );

      const renderContent = () => {
        const nodes: JSX.Element[] = [`${item.name}，${item.tel}`];

        if (item.isDefault && props.defaultTagText) {
          nodes.push(
            <Tag type="danger" round class={bem('item-tag')}>
              {props.defaultTagText}
            </Tag>
          );
        }

        return nodes;
      };

      return (
        <Cell
          v-slots={{
            icon: renderEditIcon,
            default: renderContent,
            'right-icon': renderRightIcon,
          }}
          key={item.id}
          isLink
          center
          class={bem('item')}
          valueClass={bem('item-value')}
          onClick={onClick}
        />
      );
    };

    return () => (
      <div class={bem()}>
        <RadioGroup modelValue={props.modelValue} class={bem('group')}>
          {props.list && props.list.map(renderItem)}
        </RadioGroup>
        <div class={bem('bottom')}>
          <Button
            round
            block
            type="danger"
            class={bem('add')}
            text={props.addText || t('addText')}
            onClick={() => emit('add')}
          />
        </div>
      </div>
    );
  },
});
