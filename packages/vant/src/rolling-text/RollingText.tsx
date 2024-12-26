import {
  ref,
  watch,
  computed,
  defineComponent,
  type ExtractPropTypes,
  getCurrentInstance,
} from 'vue';

// Utils
import { raf, useParent } from '@vant/use';
import {
  padZero,
  truthProp,
  makeArrayProp,
  makeStringProp,
  makeNumberProp,
  createNamespace,
  isDef,
  kebabCase,
} from '../utils';

// Composables
import { useExpose } from '../composables/use-expose';

// Components
import RollingTextItem from './RollingTextItem';
import {
  ROLLING_TEXT_KEY,
  RollingTextGroupProps,
} from '../rolling-text-group/RollingTextGroup';

// Types
import {
  RollingTextDirection,
  RollingTextStopOrder,
  RollingTextExpose,
} from './types';

const [name, bem] = createNamespace('rolling-text');

export const rollingTextProps = {
  startNum: makeNumberProp(0),
  targetNum: Number,
  textList: makeArrayProp<string>(),
  duration: makeNumberProp(2),
  autoStart: truthProp,
  direction: makeStringProp<RollingTextDirection>('down'),
  stopOrder: makeStringProp<RollingTextStopOrder>('ltr'),
  height: makeNumberProp(40),
};

const CIRCLE_NUM = 2;

export type RollingTextProps = ExtractPropTypes<typeof rollingTextProps>;

export default defineComponent({
  name,

  props: rollingTextProps,

  setup(props) {
    const instance = getCurrentInstance();
    const { parent, index } = useParent(ROLLING_TEXT_KEY);

    const getProp = <K extends keyof RollingTextProps>(
      key: K,
    ): RollingTextProps[K] => {
      if (
        instance &&
        instance.vnode.props &&
        (key in instance.vnode.props || kebabCase(key) in instance.vnode.props)
      ) {
        return props[key];
      }
      if (
        parent &&
        key in parent.props &&
        isDef(parent.props[key as keyof RollingTextGroupProps])
      ) {
        return parent.props[
          key as keyof RollingTextGroupProps
        ] as RollingTextProps[K];
      }
      return props[key];
    };

    const startNum = computed(() => {
      return getProp('startNum');
    });

    const isCustomType = computed(
      () => Array.isArray(props.textList) && props.textList.length,
    );

    const itemLength = computed(() => {
      if (isCustomType.value) return props.textList[0].length;
      return `${Math.max(startNum.value, props.targetNum!)}`.length;
    });

    const getTextArrByIdx = (idx: number) => {
      const result = [];
      for (let i = 0; i < props.textList.length; i++) {
        result.push(props.textList[i][idx]);
      }
      return result;
    };

    const targetNumArr = computed(() => {
      if (isCustomType.value) return new Array(itemLength.value).fill('');
      return padZero(props.targetNum!, itemLength.value).split('');
    });

    const startNumArr = computed(() =>
      padZero(startNum.value, itemLength.value).split(''),
    );

    const getFigureArr = (i: number) => {
      const start = +startNumArr.value[i];
      const target = +targetNumArr.value[i];
      const result = [];
      for (let i = start; i <= 9; i++) {
        result.push(i);
      }
      for (let i = 0; i <= CIRCLE_NUM; i++) {
        for (let j = 0; j <= 9; j++) {
          result.push(j);
        }
      }
      for (let i = 0; i <= target; i++) {
        result.push(i);
      }
      return result;
    };

    const getDelay = (i: number, len: number) => {
      if (parent) {
        i = index.value;
        len = parent.children.length;
      }
      const stopOrder = getProp('stopOrder');
      if (stopOrder === 'ltr') return 0.2 * i;
      return 0.2 * (len - 1 - i);
    };

    const autoStart = computed(() => {
      return getProp('autoStart');
    });

    const rolling = ref(autoStart.value);

    const start = () => {
      rolling.value = true;
    };

    const reset = () => {
      rolling.value = false;

      if (autoStart.value) {
        raf(() => start());
      }
    };

    watch(
      () => autoStart.value,
      (value) => {
        if (value) {
          start();
        }
      },
    );

    useExpose<RollingTextExpose>({
      start,
      reset,
    });

    return () => (
      <div class={bem()}>
        {targetNumArr.value.map((_, i) => (
          <RollingTextItem
            figureArr={
              isCustomType.value ? getTextArrByIdx(i) : getFigureArr(i)
            }
            duration={getProp('duration')}
            direction={getProp('direction')}
            isStart={rolling.value}
            height={getProp('height')}
            delay={getDelay(i, itemLength.value)}
          />
        ))}
      </div>
    );
  },
});
