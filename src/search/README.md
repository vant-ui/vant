# Search

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways。

```js
import { createApp } from 'vue';
import { Search } from 'vant';

const app = createApp();
app.use(Search);
```

## Usage

### Basic Usage

```html
<van-search v-model="value" placeholder="Placeholder" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const value = ref('');
    return { value };
  },
};
```

### Listen to Events

`search` event will be Emitted when click the search button on the keyboard, `cancel` event will be Emitted when click the cancel button.

```html
<form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="Placeholder"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
```

```js
import { ref } from 'vue';
import { Toast } from 'vant';

export default {
  setup() {
    const value = ref('');
    const onSearch = (val) => Toast(val);
    const onCancel = () => Toast('Cancel');
    return {
      value,
      onSearch,
      onCancel,
    };
  },
};
```

> Tips: There will be a search button on the keyboard when Search is inside a form in iOS.

### Input Align

```html
<van-search v-model="value" input-align="center" placeholder="Placeholder" />
```

### Disabled

```html
<van-search v-model="value" disabled placeholder="Placeholder" />
```

### Custom Background Color

```html
<van-search
  v-model="value"
  shape="round"
  background="#4fc08d"
  placeholder="Placeholder"
/>
```

### Custom Action Button

Use `action` slot to custom right button, `cancel` event will no longer be Emitted when use this slot.

```html
<van-search
  v-model="value"
  show-action
  label="Address"
  placeholder="Placeholder"
  @search="onSearch"
>
  <template #action>
    <div @click="onSearch">Search</div>
  </template>
</van-search>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| label | Left side label | _string_ | - |
| shape | Shape of field, can be set to `round` | _string_ | `square` |
| background | Background color of field | _string_ | `#f2f2f2` |
| maxlength | Max length of value | _number \| string_ | - |
| placeholder | Placeholder | _string_ | - |
| clearable | Whether to be clearable | _boolean_ | `true` |
| clear-icon `v3.0.12` | Clear icon name | _string_ | `clear` |
| clear-trigger | When to display the clear icon, `always` means to display the icon when value is not empty, `focus` means to display the icon when input is focused | _string_ | `focus` |
| autofocus | Whether to auto focus, unsupported in iOS | _boolean_ | `false` |
| show-action | Whether to show right action button | _boolean_ | `false` |
| action-text | Text of action button | _boolean_ | `Cancel` |
| disabled | Whether to disable field | _boolean_ | `false` |
| readonly | Whether to be readonly | _boolean_ | `false` |
| error | Whether to mark the input content in red | _boolean_ | `false` |
| error-message `v3.0.12` | Error message | _string_ | - |
| formatter `v3.0.12` | Input value formatter | _(val: string) => string_ | - |
| format-trigger `v3.0.12` | When to format value，can be set to `onBlur` | _string_ | `onChange` |
| input-align | Text align of field, can be set to `center` `right` | _string_ | `left` |
| left-icon | Left icon name | _string_ | `search` |
| right-icon | Right icon name | _string_ | - |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| search | Emitted when confirming search | _value: string_ |
| update:model-value | Emitted when input value changed | _value: string_ |
| focus | Emitted when input is focused | _event: Event_ |
| blur | Emitted when input is blured | _event: Event_ |
| clear | Emitted when the clear icon is clicked | _event: Event_ |
| cancel | Emitted when the cancel button is clicked | - |

### Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get Search instance and call instance methods.

| Name  | Description         | Attribute | Return value |
| ----- | ------------------- | --------- | ------------ |
| focus | Trigger input focus | -         | -            |
| blur  | Trigger input blur  | -         | -            |

### Slots

| Name       | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| left       | Custom left side content                                    |
| action     | Custom right button, displayed when `show-action` is `true` |
| label      | Custom Search label                                         |
| left-icon  | Custom left icon                                            |
| right-icon | Custom right icon                                           |

### Less Variables

How to use: [Custom Theme](#/en-US/theme).

| Name                             | Default Value      | Description |
| -------------------------------- | ------------------ | ----------- |
| @search-padding                  | `10px @padding-sm` | -           |
| @search-background-color         | `@white`           | -           |
| @search-content-background-color | `@gray-1`          | -           |
| @search-input-height             | `34px`             | -           |
| @search-label-padding            | `0 5px`            | -           |
| @search-label-color              | `@text-color`      | -           |
| @search-label-font-size          | `@font-size-md`    | -           |
| @search-left-icon-color          | `@gray-6`          | -           |
| @search-action-padding           | `0 @padding-xs`    | -           |
| @search-action-text-color        | `@text-color`      | -           |
| @search-action-font-size         | `@font-size-md`    | -           |
