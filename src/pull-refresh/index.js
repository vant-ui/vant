import { createNamespace } from '../utils';
import { preventDefault } from '../utils/dom/event';
import { TouchMixin } from '../mixins/touch';
import { getScrollTop, getScrollEventTarget } from '../utils/dom/scroll';
import Loading from '../loading';

const [createComponent, bem, t] = createNamespace('pull-refresh');
const TEXT_STATUS = ['pulling', 'loosing', 'success'];

export default createComponent({
  mixins: [TouchMixin],

  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    value: {
      type: Boolean,
      required: true
    },
    successDuration: {
      type: Number,
      default: 500
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    headHeight: {
      type: Number,
      default: 50
    }
  },

  data() {
    return {
      status: 'normal',
      distance: 0,
      duration: 0
    };
  },

  computed: {
    touchable() {
      return (
        this.status !== 'loading' && this.status !== 'success' && !this.disabled
      );
    }
  },

  watch: {
    value(loading) {
      this.duration = this.animationDuration;

      if (!loading && this.successText) {
        this.status = 'success';

        setTimeout(() => {
          this.setStatus(0);
        }, this.successDuration);
      } else {
        this.setStatus(loading ? this.headHeight : 0, loading);
      }
    }
  },

  mounted() {
    this.bindTouchEvent(this.$refs.track);
    this.scrollEl = getScrollEventTarget(this.$el);
  },

  methods: {
    checkPullStart(event) {
      this.ceiling = getScrollTop(this.scrollEl) === 0;

      if (this.ceiling) {
        this.duration = 0;
        this.touchStart(event);
      }
    },

    onTouchStart(event) {
      if (this.touchable) {
        this.checkPullStart(event);
      }
    },

    onTouchMove(event) {
      if (!this.touchable) {
        return;
      }

      if (!this.ceiling) {
        this.checkPullStart(event);
      }

      this.touchMove(event);

      if (this.ceiling && this.deltaY >= 0 && this.direction === 'vertical') {
        preventDefault(event);
        this.setStatus(this.ease(this.deltaY));
      }
    },

    onTouchEnd() {
      if (this.touchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;

        if (this.status === 'loosing') {
          this.setStatus(this.headHeight, true);
          this.$emit('input', true);

          // ensure value change can be watched
          this.$nextTick(() => {
            this.$emit('refresh');
          });
        } else {
          this.setStatus(0);
        }
      }
    },

    ease(distance) {
      const { headHeight } = this;

      if (distance > headHeight) {
        if (distance < headHeight * 2) {
          distance = headHeight + (distance - headHeight) / 2;
        } else {
          distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
        }
      }

      return Math.round(distance);
    },

    setStatus(distance, isLoading) {
      let status;
      if (isLoading) {
        status = 'loading';
      } else if (distance === 0) {
        status = 'normal';
      } else {
        status = distance < this.headHeight ? 'pulling' : 'loosing';
      }

      this.distance = distance;

      if (status !== this.status) {
        this.status = status;
      }
    },

    genStatus() {
      const { status, distance } = this;
      const slot = this.slots(status, { distance });

      if (slot) {
        return slot;
      }

      const nodes = [];
      const text = this[`${status}Text`] || t(status);

      if (TEXT_STATUS.indexOf(status) !== -1) {
        nodes.push(<div class={bem('text')}>{text}</div>);
      }

      if (status === 'loading') {
        nodes.push(<Loading size="16">{text}</Loading>);
      }

      return nodes;
    }
  },

  render() {
    const style = {
      transitionDuration: `${this.duration}ms`,
      transform: this.distance ? `translate3d(0,${this.distance}px, 0)` : ''
    };

    return (
      <div class={bem()}>
        <div ref="track" class={bem('track')} style={style}>
          <div class={bem('head')}>{this.genStatus()}</div>
          {this.slots()}
        </div>
      </div>
    );
  }
});

//
