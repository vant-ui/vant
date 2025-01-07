import { ref, onMounted } from 'vue';
import { mount, later, trigger, triggerDrag } from '../../../test';
import { Swipe } from '..';
import { SwipeItem } from '../../swipe-item';

function mockPageHidden() {
  let hidden = true;

  Object.defineProperty(document, 'hidden', {
    get: () => hidden,
  });

  trigger(window, 'visibilitychange');
  hidden = false;
}

const swipeStyle = {
  width: '100px',
  height: '100px',
};

const Component = {
  props: {
    vertical: Boolean,
    loop: {
      type: Boolean,
      default: true,
    },
    touchable: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Number,
      default: 0,
    },
    initialSwipe: {
      type: Number,
      default: 0,
    },
  },
  render() {
    return (
      <Swipe ref="swipe" style={swipeStyle} {...this.$props}>
        <SwipeItem>1</SwipeItem>
        <SwipeItem>2</SwipeItem>
        <SwipeItem>3</SwipeItem>
      </Swipe>
    );
  },
};

test('should swipe to specific swipe after calling the swipeTo method', async () => {
  const onChange = vi.fn();
  const wrapper = mount(Component, {
    props: {
      onChange,
    },
  });

  const { swipe } = wrapper.vm.$refs;
  swipe.swipeTo(2);

  await later(100);
  expect(onChange).toHaveBeenCalledWith(2);
});

test('should allow to call swipeTo method with immediate option', async () => {
  const onChange = vi.fn();
  const wrapper = mount(Component, {
    props: {
      onChange,
    },
  });

  const { swipe } = wrapper.vm.$refs;
  swipe.swipeTo(2, {
    immediate: true,
  });

  await later(100);
  expect(onChange).toHaveBeenCalledWith(2);
});

test('should swipe to next swipe after calling next method', async () => {
  const onChange = vi.fn();
  const wrapper = mount(Component, {
    props: {
      onChange,
    },
  });

  const { swipe } = wrapper.vm.$refs;
  swipe.next();
  await later(100);
  expect(onChange).toHaveBeenCalledWith(1);
});

test('should swipe to prev swipe after calling prev method', async () => {
  const onChange = vi.fn();
  const wrapper = mount(Component, {
    props: {
      onChange,
    },
  });

  const { swipe } = wrapper.vm.$refs;
  swipe.prev();
  await later(100);
  expect(onChange).toHaveBeenCalledWith(2);
});

test('should render initial swipe correctly', async () => {
  const wrapper = mount(Component);
  await later();
  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.setProps({ initialSwipe: 2 });
  expect(wrapper.html()).toMatchSnapshot();
});

test('should render vertical swipe when using vertical prop', async () => {
  const wrapper = mount(Component, {
    props: {
      vertical: true,
    },
  });

  const track = wrapper.find('.van-swipe__track');
  await triggerDrag(track, 0, -100);
  expect(wrapper.html()).toMatchSnapshot();
});

test('should not allow to drag swipe when touchable is false', async () => {
  const onChange = vi.fn();
  const wrapper = mount(Component, {
    props: {
      onChange,
      touchable: false,
    },
  });

  const track = wrapper.find('.van-swipe__track');

  await triggerDrag(track, 100, 0);
  expect(wrapper.html()).toMatchSnapshot();
  expect(onChange).toHaveBeenCalledTimes(0);
});

test('should render swipe looply when using loop prop', async () => {
  const onChange = vi.fn();
  const wrapper = mount(Component, {
    props: {
      onChange,
    },
  });
  const track = wrapper.find('.van-swipe__track');

  await triggerDrag(track, -100, 0);
  expect(onChange).toHaveBeenLastCalledWith(1);
  await triggerDrag(track, -100, 0);
  expect(onChange).toHaveBeenLastCalledWith(2);
  await triggerDrag(track, -100, 0);
  expect(onChange).toHaveBeenLastCalledWith(0);
  await triggerDrag(track, -100, 0);
  expect(onChange).toHaveBeenLastCalledWith(1);
  await triggerDrag(track, 100, 0);
  expect(onChange).toHaveBeenLastCalledWith(0);
  await triggerDrag(track, 100, 0);
  expect(onChange).toHaveBeenLastCalledWith(2);
  await triggerDrag(track, 100, 0);
  expect(onChange).toHaveBeenLastCalledWith(1);
});

test('should pause auto play when page is hidden', async () => {
  const onChange = vi.fn();
  mount(Component, {
    props: {
      loop: true,
      autoplay: 1,
      onChange,
    },
  });

  mockPageHidden();
  await later(50);
  expect(onChange).toHaveBeenCalledTimes(0);
});

