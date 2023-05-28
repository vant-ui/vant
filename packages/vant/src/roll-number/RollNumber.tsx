import { ref, defineComponent, computed, type ExtractPropTypes } from 'vue';
import DownSingleNumber from './DownSingleNumber';
import UpSingleNumber from './UpSingleNumber';
// Utils
import {
  createNamespace,
  makeNumberProp,
  makeStringProp,
  truthProp,
} from '../utils';
import { useExpose } from '../composables/use-expose';

const [name, bem] = createNamespace('roll-number');

export type RollNumberDirection = 'up' | 'down';
export type StopOrder = 'ltr' | 'rtl';

export const rollNumberProps = {
  startNum: makeNumberProp(0),
  targetNum: Number,
  duration: makeNumberProp(2),
  autoStart: truthProp,
  direction: makeStringProp<RollNumberDirection>('down'),
  stopOrder: makeStringProp<StopOrder>('ltr'),
};

const CIRCLE_NUM = 2;

export type RollNumberProps = ExtractPropTypes<typeof rollNumberProps>;

export default defineComponent({
  name,

  props: rollNumberProps,

  setup(props) {
    const targetNumArr = computed(() => `${props.targetNum}`.split(''));

    const startNumArr = () => {
      const arr = `${props.startNum}`.split('');
      while (arr.length < targetNumArr.value.length) {
        arr.unshift('0');
      }
      return arr;
    };

    const getTwoFigure = (i: number) => [
      startNumArr()[i],
      targetNumArr.value[i],
    ];

    const getFigureArr = (i: number) => {
      const [start, target] = getTwoFigure(i);
      const result = [];
      for (let i = +start; i <= 9; i++) {
        result.push(i);
      }
      for (let i = 0; i <= CIRCLE_NUM; i++) {
        for (let j = 0; j <= 9; j++) {
          result.push(j);
        }
      }
      for (let i = 0; i <= +target; i++) {
        result.push(i);
      }
      return result;
    };

    const getDelay = (i: number, len: number) => {
      if (props.stopOrder === 'ltr') return 0.2 * i;
      return 0.2 * (len - 1 - i);
    };

    const isStart = ref(false);
    const start = () => {
      isStart.value = true;
    };

    const reset = () => {
      isStart.value = false;
    };
    useExpose({
      start,
      reset,
    });

    return () => (
      <div class={bem()}>
        {targetNumArr.value.map((figure, i) =>
          props.direction === 'down' ? (
            <DownSingleNumber
              figureArr={getFigureArr(i)}
              duration={props.duration}
              isStart={props.autoStart || isStart.value}
              delay={getDelay(i, targetNumArr.value.length)}
            />
          ) : (
            <UpSingleNumber
              figureArr={getFigureArr(i)}
              duration={props.duration}
              isStart={props.autoStart || isStart.value}
              delay={getDelay(i, targetNumArr.value.length)}
            />
          )
        )}
      </div>
    );
  },
});