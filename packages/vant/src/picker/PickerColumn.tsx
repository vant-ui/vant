import {
  ref,
  computed,
  watchEffect,
  defineComponent,
  type PropType,
  type InjectionKey,
} from 'vue';

// Utils
import {
  clamp,
  numericProp,
  makeArrayProp,
  preventDefault,
  createNamespace,
  makeRequiredProp,
  makeStringProp,
  type Numeric,
} from '../utils';
import { getElementTranslateY, findIndexOfEnabledOption } from './utils';

// Composables
import { useEventListener, useParent, useRect } from '@vant/use';
import { useTouch, type Direction } from '../composables/use-touch';
import { useExpose } from '../composables/use-expose';

// Types
import type {
  PickerOption,
  PickerFieldNames,
  PickerColumnProvide,
} from './types';

const DEFAULT_DURATION = 200;

// 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_TIME` 且 move
// 距离大于 `MOMENTUM_DISTANCE` 时，执行惯性滑动
const MOMENTUM_TIME = 300;
const MOMENTUM_DISTANCE = 15;

const [name, bem] = createNamespace('picker-column');

export const PICKER_KEY: InjectionKey<PickerColumnProvide> = Symbol(name);

export default defineComponent({
  name,

  props: {
    value: numericProp,
    fields: makeRequiredProp(Object as PropType<Required<PickerFieldNames>>),
    options: makeArrayProp<PickerOption>(),
    readonly: Boolean,
    allowHtml: Boolean,
    optionHeight: makeRequiredProp(Number),
    swipeDuration: makeRequiredProp(numericProp),
    visibleOptionNum: makeRequiredProp(numericProp),
    direction: makeStringProp<Direction>('vertical'),
  },

  emits: ['change', 'clickOption', 'scrollInto'],

  setup(props, { emit, slots }) {
    let moving: boolean;
    let startOffset: number;
    let touchStartTime: number;
    let momentumOffset: number;
    let transitionEndTrigger: null | (() => void);
    let horSign = 0; // 水平滑动的方向符号

    const root = ref<HTMLElement>();
    const wrapper = ref<HTMLElement>();
    const currentOffset = ref(0);
    const currentDuration = ref(0);
    const touch = useTouch();

    const count = () => props.options.length;

    const baseOffset = () =>
      (props.optionHeight * (+props.visibleOptionNum - 1)) / 2;

    const updateValueByIndex = (index: number) => {
      let enabledIndex = findIndexOfEnabledOption(props.options, index);
      const offset = -enabledIndex * props.optionHeight;

      const trigger = () => {
        if (enabledIndex > count() - 1) {
          enabledIndex = findIndexOfEnabledOption(props.options, index);
        }

        const value = props.options[enabledIndex][props.fields.value];
        if (value !== props.value) {
          emit('change', value);
        }
      };

      // trigger the change event after transitionend when moving
      if (moving && offset !== currentOffset.value) {
        transitionEndTrigger = trigger;
      } else {
        trigger();
      }

      currentOffset.value = offset;
    };

    const isReadonly = () => props.readonly || !props.options.length;

    const onClickOption = (index: number) => {
      if (moving || isReadonly()) {
        return;
      }

      transitionEndTrigger = null;
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);
      emit('clickOption', props.options[index]);
    };

    const getIndexByOffset = (offset: number) =>
      clamp(Math.round(-offset / props.optionHeight), 0, count() - 1);

    const currentIndex = computed(() => getIndexByOffset(currentOffset.value));

    const momentum = (distance: number, duration: number) => {
      const speed = Math.abs(distance / duration);

      distance =
        currentOffset.value + (speed / 0.003) * (distance < 0 ? -1 : 1);

      const index = getIndexByOffset(distance);

      currentDuration.value = +props.swipeDuration;
      updateValueByIndex(index);
    };

    const stopMomentum = () => {
      moving = false;
      currentDuration.value = 0;

      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (isReadonly()) {
        return;
      }

      touch.start(event);

      if (moving) {
        const translateY = getElementTranslateY(wrapper.value!);
        currentOffset.value = Math.min(0, translateY - baseOffset());
      }

      currentDuration.value = 0;
      startOffset = currentOffset.value;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;

      if (props.direction === 'horizontal') {
        // 根据第一个和最后一个item的位置来判断旋转方向
        const liNodeList = wrapper.value!.children;
        horSign = liNodeList.length
          ? Math.sign(
              useRect(liNodeList[liNodeList.length - 1]).x -
                useRect(liNodeList[0]).x,
            )
          : 0;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isReadonly()) {
        return;
      }

      touch.move(event);

      if (
        (props.direction === 'vertical' && touch.isVertical()) ||
        (props.direction === 'horizontal' && touch.isHorizontal())
      ) {
        moving = true;
        preventDefault(event, true);
      }

      const newOffset = clamp(
        startOffset +
          (props.direction === 'horizontal'
            ? touch.deltaX.value * horSign
            : touch.deltaY.value),
        -(count() * props.optionHeight),
        props.optionHeight,
      );

      const newIndex = getIndexByOffset(newOffset);
      if (newIndex !== currentIndex.value) {
        emit('scrollInto', props.options[newIndex]);
      }

      currentOffset.value = newOffset;

      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_TIME) {
        touchStartTime = now;
        momentumOffset = newOffset;
      }
    };

    const onTouchEnd = () => {
      if (isReadonly()) {
        return;
      }

      const distance = currentOffset.value - momentumOffset;
      const duration = Date.now() - touchStartTime;
      const startMomentum =
        duration < MOMENTUM_TIME && Math.abs(distance) > MOMENTUM_DISTANCE;

      if (startMomentum) {
        momentum(distance, duration);
        return;
      }

      const index = getIndexByOffset(currentOffset.value);
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);

      // compatible with desktop scenario
      // use setTimeout to skip the click event emitted after touchstart
      setTimeout(() => {
        moving = false;
      }, 0);
    };

    const renderOptions = () => {
      const optionStyle = {
        height: `${props.optionHeight}px`,
      };

      return props.options.map((option, index) => {
        const text = option[props.fields.text];
        const { disabled } = option;
        const value: Numeric = option[props.fields.value];
        const data = {
          role: 'button',
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: [
            bem('item', {
              disabled,
              selected: value === props.value,
            }),
            option.className,
          ],
          onClick: () => onClickOption(index),
        };

        const childData = {
          class: 'van-ellipsis',
          [props.allowHtml ? 'innerHTML' : 'textContent']: text,
        };

        return (
          <li {...data}>
            {slots.option ? (
              slots.option(option, index)
            ) : (
              <div {...childData} />
            )}
          </li>
        );
      });
    };

    useParent(PICKER_KEY);
    useExpose({ stopMomentum });

    watchEffect(() => {
      const index = moving
        ? Math.floor(-currentOffset.value / props.optionHeight)
        : props.options.findIndex(
            (option) => option[props.fields.value] === props.value,
          );
      const enabledIndex = findIndexOfEnabledOption(props.options, index);
      const offset = -enabledIndex * props.optionHeight;
      if (moving && enabledIndex < index) stopMomentum();
      currentOffset.value = offset;
    });

    // useEventListener will set passive to `false` to eliminate the warning of Chrome
    useEventListener('touchmove', onTouchMove, {
      target: root,
    });

    return () => (
      <div
        ref={root}
        class={bem()}
        onTouchstartPassive={onTouchStart}
        onTouchend={onTouchEnd}
        onTouchcancel={onTouchEnd}
      >
        <ul
          ref={wrapper}
          style={{
            transform: `translate3d(0, ${
              currentOffset.value + baseOffset()
            }px, 0)`,
            transitionDuration: `${currentDuration.value}ms`,
            transitionProperty: currentDuration.value ? 'all' : 'none',
          }}
          class={bem('wrapper')}
          onTransitionend={stopMomentum}
        >
          {renderOptions()}
        </ul>
      </div>
    );
  },
});
