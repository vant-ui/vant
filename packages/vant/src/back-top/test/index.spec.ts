import BackTop from '..';
import { mount } from '../../../test';

test('test position prop', async () => {
  mount(BackTop, {
    attachTo: document.body,
    props: {
      right: 30,
      bottom: 100,
    },
  });
  const backTopEl = document.querySelector<HTMLElement>('.van-back-top');
  expect(backTopEl?.style.right).toBe('30px');
  expect(backTopEl?.style.bottom).toBe('100px');
});

test('test backTop event', async () => {
  const wrapper = mount(BackTop, {
    attachTo: document.getElementById('container') ?? undefined,
  });

  await wrapper.trigger('click');
  expect(wrapper.emitted()).toBeDefined();
});
