import {
  ref,
  watch,
  computed,
  defineComponent,
  type ExtractPropTypes,
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
} from '../utils';

// Composables
import { useExpose } from '../composables/use-expose';

// Components
import RollingTextItem from './RollingTextItem';
import { ROLLING_TEXT_KEY } from '../rolling-text-group/RollingTextGroup';

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
  delay: makeNumberProp(0),
};

const CIRCLE_NUM = 2;

export type RollingTextProps = ExtractPropTypes<typeof rollingTextProps>;

export default defineComponent({
  name,

  props: rollingTextProps,

  setup(props) {
    const isCustomType = computed(
      () => Array.isArray(props.textList) && props.textList.length,
    );

    const itemLength = computed(() => {
      if (isCustomType.value) return props.textList[0].length;
      return `${Math.max(props.startNum, props.targetNum!)}`.length;
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
      padZero(props.startNum, itemLength.value).split(''),
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
      if (props.delay !== 0) return props.delay;
      if (props.stopOrder === 'ltr') return 0.2 * i;
      return 0.2 * (len - 1 - i);
    };

    const { parent } = useParent(ROLLING_TEXT_KEY);

    const rolling = ref(parent?.props.autoStart ?? props.autoStart);

    const start = () => {
      rolling.value = true;
    };

    const reset = () => {
      rolling.value = false;

      if (rolling.value) {
        raf(() => start());
      }
    };

    watch(
      () => rolling,
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
            duration={props.duration}
            direction={props.direction}
            isStart={rolling.value}
            height={props.height}
            delay={getDelay(i, itemLength.value)}
          />
        ))}
      </div>
    );
  },
});
