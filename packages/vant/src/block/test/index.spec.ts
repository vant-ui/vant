import { mount } from '../../../test';
import { Block } from '..';

test('should render default slot correctly', () => {
  const wrapper = mount(Block, {
    slots: {
      default: () => 'text',
    },
  });

  const block = wrapper.find('.van-block');
  expect(block).exist.toBeTruthy();
  expect(block.text()).toBe('text');
});

test('should render title correctly', () => {
  const wrapper = mount(Block, {
    props: {
      title: 'title',
    },
  });

  const block = wrapper.find('.van-block');
  const title = block.find('.van-block__title');
  expect(title).exist.toBeTruthy();
  expect(title.text()).toBe('title');
});

test('should render card mode correctly', () => {
  const wrapper = mount(Block, {
    props: {
      title: 'title',
      card: true,
    },
  });

  const block = wrapper.find('.van-block');
  const card = block.find('.van-block__card');
  expect(card).exist.toBeTruthy();
});
