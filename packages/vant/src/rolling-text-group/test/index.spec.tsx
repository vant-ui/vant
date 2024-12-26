import { nextTick } from 'vue';
import { mount } from '../../../test';
import { RollingTextGroup } from '../index';
import { RollingText } from '../../rolling-text';
import { RollingTextGroupInstance } from '../types';

const itemWrapperClass = '.van-rolling-text-item__box';
const animationClass = 'van-rolling-text-item__box--animate';

test('should render default slot correctly', async () => {
  const wrapper = mount({
    render() {
      return (
        <RollingTextGroup>
          <RollingText targetNum={1} />
          <span>.</span>
          <RollingText targetNum={2} />
        </RollingTextGroup>
      );
    },
  });
  await nextTick();
  expect(wrapper.html()).toMatchSnapshot();
});

test('should set start-num for all rollingTexts unless already specified', async () => {
  const wrapper = mount({
    render() {
      return (
        <RollingTextGroup startNum={1}>
          <RollingText targetNum={1} />
          <RollingText startNum={2} targetNum={2} />
        </RollingTextGroup>
      );
    },
  });
  await nextTick();
  const boxes = wrapper.findAll('.van-rolling-text-item__box');

  const firstRollingText = boxes[0]
    .findAll('.van-rolling-text-item__item')[0]
    .text();
  expect(firstRollingText).toEqual('1');

  const secondRollingText = boxes[1]
    .findAll('.van-rolling-text-item__item')[0]
    .text();
  expect(secondRollingText).toEqual('2');
});

test('should set duration for all rollingTexts unless already specified', async () => {
  const wrapper = mount({
    render() {
      return (
        <RollingTextGroup duration={1}>
          <RollingText targetNum={1} />
          <RollingText duration={0.5} targetNum={2} />
        </RollingTextGroup>
      );
    },
  });
  await nextTick();
  const rollingTexts = wrapper.findAll('.van-rolling-text-item');

  expect(rollingTexts[0].style.getPropertyValue('--van-duration')).toEqual(
    '1s',
  );
  expect(rollingTexts[1].style.getPropertyValue('--van-duration')).toEqual(
    '0.5s',
  );
});

test('should set direction for all rollingTexts unless already specified', async () => {
  const wrapper = mount({
    render() {
      return (
        <RollingTextGroup direction={'up'}>
          <RollingText targetNum={1} />
          <RollingText direction={'down'} targetNum={2} />
        </RollingTextGroup>
      );
    },
  });
  await nextTick();
  const rollingTexts = wrapper.findAll('.van-rolling-text-item');

  expect(rollingTexts[0].classes()).toContain('van-rolling-text-item--up');
  expect(rollingTexts[1].classes()).toContain('van-rolling-text-item--down');
});

test('should set stopOrder for all rollingTexts unless already specified', async () => {
  const wrapper = mount({
    render() {
      return (
        <RollingTextGroup stopOrder={'rtl'}>
          <RollingText stopOrder={'ltr'} targetNum={1} />
          <RollingText targetNum={2} />
          <RollingText targetNum={3} />
        </RollingTextGroup>
      );
    },
  });
  await nextTick();
  const rollingTexts = wrapper.findAll('.van-rolling-text-item');

  expect(rollingTexts[0].style.getPropertyValue('--van-delay')).toEqual('0s');
  expect(rollingTexts[1].style.getPropertyValue('--van-delay')).toEqual('0.2s');
  expect(rollingTexts[2].style.getPropertyValue('--van-delay')).toEqual('0s');
});

test('should set height for all rollingTexts unless already specified', async () => {
  const wrapper = mount({
    render() {
      return (
        <RollingTextGroup height={50}>
          <RollingText targetNum={1} />
          <RollingText height={100} targetNum={2} />
        </RollingTextGroup>
      );
    },
  });
  await nextTick();
  const boxes = wrapper.findAll('.van-rolling-text-item__box');

  const firstRollingText = boxes[0].findAll('.van-rolling-text-item__item')[0];
  expect(firstRollingText.style.lineHeight).toEqual('50px');

  const secondRollingText = boxes[1].findAll('.van-rolling-text-item__item')[0];
  expect(secondRollingText.style.lineHeight).toEqual('100px');
});

test('should control the animation of all rollingTexts', async () => {
  const wrapper = mount<RollingTextGroupInstance>(RollingTextGroup, {
    props: {
      autoStart: false,
    },
    slots: {
      default: () => (
        <>
          <RollingText targetNum={1} />
          <RollingText targetNum={2} />
        </>
      ),
    },
  });
  const instance = wrapper.vm;
  instance.start();
  await nextTick();
  expect(wrapper.find(itemWrapperClass).classes()).toContain(animationClass);

  instance.reset();
  await nextTick();
  expect(wrapper.find(itemWrapperClass).classes()).not.contain(animationClass);
});
