import { Calendar, CalendarDayItem } from '..';
import { mount, later } from '../../../test';
import { getNextDay, getPrevDay } from '../utils';
import { now, minDate, maxDate } from './utils';
import type { CalendarInstance } from '../types';

test('should reset to default date when calling reset method', async () => {
  const defaultDate = [minDate, getNextDay(minDate)];
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      type: 'range',
      poppable: false,
      lazyRender: false,
      defaultDate,
    },
  });

  const days = wrapper.findAll('.van-calendar__day');
  await days[15].trigger('click');
  await days[18].trigger('click');

  (wrapper.vm as CalendarInstance).reset();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date, Date]>('confirm')![0][0]).toEqual(defaultDate);
});

test('should reset to specific date when calling reset method with date', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      type: 'range',
      poppable: false,
      lazyRender: false,
      defaultDate: [minDate, getNextDay(minDate)],
    },
  });

  const days = wrapper.findAll('.van-calendar__day');
  await days[15].trigger('click');
  await days[18].trigger('click');

  const newDate = [getPrevDay(maxDate), maxDate];
  (wrapper.vm as CalendarInstance).reset(newDate);

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date, Date]>('confirm')![0][0]).toEqual(newDate);
});

test('select event when type is single', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  wrapper.findAll('.van-calendar__day')[15].trigger('click');

  expect(wrapper.emitted<[Date]>('select')![0][0]).toEqual(
    new Date(2010, 0, 16),
  );
});

test('select event when type is range', async () => {
  const wrapper = mount(Calendar, {
    props: {
      type: 'range',
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  const days = wrapper.findAll('.van-calendar__day');
  days[15].trigger('click');
  days[15].trigger('click');
  days[16].trigger('click');
  days[15].trigger('click');
  days[12].trigger('click');

  const onSelect = wrapper.emitted<[Date]>('select');
  expect(onSelect![0][0]).toEqual([new Date(2010, 0, 16)]);
  expect(onSelect![1][0]).toEqual([
    new Date(2010, 0, 16),
    new Date(2010, 0, 17),
  ]);
  expect(onSelect![2][0]).toEqual([new Date(2010, 0, 16)]);
  expect(onSelect![3][0]).toEqual([new Date(2010, 0, 13)]);
});

test('select event when type is multiple', async () => {
  const wrapper = mount(Calendar, {
    props: {
      type: 'multiple',
      minDate,
      maxDate,
      poppable: false,
      defaultDate: [minDate],
      lazyRender: false,
    },
  });

  await later();

  const days = wrapper.findAll('.van-calendar__day');
  days[15].trigger('click');
  days[16].trigger('click');
  days[17].trigger('click');

  await later();
  days[15].trigger('click');
  days[12].trigger('click');

  const onSelect = wrapper.emitted<[Date]>('select');
  expect(onSelect![0][0]).toEqual([
    new Date(2010, 0, 10),
    new Date(2010, 0, 16),
  ]);
  expect(onSelect![1][0]).toEqual([
    new Date(2010, 0, 10),
    new Date(2010, 0, 16),
    new Date(2010, 0, 17),
  ]);
  expect(onSelect![2][0]).toEqual([
    new Date(2010, 0, 10),
    new Date(2010, 0, 16),
    new Date(2010, 0, 17),
    new Date(2010, 0, 18),
  ]);
  expect(onSelect![3][0]).toEqual([
    new Date(2010, 0, 10),
    new Date(2010, 0, 17),
    new Date(2010, 0, 18),
    new Date(2010, 0, 13),
  ]);
});

test('select event when type is multiple', async () => {
  const wrapper = mount(Calendar, {
    props: {
      type: 'multiple',
      minDate,
      maxDate,
      poppable: false,
      defaultDate: [minDate],
      lazyRender: false,
    },
  });

  await later();

  const days = wrapper.findAll('.van-calendar__day');
  days[15].trigger('click');
  await later();
  days[15].trigger('click');

  expect(wrapper.emitted<[Date]>('unselect')![0][0]).toEqual(
    new Date(2010, 0, 16),
  );
});

test('should not trigger select event when click disabled day', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  wrapper.findAll('.van-calendar__day')[1].trigger('click');

  expect(wrapper.emitted('select')).toBeFalsy();
});

test('should trigger click-disabled-date event when click disabled day', async () => {
  const fn = vi.fn();
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
      onClickDisabledDate: fn,
    },
  });

  await later();

  const disabeldDate = wrapper.findAll('.van-calendar__day--disabled')[0];
  expect(disabeldDate).toBeDefined();
  await disabeldDate.trigger('click');
  expect(fn).toHaveBeenCalled();
});

