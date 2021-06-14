# Tag 标签

### 介绍

用于标记关键词和概括主要内容。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Tag } from 'vant';

const app = createApp();
app.use(Tag);
```

## 代码演示

### 基础用法

通过 `type` 属性控制标签颜色。

```html
<van-tag type="primary">标签</van-tag>
<van-tag type="success">标签</van-tag>
<van-tag type="danger">标签</van-tag>
<van-tag type="warning">标签</van-tag>
```

### 空心样式

设置 `plain` 属性设置为空心样式。

```html
<van-tag plain type="primary">标签</van-tag>
```

### 圆角样式

通过 `round` 设置为圆角样式。

```html
<van-tag round type="primary">标签</van-tag>
```

### 标记样式

通过 `mark` 设置为标记样式(半圆角)。

```html
<van-tag mark type="primary">标签</van-tag>
```

### 可关闭标签

添加 `closeable` 属性表示标签是可关闭的，关闭标签时会触发 `close` 事件，在 `close` 事件中可以执行隐藏标签的逻辑。

```html
<van-tag :show="show" closeable size="medium" type="primary" @close="close">
  标签
</van-tag>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(true);
    const close = () => {
      show.value = false;
    };

    return {
      show,
      close,
    };
  },
};
```

### 标签大小

通过 `size` 属性调整标签大小。

```html
<van-tag type="primary">标签</van-tag>
<van-tag type="primary" size="medium">标签</van-tag>
<van-tag type="primary" size="large">标签</van-tag>
```

### 自定义颜色

通过 `color` 和 `text-color` 属性设置标签颜色。

```html
<van-tag color="#7232dd">标签</van-tag>
<van-tag color="#ffe1e1" text-color="#ad0000">标签</van-tag>
<van-tag color="#7232dd" plain>标签</van-tag>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `success` `danger` `warning` | _string_ | `default` |
| size | 大小, 可选值为 `large` `medium` | _string_ | - |
| color | 标签颜色 | _string_ | - |
| show | 是否展示标签 | _boolean_ | `true` |
| plain | 是否为空心样式 | _boolean_ | `false` |
| round | 是否为圆角样式 | _boolean_ | `false` |
| mark | 是否为标记样式 | _boolean_ | `false` |
| text-color | 文本颜色，优先级高于 `color` 属性 | _string_ | `white` |
| closeable | 是否为可关闭标签 | _boolean_ | `false` |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 标签显示内容 |

### Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击时触发     | _event: MouseEvent_ |
| close  | 关闭标签时触发 | _event: MouseEvent_ |

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --van-tag-padding | `0 var(--van-padding-base)` | - |
| --van-tag-text-color | `var(--van-white)` | - |
| --van-tag-font-size | `var(--van-font-size-sm)` | - |
| --van-tag-border-radius | `2px` | - |
| --van-tag-line-height | `16px` | - |
| --van-tag-medium-padding | `2px 6px` | - |
| --van-tag-large-padding | `var(--van-padding-base) var(--van-padding-xs)` | - |
| --van-tag-large-border-radius | `var(--van-border-radius-md)` | - |
| --van-tag-large-font-size | `var(--van-font-size-md)` | - |
| --van-tag-round-border-radius | `var(--van-border-radius-max)` | - |
| --van-tag-danger-color | `var(--van-red)` | - |
| --van-tag-primary-color | `var(--van-blue)` | - |
| --van-tag-success-color | `var(--van-green)` | - |
| --van-tag-warning-color | `var(--van-orange)` | - |
| --van-tag-default-color | `var(--van-gary-6)` | - |
| --van-tag-plain-background-color | `var(--van-white)` | - |
