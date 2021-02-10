import { PropType } from 'vue';
import { createNamespace, addUnit } from '../utils';
import { BORDER_TOP } from '../utils/constant';
import { useChildren } from '@vant/use';

const [createComponent, bem] = createNamespace('grid');

export const GRID_KEY = 'vanGrid';

export type GridDirection = 'horizontal' | 'vertical';

export type GridProvide = {
  props: {
    center: boolean;
    border: boolean;
    square?: boolean;
    gutter?: number | string;
    iconSize?: number | string;
    columnNum: number | string;
    direction?: GridDirection;
    clickable?: boolean;
  };
};

export default createComponent({
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String as PropType<GridDirection>,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4,
    },
    center: {
      type: Boolean,
      default: true,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots }) {
    const { linkChildren } = useChildren(GRID_KEY);

    linkChildren({ props });

    return () => (
      <div
        style={{ paddingLeft: addUnit(props.gutter) }}
        class={[bem(), { [BORDER_TOP]: props.border && !props.gutter }]}
      >
        {slots.default?.()}
      </div>
    );
  },
});
