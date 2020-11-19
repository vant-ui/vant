import { createPopper } from '@popperjs/core/lib/popper-lite';
import offsetModifier from '@popperjs/core/lib/modifiers/offset';
import { createNamespace } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant';

// Mixins
import { ClickOutsideMixin } from '../mixins/click-outside';

// Components
import Icon from '../icon';
import Popup from '../popup';

const [createComponent, bem] = createNamespace('popover');

export default createComponent({
  mixins: [
    ClickOutsideMixin({
      event: 'click',
      method: 'onClickOutside',
    }),
  ],

  props: {
    value: Boolean,
    overlay: Boolean,
    textColor: String,
    backgroundColor: String,
    offset: {
      type: Array,
      default: () => [0, 8],
    },
    theme: {
      type: String,
      default: 'light',
    },
    actions: {
      type: Array,
      default: () => [],
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    getContainer: {
      type: [String, Function],
      default: 'body',
    },
    closeOnClickAction: {
      type: Boolean,
      default: true,
    },
  },

  watch: {
    placement: 'updateLocation',

    value(value) {
      if (value) {
        this.updateLocation();
      }
    },
  },

  mounted() {
    if (this.value) {
      this.updateLocation();
    }
  },

  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  },

  methods: {
    createPopper() {
      return createPopper(this.$refs.wrapper, this.$refs.popover.$el, {
        placement: this.placement,
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false,
            },
          },
          {
            ...offsetModifier,
            options: {
              offset: this.offset,
            },
          },
        ],
      });
    },

    updateLocation() {
      this.$nextTick(() => {
        if (!this.value) {
          return;
        }

        if (!this.popper) {
          this.popper = this.createPopper();
        } else {
          this.popper.setOptions({
            placement: this.placement,
          });
        }
      });
    },

    renderAction(action, index) {
      const { icon, text, disabled, className } = action;
      return (
        <div
          class={[bem('action', { disabled, 'with-icon': icon }), className]}
          onClick={() => this.onClickAction(action, index)}
        >
          {icon && <Icon name={icon} class={bem('action-icon')} />}
          <div class={[bem('action-text'), BORDER_BOTTOM]}>{text}</div>
        </div>
      );
    },

    onToggle(value) {
      this.$emit('input', value);
    },

    onClick(event) {
      event.stopPropagation();
      this.$emit('click', event);
    },

    onClickAction(action, index) {
      if (action.disabled) {
        return;
      }

      this.$emit('select', action, index);

      if (this.closeOnClickAction) {
        this.$emit('input', false);
      }
    },

    onClickOutside() {
      this.$emit('input', false);
    },

    onOpen() {
      this.$emit('open');
    },

    onOpened() {
      this.$emit('opened');
    },

    onClose() {
      this.$emit('close');
    },

    onClosed() {
      this.$emit('closed');
    },
  },

  render() {
    return (
      <span ref="wrapper" class={bem('wrapper')}>
        <Popup
          ref="popover"
          value={this.value}
          class={bem([this.theme])}
          overlay={this.overlay}
          position={null}
          transition="van-popover-zoom"
          lockScroll={false}
          getContainer={this.getContainer}
          onOpen={this.onOpen}
          onClick={this.onClick}
          onClose={this.onClose}
          onInput={this.onToggle}
          onOpened={this.onOpened}
          onClosed={this.onClosed}
        >
          <div class={bem('arrow')} />
          {this.actions.map(this.renderAction)}
        </Popup>
        {this.slots('reference')}
      </span>
    );
  },
});
