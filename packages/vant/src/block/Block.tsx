import { ExtractPropTypes, defineComponent } from 'vue';
import { createNamespace } from '../utils';

const [name, bem] = createNamespace('block');

export const blockProps = {
  card: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
};

export type BlockProps = ExtractPropTypes<typeof blockProps>;

export default defineComponent({
  name,

  props: blockProps,

  setup(props, { slots }) {
    return () => (
      <div class={bem()}>
        {props.title ? <h2 class={bem('title')}>{props.title}</h2> : null}
        {props.card ? (
          <div class={bem('card')}>{slots.default?.()}</div>
        ) : (
          slots.default?.()
        )}
      </div>
    );
  },
});