test('confirm event when type is single', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  wrapper.findAll('.van-calendar__day')[15].trigger('click');

  expect(wrapper.emitted('confirm')).toBeFalsy();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual(
    new Date(2010, 0, 16),
  );
});

test('confirm event when type is range', async () => {
  const wrapper = mount(Calendar, {
    props: {
      type: 'range',
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  const days = wrapper.findAll('.van-calendar__day');
  days[15].trigger('click');
  days[18].trigger('click');

  expect(wrapper.emitted('confirm')).toBeFalsy();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual([
    new Date(2010, 0, 16),
    new Date(2010, 0, 19),
  ]);
});

test('default range date', async () => {
  const wrapper = mount(Calendar, {
    props: {
      type: 'range',
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual([
    now,
    getNextDay(now),
  ]);
});

test('default single date', async () => {
  const wrapper = mount(Calendar, {
    props: {
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual(now);
});

test('set show-confirm to false', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      type: 'range',
      poppable: false,
      showConfirm: false,
      lazyRender: false,
    },
  });

  await later();

  const days = wrapper.findAll('.van-calendar__day');
  days[15].trigger('click');
  days[18].trigger('click');

  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual([
    new Date(2010, 0, 16),
    new Date(2010, 0, 19),
  ]);
});

test('row-height prop', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      rowHeight: 50,
      defaultDate: minDate,
      lazyRender: false,
    },
  });

  await later();

  expect(wrapper.find('.van-calendar__day').style.height).toEqual('50px');
});

test('formatter prop', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      defaultDate: minDate,
      lazyRender: false,
      formatter(day: CalendarDayItem) {
        const date = day.date?.getDate();

        switch (date) {
          case 11:
            day.topInfo = 'Top Info';
            break;
          case 12:
            day.bottomInfo = 'Bottom Info';
            break;
          case 13:
            day.text = 'Text';
            break;
          case 14:
            day.className = 'test';
            break;
        }

        return day;
      },
    },
  });

  await later(50);

  expect(wrapper.html()).toMatchSnapshot();
});

test('should render title、footer、subtitle slot correctly', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      defaultDate: minDate,
      lazyRender: false,
    },
    slots: {
      title: () => 'Custom Title',
      footer: () => 'Custom Footer',
      subtitle: () => 'Custom Subtitle',
    },
  });

  await later(50);

  expect(wrapper.html()).toMatchSnapshot();
});

test('should render subtitle slot with params', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      defaultDate: minDate,
      lazyRender: false,
    },
    slots: {
      subtitle: ({ text }) => `Custom Subtitle ${text}`,
    },
  });

  await later(50);

  expect(
    wrapper.find('.van-calendar__header-subtitle').html(),
  ).toMatchSnapshot();
});

test('should render month-title slot correctly', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate: new Date(2010, 1, 20),
      poppable: false,
      defaultDate: minDate,
      lazyRender: false,
    },
    slots: {
      'month-title': () => ` Custom Month Title`,
    },
  });

  await later(50);

  expect(wrapper.find('.van-calendar__month-title').html()).toMatchSnapshot();
});

test('should reset when type changed', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      defaultDate: minDate,
      lazyRender: false,
    },
  });

  await later();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual(
    new Date(2010, 0, 10),
  );

  await wrapper.setProps({
    type: 'range',
    defaultDate: [minDate, getNextDay(minDate)],
  });
  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![1][0]).toEqual([
    new Date(2010, 0, 10),
    new Date(2010, 0, 11),
  ]);
});

