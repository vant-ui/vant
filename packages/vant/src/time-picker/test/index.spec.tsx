import TimePicker from '../TimePicker';
import { Picker } from '../../picker';
import { mount } from '../../../test';
import type { PickerOption } from '../../picker';

function filter(type: string, options: PickerOption[]): PickerOption[] {
  const mod = type === 'minute' ? 20 : 10;
  return options.filter((option) => Number(option.value) % mod === 0);
}

function timeRangeFilter(
  type: string,
  options: PickerOption[],
  values: string[],
): PickerOption[] {
  const hour = +values[0];

  if (type === 'hour') {
    return options.filter(
      (option) => Number(option.value) >= 8 && Number(option.value) <= 18,
    );
  }

  if (type === 'minute') {
    if (hour === 8) {
      return options.filter((option) => Number(option.value) >= 40);
    }

    if (hour === 18) {
      return options.filter((option) => Number(option.value) <= 20);
    }
  }

  return options;
}

test('should format initial value correctly', () => {
  const onUpdate = vi.fn();
  mount(TimePicker, {
    props: {
      minHour: 22,
      minMinute: 58,
      'onUpdate:modelValue': onUpdate,
    },
  });

  expect(onUpdate.mock.calls[0]).toEqual([['22', '58']]);
});

describe('should update modelValue correctly', () => {
  test('basic', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: ['-10', '-10'],
        'onUpdate:modelValue': onUpdate,
      },
    });

    await wrapper.setProps({ modelValue: ['30', '80'] });
    await wrapper.setProps({ modelValue: ['2', '2'] });

    expect(onUpdate.mock.calls[0]).toEqual([['00', '00']]);
    expect(onUpdate.mock.calls[1]).toEqual([['23', '59']]);
    expect(onUpdate.mock.calls[2]).toEqual([['02', '02']]);
  });

  test('when using max-hour and max-minute prop', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: ['23', '59'],
        maxHour: 2,
        maxMinute: 2,
        'onUpdate:modelValue': onUpdate,
      },
    });

    await wrapper.setProps({ maxHour: 12, maxMinute: 12 });
    await wrapper.setProps({ modelValue: ['23', '59'] });

    expect(onUpdate.mock.calls[0]).toEqual([['02', '02']]);
    expect(onUpdate.mock.calls[1]).toEqual([['12', '12']]);
  });

  test('when using min-hour and min-minute prop', async () => {
    const onUpdate = vi.fn();
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: ['00', '00'],
        minHour: 2,
        minMinute: 2,
        'onUpdate:modelValue': onUpdate,
      },
    });

    await wrapper.setProps({ minHour: 12, minMinute: 12 });
    await wrapper.setProps({ modelValue: ['00', '00'] });

    expect(onUpdate.mock.calls[0]).toEqual([['02', '02']]);
    expect(onUpdate.mock.calls[1]).toEqual([['12', '12']]);
  });
});

