import { use } from '../utils';
import { ChildrenMixin } from '../mixins/relation';

const [sfc, bem] = use('index-anchor');

export default sfc({
  mixins: [ChildrenMixin('vanIndexBar', { indexKey: 'childrenIndex' })],

  props: {
    index: [String, Number],
    backgroundColorValue: {
      type: String,
      default: '248,248,248'
    }
  },

  methods: {
    scrollIntoView() {
      this.$el.scrollIntoView();
    },

    content(slot, alpha, border) {
      return (
        <div
          class={[
            bem('content'),
            { 'van-hairline--bottom': border }
          ]}
          style={{ backgroundColor: `rgba(${this.backgroundColorValue},${alpha})` }}
        >
          {slot}
        </div>
      );
    }
  },

  render(h) {
    let prevAnchor = '';

    if (this.id > 0) {
      prevAnchor = (
        <div
          vShow={this.isNextAnchor && this.parent.isInTransition}
          class={bem('prev')}
        >
          {this.content(this.parent.children[this.id - 1].defaultSlot, this.isNextAnchor ? 1 - this.parent.alpha : 0, true)}
        </div>
      );
    }

    return (
      <div class={bem({ highlight: this.isNextAnchor && this.parent.isInTransition })}>
        {prevAnchor}
        {this.content(this.defaultSlot, this.isNextAnchor ? this.parent.alpha : 1)}
      </div>
    );
  }
});