test('default-date prop in single type', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      defaultDate: getNextDay(minDate),
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual(
    new Date(2010, 0, 11),
  );

  await wrapper.setProps({ defaultDate: maxDate });
  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![1][0]).toEqual(
    new Date(2010, 0, 20),
  );
});

test('default-date prop in range type', async () => {
  const wrapper = mount(Calendar, {
    props: {
      type: 'range',
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  await wrapper.setProps({ defaultDate: null });
  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted('confirm')).toBeFalsy();

  const days = wrapper.findAll('.van-calendar__day');
  await days[15].trigger('click');
  await days[18].trigger('click');
  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual([
    new Date(2010, 0, 16),
    new Date(2010, 0, 19),
  ]);
});

test('popup wrapper', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      defaultDate: minDate,
      show: false,
      'onUpdate:show': (show: boolean) => {
        wrapper.setProps({ show });
      },
    },
  });

  await later(50);
  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.setProps({ show: true });
  await later(50);

  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.find('.van-popup__close-icon').trigger('click');
  expect(wrapper.find('.van-calendar__popup').style.display).toEqual('none');
});

test('should trigger click-overlay event when overlay is clicked', async () => {
  const onClickOverlay = vi.fn();
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      defaultDate: minDate,
      show: true,
      onClickOverlay,
    },
  });

  wrapper.find('.van-overlay').trigger('click');
  expect(onClickOverlay).toHaveBeenCalled();
});

test('set show-mark prop to false', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      showMark: false,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();

  expect(wrapper.find('.van-calendar__month-mark').exists()).toBeFalsy();
});

test('color prop when type is single', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      color: 'blue',
      poppable: false,
      defaultDate: minDate,
      lazyRender: false,
    },
  });

  await later();

  expect(wrapper.find('.van-calendar__selected-day').style.background).toEqual(
    'blue',
  );
});

test('color prop when type is range', async () => {
  const wrapper = mount(Calendar, {
    props: {
      defaultDate: [minDate, maxDate],
      type: 'range',
      minDate,
      maxDate,
      color: 'blue',
      poppable: false,
    },
  });

  await later(50);

  expect(wrapper.find('.van-calendar__day--start').style.background).toEqual(
    'blue',
  );
  expect(wrapper.find('.van-calendar__day--middle').style.color).toEqual(
    'blue',
  );
  expect(wrapper.find('.van-calendar__day--end').style.background).toEqual(
    'blue',
  );
});

test('close event', async () => {
  const onClose = vi.fn();
  const wrapper = mount(Calendar, {
    props: {
      show: true,
      onClose,
    },
  });

  await wrapper.setProps({ show: false });

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('should render top-info, bottom-info and text slot correctly', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      defaultDate: minDate,
      lazyRender: false,
    },
    slots: {
      'top-info': (item) => 'top: ' + item.text,
      'bottom-info': (item) => 'bottom: ' + item.text,
      text: (item) => 'text: ' + item.text,
    },
  });

  await later(50);

  expect(wrapper.find('.van-calendar__day').html()).toMatchSnapshot();
});

test('should emit clickSubtitle event when clicking the subtitle', async () => {
  const wrapper = mount(Calendar, {
    props: {
      minDate,
      maxDate,
      poppable: false,
      lazyRender: false,
    },
  });

  await later();
  wrapper.find('.van-calendar__header-subtitle').trigger('click');
  expect(wrapper.emitted('clickSubtitle')).toBeTruthy();
});

test('should render confirm-text slot correctly', async () => {
  const wrapper = mount(Calendar, {
    props: {
      poppable: false,
      lazyRender: false,
    },
    slots: {
      'confirm-text': ({ disabled }) => `Custom confirm text ${disabled}`,
    },
  });

  await later(50);

  expect(wrapper.find('.van-calendar__confirm').html()).toMatchSnapshot();
});

test('the defaultDate length of 1 should be handled correctly', async () => {
  const wrapper = mount(Calendar, {
    props: {
      poppable: false,
      defaultDate: [getNextDay(now)],
      type: 'range',
    },
  });

  wrapper.find('.van-calendar__confirm').trigger('click');
  expect(wrapper.emitted<[Date]>('confirm')![0][0]).toEqual([
    now,
    getNextDay(now),
  ]);
});
