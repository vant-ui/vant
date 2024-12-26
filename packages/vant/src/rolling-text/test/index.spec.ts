import { RollingText, type RollingTextInstance } from '..';
import { later, mount } from '../../../test';

const itemWrapperClass = '.van-rolling-text-item__box';
const animationClass = 'van-rolling-text-item__box--animate';

test('should render comp', () => {
  const wrapper = mount(RollingText, {
    props: {
      startNum: 0,
      targetNum: 123,
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should start rolling when auto-start prop is true', async () => {
  const wrapper = mount(RollingText, {
    props: {
      startNum: 0,
      targetNum: 123,
      autoStart: true,
    },
  });

  expect(wrapper.find(itemWrapperClass).classes()).toContain(animationClass);
});

test('should not start rolling when auto-start prop is false', async () => {
  const wrapper = mount(RollingText, {
    props: {
      startNum: 0,
      targetNum: 123,
      autoStart: false,
    },
  });

  expect(wrapper.find(itemWrapperClass).classes()).not.toContain(
    animationClass,
  );
});

test('should start rolling after calling the start method', async () => {
  const wrapper = mount<RollingTextInstance>(RollingText, {
    props: {
      startNum: 0,
      targetNum: 123,
      autoStart: false,
    },
  });
  const instance = wrapper.vm;

  instance.start();
  await later();
  expect(wrapper.find(itemWrapperClass).classes()).toContain(animationClass);
});

test('should reset the animation after calling the reset method', async () => {
  const wrapper = mount<RollingTextInstance>(RollingText, {
    props: {
      startNum: 0,
      targetNum: 123,
      autoStart: false,
    },
  });
  const instance = wrapper.vm;

  instance.start();
  await later();
  expect(wrapper.find(itemWrapperClass).classes()).toContain(animationClass);

  instance.reset();
  await later();
  expect(wrapper.find(itemWrapperClass).classes()).not.toContain(
    animationClass,
  );
});

test('should restart rolling after calling the reset method when auto-start prop is true', async () => {
  const wrapper = mount<RollingTextInstance>(RollingText, {
    props: {
      startNum: 0,
      targetNum: 123,
      autoStart: true,
    },
  });
  const instance = wrapper.vm;

  instance.reset();
  await later();
  expect(wrapper.find(itemWrapperClass).classes()).not.toContain(
    animationClass,
  );
  instance.start();
  await later(50);
  expect(wrapper.find(itemWrapperClass).classes()).toContain(animationClass);
});
