# RollingText 翻滚文本动效

### 介绍

文本翻滚动效，可以翻滚数字和其他类型文本。请升级 `vant` 到 >= 4.6.0 版本来使用该组件。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { RollingText, RollingTextGroup } from 'vant';

const app = createApp();
app.use(RollingText);
app.use(RollingTextGroup);
```

## 代码演示

### 基础用法

你可以通过 `start-num` 设置起始数值，`target-num` 设置目标数值。RollingText 组件会自动开始动画，从起始数值翻滚到目标数值。

```html
<van-rolling-text :start-num="0" :target-num="123" />
```

### 设置翻滚方向

你可以通过 `direction` 属性设置数字的翻滚方向，默认为向下翻滚，设置为 `up` 即可向上翻滚。

```html
<van-rolling-text :start-num="0" :target-num="432" direction="up" />
```

### 设置各数位停止顺序

你可以通过 `stop-order` 属性设置动画各个数位的停止先后顺序。默认先停止高位，设置为 `rtl` 可以先从个位停止。

```html
<van-rolling-text :start-num="0" :target-num="54321" stop-order="rtl" />
```

### 翻转非数字内容

你可以使用 `text-list` 属性设置非数字内容的翻转。组件会从数组的第一项翻转到最后一项，请确保数组长度大于等于 2，以及每一项的长度一致。

```html
<van-rolling-text :text-list="textList" :duration="1" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const textList = ref([
      'aaaaa',
      'bbbbb',
      'ccccc',
      'ddddd',
      'eeeee',
      'fffff',
      'ggggg',
    ]);
    return { textList };
  },
};
```

### 自定义样式

RollingText 组件提供了一些 CSS 变量，你可以覆盖这些变量来自定义样式，也可以直接修改组件的样式。此外，你还可以通过 `height` 属性设置数字高度。

```html
<van-rolling-text
  class="my-rolling-text"
  :height="54"
  :start-num="12345"
  :target-num="54321"
/>
```

```css
.my-rolling-text {
  --van-rolling-text-background: #1989fa;
  --van-rolling-text-color: white;
  --van-rolling-text-font-size: 24px;
  --van-rolling-text-gap: 6px;
  --van-rolling-text-item-border-radius: 5px;
  --van-rolling-text-item-width: 40px;
}
```

### 翻滚文本组

你可以使用翻滚文本组来控制多个翻滚文本的动画，并且可以加入自定义元素。请升级 vant 到 >= 4.9.0 版本来使用该组件。

```html
<rolling-text-group>
  <span style="display: inline;">-¥</span>
  <van-rolling-text :target-num="1" />
  <van-rolling-text :target-num="9" />
  <span style="display: inline;">.</span>
  <van-rolling-text :target-num="9" />
  <van-rolling-text :target-num="8" />
</rolling-text-group>
```

### 手动控制

通过 ref 获取到组件实例后，你可以调用 `start`、`reset` 方法，`start` 方法用于开始动画，`reset` 方法用于重置动画。

```html
<van-rolling-text
  ref="rollingTextRef"
  :start-num="0"
  :target-num="54321"
  :auto-start="false"
/>
<van-grid clickable :column-num="3">
  <van-grid-item icon="play-circle-o" :text="start" @click="start" />
  <van-grid-item icon="replay" :text="reset" @click="reset" />
</van-grid>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const rollingTextRef = ref(null);
    const start = () => {
      rollingTextRef.value.start();
    };
    const reset = () => {
      rollingTextRef.value.reset();
    };
    return { rollingTextRef, start, reset };
  },
};
```

## API

### RollingText Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| start-num | 起始数值 | _number_ | `0` |
| target-num | 目标数值 | _number_ | - |
| text-list | 内容数组，用于翻转非数字内容 | _string[]_ | `[]` |
| duration | 动画时长，单位为秒 | _number_ | `2` |
| direction | 文本翻滚方向，值为 `down` 和 `up` | _string_ | `down` |
| auto-start | 是否自动开始动画 | _boolean_ | `true` |
| stop-order | 各个数位动画停止先后顺序，值为 `ltr` 和 `rtl` | _string_ | `ltr` |
| height | 数字高度，单位为 `px` | _number_ | `40` |

### RollingTextGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| start-num `v4.9.0` | 所有翻滚文本的起始数值 | _number_ | `0` |
| duration `v4.9.0` | 所有翻滚文本的动画时长，单位为秒 | _number_ | `2` |
| direction `v4.9.0` | 所有翻滚文本的文本翻滚方向，值为 `down` 和 `up` | _string_ | `down` |
| auto-start `v4.9.0` | 是否自动开始所有翻滚文本动画 | _boolean_ | `true` |
| stop-order `v4.9.0` | 各个翻滚文本的动画停止先后顺序，值为 `ltr` 和 `rtl` | _string_ | `ltr` |
| height `v4.9.0` | 所有翻滚文本的数字高度，单位为 `px` | _number_ | `40` |

### 方法

通过 ref 可以获取到 RollingText 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明     | 参数 | 返回值 |
| ------ | -------- | ---- | ------ |
| start  | 开始动画 | -    | -      |
| reset  | 重置动画 | -    | -      |

### RollingTextGroup 方法

通过 ref 可以获取到 RollingTextGroup 实例并调用实例方法。

| 方法名         | 说明     | 参数 | 返回值 |
| -------------- | -------- | ---- | ------ |
| start `v4.9.0` | 开始动画 | -    | -      |
| reset `v4.9.0` | 重置动画 | -    | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  RollingTextProps,
  RollingTextInstance,
  RollingTextDirection,
  RollingTextStopOrder,
  RollingTextGroupProps,
  RollingTextGroupInstance,
} from 'vant';
```

`RollingTextInstance` 和 `RollingTextGroupInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue';
import type { RollingTextInstance, RollingTextGroupInstance } from 'vant';

const rollingTextRef = ref<RollingTextInstance>();
const rollingTextGroupRef = ref<RollingTextGroupInstance>();

rollingTextRef.value?.start();
rollingTextGroupRef.value?.start();
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --van-rolling-text-background | _inherit_ | 单个数位背景色 |
| --van-rolling-text-color | _var(--van-text-color)_ | 数字颜色 |
| --van-rolling-text-font-size | _var(--van-font-size-md)_ | 字体大小 |
| --van-rolling-text-gap | _0px_ | 数位之间的间隔 |
| --van-rolling-text-item-width | _15px_ | 单个数位宽度 |
| --van-rolling-text-item-border-radius | _0px_ | 单个数位边框圆角 |
