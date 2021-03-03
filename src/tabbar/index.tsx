import { ref, PropType } from 'vue';

// Utils
import { createNamespace, getZIndexStyle } from '../utils';
import { BORDER_TOP_BOTTOM } from '../utils/constant';
import { callInterceptor, Interceptor } from '../utils/interceptor';

// Composables
import { useChildren } from '@vant/use';
import { usePlaceholder } from '../composables/use-placeholder';

const [createComponent, bem] = createNamespace('tabbar');

export const TABBAR_KEY = 'vanTabbar';

export type TabbarProvide = {
  props: {
    route?: boolean;
    modelValue: number | string;
    activeColor?: string;
    inactiveColor?: string;
  };
  setActive: (active: number | string) => void;
};

export default createComponent({
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function as PropType<Interceptor>,
    inactiveColor: String,
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetBottom: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
  },

  emits: ['change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>();
    const { linkChildren } = useChildren(TABBAR_KEY);
    const renderPlaceholder = usePlaceholder(root, bem);

    const isUnfit = () => {
      if (props.safeAreaInsetBottom !== null) {
        return !props.safeAreaInsetBottom;
      }
      // enable safe-area-inset-bottom by default when fixed
      return !props.fixed;
    };

    const renderTabbar = () => {
      const { fixed, zIndex, border } = props;
      return (
        <div
          ref={root}
          style={getZIndexStyle(zIndex)}
          class={[
            bem({ unfit: isUnfit(), fixed }),
            { [BORDER_TOP_BOTTOM]: border },
          ]}
        >
          {slots.default?.()}
        </div>
      );
    };

    const setActive = (active: number | string) => {
      if (active !== props.modelValue) {
        callInterceptor({
          interceptor: props.beforeChange,
          args: [active],
          done() {
            emit('update:modelValue', active);
            emit('change', active);
          },
        });
      }
    };

    linkChildren({ props, setActive });

    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderTabbar);
      }
      return renderTabbar();
    };
  },
});
