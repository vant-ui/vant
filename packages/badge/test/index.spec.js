import { mount } from '@vue/test-utils';
import Badge from '../';
import BadgeGroup from '../../badge-group';
import demoTest from '../../../test/demo-test';

demoTest(Badge);

test('click', () => {
  const onClick = jest.fn();
  const wrapper = mount({
    template: `
      <badge-group>
        <badge @click="onClick">Text</badge>
      </badge-group>
    `,
    components: {
      Badge,
      BadgeGroup
    },
    methods: {
      onClick
    }
  });

  wrapper.find('.van-badge').trigger('click');
  expect(onClick.mock.calls[0][0]).toBe(0);
});