test('should filter options when using filter prop', () => {
  const wrapper = mount(TimePicker, {
    props: {
      filter,
      modelValue: ['12', '00'],
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should filter options when using filter prop to filter a time range', async () => {
  const wrapper = mount(TimePicker, {
    props: {
      filter: timeRangeFilter,
      modelValue: ['08', '40'],
    },
  });

  const picker = wrapper.findComponent(Picker);
  let columns = picker.props('columns')!;
  expect(columns[0].length).toEqual(11);
  expect(columns[1].length).toEqual(20);
  expect(columns[0][0].value).toEqual('08');
  expect(columns[1][0].value).toEqual('40');

  await wrapper.setProps({ modelValue: ['09', '00'] });
  columns = picker.props('columns')!;
  expect(columns[1].length).toEqual(60);

  await wrapper.setProps({ modelValue: ['18', '00'] });
  columns = picker.props('columns')!;
  expect(columns[1].length).toEqual(21);
  expect(columns[1][20].value).toEqual('20');
});

test('should format options correctly when using formatter prop', async () => {
  const formatter = (type: string, option: PickerOption): PickerOption => {
    option.text = `${option.text} ${type}`;
    return option;
  };
  const wrapper = mount(TimePicker, {
    props: {
      filter,
      formatter,
      modelValue: ['12', '00'],
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});

test('should emit confirm event after clicking the confirm button', async () => {
  const wrapper = mount(TimePicker, {
    props: {
      modelValue: ['12', '00'],
    },
  });

  await wrapper.find('.van-picker__confirm').trigger('click');
  expect(wrapper.emitted('confirm')).toEqual([
    [
      {
        selectedOptions: [
          { text: '12', value: '12' },
          { text: '00', value: '00' },
        ],
        selectedValues: ['12', '00'],
        selectedIndexes: [12, 0],
      },
    ],
  ]);
});

test('should emit cancel event after clicking the cancel button', () => {
  const wrapper = mount(TimePicker);

  wrapper.find('.van-picker__cancel').trigger('click');
  expect(wrapper.emitted('cancel')).toBeTruthy();
});

test('should emit confirm event correctly after setting values', async () => {
  const wrapper = mount(TimePicker);

  await wrapper.setProps({ modelValue: ['00', '00'] });
  await wrapper.find('.van-picker__confirm').trigger('click');
  await wrapper.setProps({ modelValue: ['22', '30'] });
  await wrapper.find('.van-picker__confirm').trigger('click');

  expect(wrapper.emitted('confirm')).toEqual([
    [
      {
        selectedOptions: [
          { text: '00', value: '00' },
          { text: '00', value: '00' },
        ],
        selectedValues: ['00', '00'],
        selectedIndexes: [0, 0],
      },
    ],
    [
      {
        selectedOptions: [
          { text: '22', value: '22' },
          { text: '30', value: '30' },
        ],
        selectedValues: ['22', '30'],
        selectedIndexes: [22, 30],
      },
    ],
  ]);
});

test('should emit confirm event correctly after setting range', async () => {
  const onUpdate = vi.fn();
  const wrapper = mount(TimePicker, {
    props: {
      minHour: 0,
      minMinute: 0,
      modelValue: ['12', '00'],
      'onUpdate:modelValue': onUpdate,
    },
  });

  await wrapper.setProps({ minHour: 20, minMinute: 30 });
  await wrapper.find('.van-picker__confirm').trigger('click');
  expect(onUpdate.mock.calls[0]).toEqual([['20', '30']]);
  expect(wrapper.emitted('confirm')).toEqual([
    [
      {
        selectedOptions: [
          { text: '20', value: '20' },
          { text: '30', value: '30' },
        ],
        selectedValues: ['20', '30'],
        selectedIndexes: [0, 0],
      },
    ],
  ]);
});

test('should emit confirm event correctly after setting smaller max-hour and max-minute', async () => {
  const wrapper = mount(TimePicker, {
    props: {
      modelValue: ['23', '59'],
    },
  });

  await wrapper.setProps({
    maxHour: 2,
    maxMinute: 2,
  });

  await wrapper.find('.van-picker__confirm').trigger('click');
  expect(wrapper.emitted('confirm')).toEqual([
    [
      {
        selectedOptions: [
          { text: '00', value: '00' },
          { text: '00', value: '00' },
        ],
        selectedValues: ['00', '00'],
        selectedIndexes: [0, 0],
      },
    ],
  ]);
});

test('should time range when set props min-time', async () => {
  const wrapper = mount(TimePicker, {
    props: {
      minTime: '09:40:10',
      maxTime: '20:20:50',
      modelValue: ['08', '30', '00'],
      columnsType: ['hour', 'minute', 'second'],
    },
  });

  await wrapper.find('.van-picker__confirm').trigger('click');
  expect(wrapper.emitted('confirm')?.[0]).toEqual([
    {
      selectedOptions: [
        { text: '09', value: '09' },
        { text: '40', value: '40' },
        { text: '10', value: '10' },
      ],
      selectedValues: ['09', '40', '10'],
      selectedIndexes: [0, 0, 0],
    },
  ]);
});

test('should time range when set props max-time', async () => {
  const wrapper = mount(TimePicker, {
    props: {
      minTime: '09:40:10',
      maxTime: '20:20:50',
      modelValue: ['23', '30', '55'],
      columnsType: ['hour', 'minute', 'second'],
    },
  });

  await wrapper.find('.van-picker__confirm').trigger('click');
  expect(wrapper.emitted('confirm')?.[0]).toEqual([
    {
      selectedOptions: [
        { text: '20', value: '20' },
        { text: '20', value: '20' },
        { text: '50', value: '50' },
      ],
      selectedValues: ['20', '20', '50'],
      selectedIndexes: [11, 20, 50],
    },
  ]);
});

test('update modelValue to undefined', async () => {
  const wrapper = mount(TimePicker, {
    props: {
      modelValue: ['12', '00'],
    },
  });

  await wrapper.find('.van-picker__confirm').trigger('click');
  expect(wrapper.emitted('confirm')?.[0]).toEqual([
    {
      selectedOptions: [
        { text: '12', value: '12' },
        { text: '00', value: '00' },
      ],
      selectedValues: ['12', '00'],
      selectedIndexes: [12, 0],
    },
  ]);

  await wrapper.setProps({ modelValue: undefined });
  await wrapper.find('.van-picker__confirm').trigger('click');
  expect(wrapper.emitted('confirm')?.[1]).toEqual([
    {
      selectedOptions: [
        { text: '00', value: '00' },
        { text: '00', value: '00' },
      ],
      selectedValues: ['00', '00'],
      selectedIndexes: [0, 0],
    },
  ]);
});
