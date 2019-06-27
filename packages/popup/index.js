import { use, isDef } from '../utils';
import { PopupMixin } from '../mixins/popup';

const [sfc, bem] = use('popup');

export default sfc({
  mixins: [PopupMixin],

  props: {
    transition: String,
    duration: {
      type: Number,
      default: null
    },
    position: {
      type: String,
      default: 'center'
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },

  beforeCreate() {
    const createEmitter = eventName => event => this.$emit(eventName, event);

    this.onClick = createEmitter('click');
    this.onOpened = createEmitter('opened');
    this.onClosed = createEmitter('closed');
  },

  render(h) {
    if (!this.shouldRender) {
      return;
    }

    const { position, duration } = this;

    const transitionName =
      this.transition ||
      (position === 'center' ? 'van-fade' : `van-popup-slide-${position}`);

    const style = {};
    if (isDef(duration)) {
      style.transitionDuration = `${duration}s`;
    }

    return (
      <transition
        name={transitionName}
        onAfterEnter={this.onOpened}
        onAfterLeave={this.onClosed}
      >
        <div
          vShow={this.value}
          style={style}
          class={bem({ [position]: position })}
          onClick={this.onClick}
        >
          {this.slots()}
        </div>
      </transition>
    );
  }
});
