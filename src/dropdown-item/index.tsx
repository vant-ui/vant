import {
  reactive,
  Teleport,
  PropType,
  TeleportProps,
  CSSProperties,
} from 'vue';

// Utils
import { createNamespace, getZIndexStyle, UnknownProp } from '../utils';
import { DROPDOWN_KEY, DropdownMenuProvide } from '../dropdown-menu';

// Composables
import { useParent } from '@vant/use';
import { useExpose } from '../composables/use-expose';

// Components
import Cell from '../cell';
import Icon from '../icon';
import Popup from '../popup';

const [createComponent, bem] = createNamespace('dropdown-item');

export type DropdownItemOption = {
  text: string;
  icon?: string;
  value: number | string;
};

export default createComponent({
  props: {
    title: String,
    disabled: Boolean,
    teleport: [String, Object] as PropType<TeleportProps['to']>,
    modelValue: UnknownProp,
    titleClass: UnknownProp,
    options: {
      type: Array as PropType<DropdownItemOption[]>,
      default: () => [],
    },
    lazyRender: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['open', 'opened', 'close', 'closed', 'change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const state = reactive({
      showPopup: false,
      transition: true,
      showWrapper: false,
    });

    const { parent } = useParent<DropdownMenuProvide>(DROPDOWN_KEY);

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[Vant] <DropdownItem> must be a child component of <DropdownMenu>.'
        );
      }
      return;
    }

    const getEmitter = (name: 'open' | 'close' | 'opened') => () => emit(name);
    const onOpen = getEmitter('open');
    const onClose = getEmitter('close');
    const onOpened = getEmitter('opened');

    const onClosed = () => {
      state.showWrapper = false;
      emit('closed');
    };

    const onClickWrapper = (event: MouseEvent) => {
      // prevent being identified as clicking outside and closed when using teleport
      if (props.teleport) {
        event.stopPropagation();
      }
    };

    const toggle = (
      show = !state.showPopup,
      options: { immediate?: boolean } = {}
    ) => {
      if (show === state.showPopup) {
        return;
      }

      state.showPopup = show;
      state.transition = !options.immediate;

      if (show) {
        state.showWrapper = true;
      }
    };

    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }

      if (props.title) {
        return props.title;
      }

      const match = props.options.filter(
        (option) => option.value === props.modelValue
      );

      return match.length ? match[0].text : '';
    };

    const renderOption = (option: DropdownItemOption) => {
      const { activeColor } = parent.props;
      const active = option.value === props.modelValue;

      const onClick = () => {
        state.showPopup = false;

        if (option.value !== props.modelValue) {
          emit('update:modelValue', option.value);
          emit('change', option.value);
        }
      };

      return (
        <Cell
          clickable
          key={option.value}
          icon={option.icon}
          title={option.text}
          class={bem('option', { active })}
          style={{ color: active ? activeColor : '' }}
          onClick={onClick}
        >
          {active && (
            <Icon class={bem('icon')} color={activeColor} name="success" />
          )}
        </Cell>
      );
    };

    const renderContent = () => {
      const { offset } = parent;
      const {
        zIndex,
        overlay,
        duration,
        direction,
        closeOnClickOverlay,
      } = parent.props;

      const style: CSSProperties = getZIndexStyle(zIndex);

      if (direction === 'down') {
        style.top = `${offset.value}px`;
      } else {
        style.bottom = `${offset.value}px`;
      }

      return (
        <div
          v-show={state.showWrapper}
          style={style}
          class={bem([direction])}
          onClick={onClickWrapper}
        >
          <Popup
            v-model={[state.showPopup, 'show']}
            class={bem('content')}
            overlay={overlay}
            position={direction === 'down' ? 'top' : 'bottom'}
            duration={state.transition ? duration : 0}
            lazyRender={props.lazyRender}
            overlayStyle={{ position: 'absolute' }}
            closeOnClickOverlay={closeOnClickOverlay}
            onOpen={onOpen}
            onClose={onClose}
            onOpened={onOpened}
            onClosed={onClosed}
          >
            {props.options.map(renderOption)}
            {slots.default?.()}
          </Popup>
        </div>
      );
    };

    useExpose({ state, toggle, renderTitle });

    return () => {
      if (props.teleport) {
        return <Teleport to={props.teleport}>{renderContent()}</Teleport>;
      }
      return renderContent();
    };
  },
});
