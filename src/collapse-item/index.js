// Utils
import { createNamespace } from '../utils';
import { raf, doubleRaf } from '../utils/dom/raf';

// Mixins
import { ChildrenMixin } from '../mixins/relation';

// Components
import Cell from '../cell';
import { cellProps } from '../cell/shared';

const [createComponent, bem] = createNamespace('collapse-item');

const CELL_SLOTS = ['title', 'icon', 'right-icon'];

const DOUBLE_RAF_TIME = 32;

export default createComponent({
  mixins: [ChildrenMixin('vanCollapse')],

  props: {
    ...cellProps,
    name: [Number, String],
    disabled: Boolean,
    lazyRender: {
      type: Boolean,
      default: true,
    },
    isLink: {
      type: Boolean,
      default: true,
    },
    expandInViewport: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: null,
      inited: null,
    };
  },

  computed: {
    currentName() {
      return this.name ?? this.index;
    },

    expanded() {
      if (!this.parent) {
        return null;
      }

      const { value, accordion } = this.parent;

      if (
        process.env.NODE_ENV === 'development' &&
        !accordion &&
        !Array.isArray(value)
      ) {
        console.error('[Vant] Collapse: type of prop "value" should be Array');
        return;
      }

      return accordion
        ? value === this.currentName
        : value.some((name) => name === this.currentName);
    },
  },

  created() {
    this.show = this.expanded;
    this.inited = this.expanded;
  },

  watch: {
    expanded(expanded, prev) {
      if (prev === null) {
        return;
      }

      if (expanded) {
        this.show = true;
        this.inited = true;
      }

      // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`
      const nextTick = expanded ? this.$nextTick : raf;
      const { accordion } = this.parent;

      nextTick(() => {
        const { content, wrapper } = this.$refs;

        if (!content || !wrapper) {
          return;
        }

        const { offsetHeight } = content;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapper.style.height = expanded ? 0 : contentHeight;

          // use double raf to ensure animation can start
          doubleRaf(() => {
            wrapper.style.height = expanded ? contentHeight : 0;

            // ensure that the expanded node during the expansion animation is not pushed out of the viewport
            if (accordion && expanded && this.expandInViewport) {
              const duration = this.getTransitionDuration(wrapper);
              this.stayInViewport(Date.now() + duration);
            }
          });
        } else {
          this.onTransitionEnd();
        }
      });
    },
  },

  methods: {
    onClick() {
      if (!this.disabled) {
        this.toggle();
      }
    },

    // @exposed-api
    toggle(expanded = !this.expanded) {
      const { parent, currentName } = this;
      const close = parent.accordion && currentName === parent.value;
      const name = close ? '' : currentName;
      this.parent.switch(name, expanded);
    },

    onTransitionEnd() {
      if (!this.expanded) {
        this.show = false;
      } else {
        this.$refs.wrapper.style.height = '';
      }
    },

    /**
     * Get the transition duration
     * @param {Element} el
     */
    getTransitionDuration(el) {
      const computedStyle = window.getComputedStyle(el);
      const duration = computedStyle.getPropertyValue('transition-duration');

      // unit ms
      const durationList = duration.split(',').map((timestr) => {
        const coefficient = timestr.endsWith('ms') ? 1 : 1000;
        return parseFloat(timestr) * coefficient;
      });

      return durationList.length ? Math.max(...durationList) : 0;
    },

    /**
     * Keep the node within the viewport.
     * @param {Number} endTime
     */
    stayInViewport(endTime) {
      const currTime = Date.now();
      const restTime = endTime - currTime;
      const titleRef = this.$refs.title;

      if (!titleRef || restTime <= -DOUBLE_RAF_TIME) return;

      if (typeof titleRef.scrollIntoViewIfNeeded === 'function') {
        titleRef.scrollIntoViewIfNeeded(false);
      } else {
        const rect = titleRef.getBoundingClientRect();

        if (rect.top < 0) {
          titleRef.scrollIntoView({
            behavior: 'instant',
          });
        }
      }

      raf(() => {
        this.stayInViewport(endTime);
      });
    },

    genTitle() {
      const { border, disabled, expanded } = this;

      const titleSlots = CELL_SLOTS.reduce((slots, name) => {
        if (this.slots(name)) {
          slots[name] = () => this.slots(name);
        }

        return slots;
      }, {});

      if (this.slots('value')) {
        titleSlots.default = () => this.slots('value');
      }

      return (
        <Cell
          ref="title"
          role="button"
          class={bem('title', { disabled, expanded, borderless: !border })}
          onClick={this.onClick}
          scopedSlots={titleSlots}
          tabindex={disabled ? -1 : 0}
          aria-expanded={String(expanded)}
          {...{ props: this.$props }}
        />
      );
    },

    genContent() {
      if (this.inited || !this.lazyRender) {
        return (
          <div
            vShow={this.show}
            ref="wrapper"
            class={bem('wrapper')}
            onTransitionend={this.onTransitionEnd}
          >
            <div ref="content" class={bem('content')}>
              {this.slots()}
            </div>
          </div>
        );
      }
    },
  },

  render() {
    return (
      <div class={[bem({ border: this.index && this.border })]}>
        {this.genTitle()}
        {this.genContent()}
      </div>
    );
  },
});
