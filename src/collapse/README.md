# Collapse

### Install

```js
import Vue from 'vue';
import { Collapse, CollapseItem } from 'vant';

Vue.use(Collapse);
Vue.use(CollapseItem);
```

## Usage

### Basic Usage

Use `v-model` to control the name of active panels.

```html
<van-collapse v-model="activeNames">
  <van-collapse-item title="Title1" name="1">Content</van-collapse-item>
  <van-collapse-item title="Title2" name="2">Content</van-collapse-item>
  <van-collapse-item title="Title3" name="3">Content</van-collapse-item>
</van-collapse>
```

```js
export default {
  data() {
    return {
      activeNames: ['1'],
    };
  },
};
```

### Accordion

In accordion mode, only one panel can be expanded at the same time.

```html
<van-collapse v-model="activeName" accordion>
  <van-collapse-item title="Title1" name="1">Content</van-collapse-item>
  <van-collapse-item title="Title2" name="2">Content</van-collapse-item>
  <van-collapse-item title="Title3" name="3">Content</van-collapse-item>
</van-collapse>
```

```js
export default {
  data() {
    return {
      activeName: '1',
    };
  },
};
```

### Disabled

Use the `disabled` prop to disable CollapseItem.

```html
<van-collapse v-model="activeNames">
  <van-collapse-item title="Title1" name="1">Content</van-collapse-item>
  <van-collapse-item title="Title2" name="2" disabled>
    Content
  </van-collapse-item>
  <van-collapse-item title="Title3" name="3" disabled>
    Content
  </van-collapse-item>
</van-collapse>
```

### Custom title

```html
<van-collapse v-model="activeNames">
  <van-collapse-item name="1">
    <template #title>
      <div>Title1 <van-icon name="question-o" /></div>
    </template>
    Content
  </van-collapse-item>
  <van-collapse-item title="Title2" name="2" icon="shop-o">
    Content
  </van-collapse-item>
</van-collapse>
```

```js
export default {
  data() {
    return {
      activeNames: ['1'],
    };
  },
};
```

## API

### Collapse Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Names of current active panels | accordion mode： _number \| string_<br>non-accordion mode：_(number \| string)[]_ | - |
| accordion | Whether to be accordion mode | _boolean_ | `false` |
| border | Whether to show outer border | _boolean_ | `true` |

### Collapse Events

| Event  | Description                  | Arguments   |
| ------ | ---------------------------- | ----------- |
| change | Emitted when switching panel | activeNames |

### CollapseItem Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| name | Name | _number \| string_ | `index` |
| icon | Left Icon | _string_ | - |
| size | Title size，can be set to `large` | _string_ | - |
| title | Title | _number \| string_ | - |
| value | Right text | _number \| string_ | - |
| label | Description below the title | _string_ | - |
| border | Whether to show inner border | _boolean_ | `true` |
| disabled | Whether to disabled collapse | _boolean_ | `false` |
| is-link | Whether to show link icon | _boolean_ | `true` |
| lazy-render `v2.12.43` | Whether to lazy render util opened | _boolean_ | `true` |
| title-class | Title className | _string_ | - |
| value-class | Value className | _string_ | - |
| label-class | Label className | _string_ | - |
| expand-in-viewport | Whether to expand inside viewport | _boolean_ | `false` |

### CollapseItem Slots

| Name       | Description       |
| ---------- | ----------------- |
| default    | Content           |
| value      | Custom value      |
| icon       | Custom icon       |
| title      | Custom title      |
| right-icon | Custom right icon |

### CollapseItem Methods

Use [ref](https://vuejs.org/v2/api/#ref) to get CollapseItem instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| toggle `v2.10.9` | Toggle expanded status | _expanded: boolean_ | - |

### Less Variables

How to use: [Custom Theme](#/en-US/theme).

| Name | Default Value | Description |
| --- | --- | --- |
| @collapse-item-transition-duration | `@animation-duration-base` | - |
| @collapse-item-content-padding | `@padding-sm @padding-md` | - |
| @collapse-item-content-font-size | `@font-size-md` | - |
| @collapse-item-content-line-height | `1.5` | - |
| @collapse-item-content-text-color | `@gray-6` | - |
| @collapse-item-content-background-color | `@white` | - |
| @collapse-item-title-disabled-color | `@gray-5` | - |