test('should render swipe item correctly when using lazy-render prop', async () => {
  const wrapper = mount({
    data() {
      return {
        active: 0,
      };
    },
    render() {
      return (
        <Swipe initialSwipe={this.active} lazyRender>
          <SwipeItem>
            <span>1</span>
          </SwipeItem>
          <SwipeItem>
            <span>2</span>
          </SwipeItem>
          <SwipeItem>
            <span>3</span>
          </SwipeItem>
          <SwipeItem>
            <span>4</span>
          </SwipeItem>
          <SwipeItem>
            <span>5</span>
          </SwipeItem>
        </Swipe>
      );
    },
  });

  await later();
  const items = wrapper.findAll('.van-swipe-item');

  const expectRender = (results) => {
    results.forEach((result, index) => {
      expect(items[index].find('span').exists()).toEqual(result);
    });
  };

  expectRender([true, true, false, false, true]);

  await wrapper.setData({ active: 1 });
  expectRender([true, true, true, false, true]);

  await wrapper.setData({ active: 2 });
  expectRender([true, true, true, true, true]);
});

test('should render swipe item correctly when using lazy-render prop and loop is false', async () => {
  const wrapper = mount({
    data() {
      return {
        active: 0,
      };
    },
    render() {
      return (
        <Swipe initialSwipe={this.active} loop={false} lazyRender>
          <SwipeItem>
            <span>1</span>
          </SwipeItem>
          <SwipeItem>
            <span>2</span>
          </SwipeItem>
          <SwipeItem>
            <span>3</span>
          </SwipeItem>
          <SwipeItem>
            <span>4</span>
          </SwipeItem>
        </Swipe>
      );
    },
  });

  await later();
  const items = wrapper.findAll('.van-swipe-item');

  const expectRender = (results) => {
    results.forEach((result, index) => {
      expect(items[index].find('span').exists()).toEqual(result);
    });
  };

  expectRender([true, true, false, false]);

  await wrapper.setData({ active: 1 });
  expectRender([true, true, true, false]);

  await wrapper.setData({ active: 2 });
  expectRender([true, true, true, true]);
});

test('should render dynamic SwipeItem correctly', async () => {
  const wrapper = mount({
    setup() {
      const render = ref(false);
      onMounted(() => {
        render.value = true;
      });
      return { render };
    },
    render() {
      return (
        <Swipe style={swipeStyle}>
          {this.render && [
            <SwipeItem>
              <span>1</span>
            </SwipeItem>,
            <SwipeItem>
              <span>2</span>
            </SwipeItem>,
          ]}
        </Swipe>
      );
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
  await later();
  expect(wrapper.html()).toMatchSnapshot();
});

test('should render indicator slot correctly', async () => {
  const wrapper = mount({
    render() {
      return (
        <Swipe
          v-slots={{
            indicator: ({ active, total }) =>
              `active: ${active}, total: ${total}`,
          }}
          style={swipeStyle}
        >
          <SwipeItem>1</SwipeItem>
          <SwipeItem>2</SwipeItem>
        </Swipe>
      );
    },
  });

  await later();
  expect(wrapper.html()).toMatchSnapshot();
});

test('should emit drag-start and drag-end events correctly', async () => {
  const dragStart = vi.fn();
  const dragEnd = vi.fn();
  const wrapper = mount({
    render() {
      return (
        <Swipe onDragEnd={dragEnd} onDragStart={dragStart}>
          <SwipeItem>1</SwipeItem>
          <SwipeItem>2</SwipeItem>
        </Swipe>
      );
    },
  });

  const track = wrapper.find('.van-swipe__track');

  await triggerDrag(track, 100, 0);
  expect(dragStart).toHaveBeenCalledTimes(1);
  expect(dragStart).toHaveBeenCalledWith({ index: 0 });
  expect(dragEnd).toHaveBeenCalledTimes(1);
  expect(dragEnd).toHaveBeenCalledWith({ index: 1 });

  await triggerDrag(track, 100, 0);
  expect(dragStart).toHaveBeenCalledTimes(2);
  expect(dragStart).toHaveBeenCalledWith({ index: 1 });
  expect(dragEnd).toHaveBeenCalledTimes(2);
  expect(dragEnd).toHaveBeenCalledWith({ index: 0 });
});

test('should reverse swipe direction when container direction is rtl', async () => {
  const wrapper = mount({
    render() {
      return (
        <div style="direction: rtl">
          <Swipe style={swipeStyle}>
            <SwipeItem>1</SwipeItem>
            <SwipeItem>2</SwipeItem>
          </Swipe>
        </div>
      );
    },
  });

  const track = wrapper.find('.van-swipe__track');
  await triggerDrag(track, -100, 0);
  expect(wrapper.html()).toMatchSnapshot();
});
