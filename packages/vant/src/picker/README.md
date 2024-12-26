# Picker

### Intro

The picker component is usually used with [Popup](#/en-US/popup) Component.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Picker } from 'vant';

const app = createApp();
app.use(Picker);
```

## Usage

### Basic Usage

```html
<van-picker
  title="Title"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
  @change="onChange"
/>
```

```js
import { showToast } from 'vant';

export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' },
    ];
    const onConfirm = ({ selectedValues }) => {
      showToast(`Value: ${selectedValues.join(',')}`);
    };
    const onChange = ({ selectedValues }) => {
      showToast(`Value: ${selectedValues.join(',')}`);
    };
    const onCancel = () => showToast('Cancel');

    return {
      columns,
      onChange,
      onCancel,
      onConfirm,
    };
  },
};
```

### With Popup

```html
<van-field
  v-model="fieldValue"
  is-link
  readonly
  label="City"
  placeholder="Choose City"
  @click="showPicker = true"
/>
<van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
  <van-picker
    :model-value="pickerValue"
    title="Title"
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</van-popup>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' },
    ];
    const fieldValue = ref('');
    const pickerValue = ref<Numeric[]>([]);
    const showPicker = ref(false);

    const onConfirm = ({ selectedValues, selectedOptions }) => {
      showPicker.value = false;
      pickerValue.value = selectedValues;
      fieldValue.value = selectedOptions[0].text;
    };

    return {
      columns,
      onConfirm,
      fieldValue,
      showPicker,
    };
  },
};
```

### v-model

Using `v-model` to bind selected values.

```html
<van-picker v-model="selectedValues" title="Title" :columns="columns" />
```

```js
import { showToast } from 'vant';

export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' },
    ];
    const selectedValues = ref(['Wenzhou']);

    return {
      columns,
      selectedValues,
    };
  },
};
```

### Multiple Columns

```html
<van-picker title="Title" :columns="columns" />
```

```js
export default {
  setup() {
    const columns = [
      [
        { text: 'Monday', value: 'Monday' },
        { text: 'Tuesday', value: 'Tuesday' },
        { text: 'Wednesday', value: 'Wednesday' },
        { text: 'Thursday', value: 'Thursday' },
        { text: 'Friday', value: 'Friday' },
      ],
      [
        { text: 'Morning', value: 'Morning' },
        { text: 'Afternoon', value: 'Afternoon' },
        { text: 'Evening', value: 'Evening' },
      ],
    ];

    return { columns };
  },
};
```

### Cascade

```html
<van-picker title="Title" :columns="columns" />
```

```js
export default {
  setup() {
    const columns = [
      {
        text: 'Zhejiang',
        value: 'Zhejiang',
        children: [
          {
            text: 'Hangzhou',
            value: 'Hangzhou',
            children: [
              { text: 'Xihu', value: 'Xihu' },
              { text: 'Yuhang', value: 'Yuhang' },
            ],
          },
          {
            text: 'Wenzhou',
            value: 'Wenzhou',
            children: [
              { text: 'Lucheng', value: 'Lucheng' },
              { text: 'Ouhai', value: 'Ouhai' },
            ],
          },
        ],
      },
      {
        text: 'Fujian',
        value: 'Fujian',
        children: [
          {
            text: 'Fuzhou',
            value: 'Fuzhou',
            children: [
              { text: 'Gulou', value: 'Gulou' },
              { text: 'Taijiang', value: 'Taijiang' },
            ],
          },
          {
            text: 'Xiamen',
            value: 'Xiamen',
            children: [
              { text: 'Siming', value: 'Siming' },
              { text: 'Haicang', value: 'Haicang' },
            ],
          },
        ],
      },
    ];

    return { columns };
  },
};
```

### Disable option

```html
<van-picker :columns="columns" />
```

```js
export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware', disabled: true },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
    ];
    return { columns };
  },
};
```

### Loading

When Picker columns data is acquired asynchronously, use `loading` prop to show loading prompt.

```html
<van-picker title="Title" :columns="columns" :loading="loading" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const columns = ref([]);
    const loading = ref(true);

    setTimeout(() => {
      columns.value = [{ text: 'Option', value: 'option' }];
      loading.value = false;
    }, 1000);

    return { columns, loading };
  },
};
```

### Empty content

When the data is empty, you can use the `empty` slot to customize the empty content.

```html
<van-picker title="Title">
  <template #empty>
    <van-empty
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="No data"
    />
  </template>
</van-picker>
```

### Custom Columns Field

```html
<van-picker
  title="Title"
  :columns="columns"
  :columns-field-names="customFieldName"
