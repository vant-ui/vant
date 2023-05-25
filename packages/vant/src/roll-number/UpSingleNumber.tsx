import { defineComponent, computed } from 'vue';

// Utils
import { createNamespace, makeNumberProp, makeArrayProp } from '../utils';

const [name, bem] = createNamespace('roll-single-up');

export const props = {
  figureArr: makeArrayProp(),
  delay: Number,
  duration: makeNumberProp(2),
  isStart: Boolean,
};

const height = 40;

export default defineComponent({
  name,

  props,

  setup(props) {
    const heightPx = computed(() => `${height}px`);
    const totalHeight = computed(
      () => height * props.figureArr.length - height
    );
    const translateValPx = computed(() => `-${totalHeight.value}px`);
    const itemStyleObj = {
      lineHeight: heightPx.value,
    };

    const getStyle = () => ({
      height: heightPx.value,
      '--translate': translateValPx.value,
      '--duration': props.duration + 's',
      '--delay': props.delay + 's',
    });

    return () => (
      <div style={getStyle()} class={bem()}>
        <div class={[bem('box'), { 'van-roll-single-up__ani': props.isStart }]}>
          {Array.isArray(props.figureArr) &&
            props.figureArr.map((figure) => (
              <div class={bem('item')} style={itemStyleObj}>
                {figure}
              </div>
            ))}
        </div>
      </div>
    );
  },
});
