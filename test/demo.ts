import { h, defineComponent } from 'vue';
import Locale from '../src/locale';
import { mount, later } from '.';
import '../docs/site/demo-locale';

const EmptyComponent = defineComponent({
  inheritAttrs: false,
  render() {
    return h('div', [this.$slots.default?.()]);
  },
});

export function snapshotDemo(Demo: any, option: any = {}) {
  test('should render demo and match snapshot', async () => {
    if (option.beforeTest) {
      option.beforeTest();
    }

    if (Demo.i18n) {
      Locale.add(Demo.i18n);
    }

    const wrapper = mount(Demo, {
      global: {
        components: {
          'demo-block': EmptyComponent,
        },
        plugins: [(window as any).vant],
      },
    });

    await later();

    expect(wrapper.html()).toMatchSnapshot();

    if (option.afterTest) {
      option.afterTest();
    }
  });
}
