import { ref, watch, computed, nextTick, defineComponent } from 'vue';

// Utils
import { cellProps } from '../cell/Cell';
import { createNamespace } from '../utils';
import { COLLAPSE_KEY, CollapseProvide } from '../collapse/Collapse';

// Composables
import { raf, doubleRaf, useParent } from '@vant/use';
import { useExpose } from '../composables/use-expose';
import { useLazyRender } from '../composables/use-lazy-render';

// Components
import Cell from '../cell';

const [name, bem] = createNamespace('collapse-item');

export default defineComponent({
  name,

  props: {
    ...cellProps,
    name: [Number, String],
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots }) {
    const wrapperRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const { parent, index } = useParent<CollapseProvide>(COLLAPSE_KEY);

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[Vant] <CollapseItem> must be a child component of <Collapse>.'
        );
      }
      return;
    }

    const name = computed(() => props.name ?? index.value);
    const expanded = computed(() => parent.isExpanded(name.value));

    const show = ref(expanded.value);
    const lazyRender = useLazyRender(show);

    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else {
        wrapperRef.value!.style.height = '';
      }
    };

    watch(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }

      if (value) {
        show.value = true;
      }

      // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`
      const tick = value ? nextTick : raf;

      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }

        const { offsetHeight } = contentRef.value;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? '0' : contentHeight;

          // use double raf to ensure animation can start
          doubleRaf(() => {
            wrapperRef.value!.style.height = value ? contentHeight : '0';
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name.value, newValue);
    };

    const onClickTitle = () => {
      if (!props.disabled) {
        toggle();
      }
    };

    const renderTitle = () => {
      const { border, disabled } = props;

      return (
        <Cell
          v-slots={{
            icon: slots.icon,
            title: slots.title,
            default: slots.value,
            'right-icon': slots['right-icon'],
          }}
          role="button"
          class={bem('title', {
            disabled,
            expanded: expanded.value,
            borderless: !border,
          })}
          tabindex={disabled ? -1 : 0}
          aria-expanded={String(expanded.value)}
          onClick={onClickTitle}
          {...props}
        />
      );
    };

    const renderContent = lazyRender(() => (
      <div
        v-show={show.value}
        ref={wrapperRef}
        class={bem('wrapper')}
        onTransitionend={onTransitionEnd}
      >
        <div ref={contentRef} class={bem('content')}>
          {slots.default?.()}
        </div>
      </div>
    ));

    useExpose({ toggle });

    return () => (
      <div class={[bem({ border: index.value && props.border })]}>
        {renderTitle()}
        {renderContent()}
      </div>
    );
  },
});