/>
```

```js
export default {
  setup() {
    const columns = [
      {
        cityName: 'Zhejiang',
        cities: [
          {
            cityName: 'Hangzhou',
            cities: [{ cityName: 'Xihu' }, { cityName: 'Yuhang' }],
          },
          {
            cityName: 'Wenzhou',
            cities: [{ cityName: 'Lucheng' }, { cityName: 'Ouhai' }],
          },
        ],
      },
      {
        cityName: 'Fujian',
        cities: [
          {
            cityName: 'Fuzhou',
            cities: [{ cityName: 'Gulou' }, { cityName: 'Taijiang' }],
          },
          {
            cityName: 'Xiamen',
            cities: [{ cityName: 'Siming' }, { cityName: 'Haicang' }],
          },
        ],
      },
    ];

    const customFieldName = {
      text: 'cityName',
      value: 'cityName',
      children: 'cities',
    };

    return {
      columns,
      customFieldName,
    };
  },
};
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | values of chosen option | _number[] \| string[]_ | - |
| columns | Columns data | _PickerOption[] \| PickerOption[][]_ | `[]` |
| columns-field-names | custom columns field | _object_ | `{ text: 'text', value: 'value', children: 'children' }` |
| title | Toolbar title | _string_ | - |
| confirm-button-text | Text of confirm button, setting it as an empty string can hide the button | _string_ | `Confirm` |
| cancel-button-text | Text of cancel button, setting it as an empty string can hide the button | _string_ | `Cancel` |
| toolbar-position | Toolbar position, cat be set to `bottom` | _string_ | `top` |
| loading | Whether to show loading prompt | _boolean_ | `false` |
| readonly | Whether to be readonly | _boolean_ | `false` |
| show-toolbar | Whether to show toolbar | _boolean_ | `true` |
| allow-html | Whether to allow HTML in option text | _boolean_ | `false` |
| option-height | Option height, supports `px` `vw` `vh` `rem` unit, default `px` | _number \| string_ | `44` |
| visible-option-num | Count of visible columns | _number \| string_ | `6` |
| swipe-duration | Duration of the momentum animation, unit `ms` | _number \| string_ | `1000` |
| direction | Sliding direction, adapts to the sliding of options after the element is rotated, cat be set to `horizontal` | _string_ | `vertical` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| confirm | Emitted when the confirm button is clicked | _{ selectedValues, selectedOptions, selectedIndexes }_ |
| cancel | Emitted when the cancel button is clicked | _{ selectedValues, selectedOptions, selectedIndexes }_ |
| change | Emitted when current selected option is changed | _{ selectedValues, selectedOptions,selectedIndexes, columnIndex }_ |
| click-option | Emitted when an option is clicked | _{ currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex }_ |
| scroll-into `v4.2.1` | Emitted when an option is scrolled into the middle selection area by clicking or dragging | _{ currentOption, columnIndex }_ |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| toolbar | Custom toolbar content | - |
| title | Custom title | - |
| confirm | Custom confirm button text | - |
| cancel | Custom cancel button text | - |
| option | Custom option content | _option: PickerOption, index: number_ |
| columns-top | Custom content above columns | - |
| columns-bottom | Custom content below columns | - |
| empty `v4.9.10` | Custom empty content | - |

### Data Structure of PickerOption

| Key       | Description               | Type                        |
| --------- | ------------------------- | --------------------------- |
| text      | Text                      | _string \| number_          |
| value     | Value of option           | _string \| number_          |
| disabled  | Whether to disable option | _boolean_                   |
| children  | Cascade children options  | _PickerOption[]_            |
| className | ClassName for this option | _string \| Array \| object_ |

### Methods

Use [ref](https://vuejs.org/guide/essentials/template-refs.html) to get Picker instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| confirm | Stop scrolling and emit confirm event | - | - |
| getSelectedOptions | Get current selected options | - | _(PickerOption \| undefined)[]_ |

### Types

The component exports the following type definitions:

```ts
import type {
  PickerProps,
  PickerColumn,
  PickerOption,
  PickerInstance,
  PickerFieldNames,
  PickerToolbarPosition,
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerConfirmEventParams,
} from 'vant';
```

`PickerInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { PickerInstance } from 'vant';

const pickerRef = ref<PickerInstance>();

pickerRef.value?.confirm();
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --van-picker-background | _var(--van-background-2)_ | - |
| --van-picker-toolbar-height | _44px_ | - |
| --van-picker-title-font-size | _var(--van-font-size-lg)_ | - |
| --van-picker-title-line-height | _var(--van-line-height-md)_ | - |
| --van-picker-action-padding | _0 var(--van-padding-md)_ | - |
| --van-picker-action-font-size | _var(--van-font-size-md)_ | - |
| --van-picker-confirm-action-color | _var(--van-primary-color)_ | - |
| --van-picker-cancel-action-color | _var(--van-text-color-2)_ | - |
| --van-picker-option-padding | _0 var(--van-padding-base)_ | - |
| --van-picker-option-font-size | _var(--van-font-size-lg)_ | - |
| --van-picker-option-text-color | _var(--van-text-color)_ | - |
| --van-picker-option-disabled-opacity | _0.3_ | - |
| --van-picker-mask-color | _linear-gradient_ | - |
| --van-picker-loading-icon-color | _var(--van-primary-color)_ | - |
| --van-picker-loading-mask-color | _rgba(255, 255, 255, 0.9)_ | - |
