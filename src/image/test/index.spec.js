
import { mount } from '../../../test/utils';
import Image from '..';

test('click event', () => {
  const wrapper = mount(Image);

  wrapper.trigger('click');
  expect(wrapper.emitted('click')[0][0]).toBeTruthy();
  wrapper.destroy();
});

test('load event', () => {
  const wrapper = mount(Image, {
    propsData: {
      src: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  });

  wrapper.find('img').trigger('load');

  expect(wrapper.emitted('load')[0][0]).toBeTruthy();
  expect(wrapper).toMatchSnapshot();

  wrapper.setProps({ src: '' });
  expect(wrapper).toMatchSnapshot();
});

test('error event', () => {
  const wrapper = mount(Image, {
    propsData: {
      src: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  });

  wrapper.find('img').trigger('error');

  expect(wrapper.emitted('error')[0][0]).toBeTruthy();
});

test('lazy load', () => {
  const wrapper = mount(Image, {
    propsData: {
      src: 'https://img.yzcdn.cn/vant/cat.jpeg',
      lazyLoad: true
    }
  });

  expect(wrapper).toMatchSnapshot();
});

test('lazy-load load event', done => {
  const wrapper = mount(Image, {
    propsData: {
      lazyLoad: true,
      src: 'https://img.yzcdn.cn/vant/cat.jpeg'
    },
    mocks: {
      $Lazyload: {
        $on(eventName, hanlder) {
          if (eventName === 'loaded') {
            setTimeout(() => {
              hanlder({ el: null });
              hanlder({ el: wrapper.find('img').element });
              expect(wrapper.emitted('load').length).toEqual(1);
              expect(wrapper).toMatchSnapshot();
              wrapper.destroy();
            });
          }
        },
        $off() {
          done();
        }
      }
    }
  });
});

test('lazy-load error event', done => {
  const wrapper = mount(Image, {
    propsData: {
      lazyLoad: true
    },
    mocks: {
      $Lazyload: {
        $on(eventName, hanlder) {
          if (eventName === 'error') {
            setTimeout(() => {
              hanlder({ el: null });
              hanlder({ el: wrapper.find('img').element });
              expect(wrapper.emitted('error').length).toEqual(1);
              expect(wrapper).toMatchSnapshot();
              wrapper.destroy();
            });
          }
        },
        $off() {
          done();
        }
      }
    }
  });
});

test('loading-placeholder prop', () => {
  const wrapper = mount(Image, {
    propsData: {
      loadingPlaceholder: false
    }
  });

  expect(wrapper).toMatchSnapshot();
});
