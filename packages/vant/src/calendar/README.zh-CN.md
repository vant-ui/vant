# Calendar 日历

### 介绍

日历组件用于选择日期或日期区间。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Calendar } from 'vant';

const app = createApp();
app.use(Calendar);
```

## 代码演示

### 选择切换模式

默认所有月份将以平铺方式展示，不显示切换按钮，当月份过多时可能会影响页面交互性能。可以通过设置 `switch-mode` 属性，展示年月切换按钮。

```html
<van-calendar v-model:show="show" switch-mode="year-month" />
```

### 选择单个日期

下面演示了结合单元格来使用日历组件的用法，日期选择完成后会触发 `confirm` 事件。

```html
<van-cell title="选择单个日期" :value="date" @click="show = true" />
<van-calendar v-model:show="show" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const date = ref('');
    const show = ref(false);

    const formatDate = (date) => {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };
    const onConfirm = (value) => {
      show.value = false;
      date.value = formatDate(value);
    };

    return {
      date,
      show,
      onConfirm,
    };
  },
};
```

### 选择多个日期

设置 `type` 为 `multiple` 后可以选择多个日期，此时 `confirm` 事件返回的 date 为数组结构，数组包含若干个选中的日期。

```html
<van-cell title="选择多个日期" :value="text" @click="show = true" />
<van-calendar v-model:show="show" type="multiple" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const text = ref('');
    const show = ref(false);

    const onConfirm = (dates) => {
      show.value = false;
      text.value = `选择了 ${dates.length} 个日期`;
    };

    return {
      text,
      show,
      onConfirm,
    };
  },
};
```

### 选择日期区间

设置 `type` 为 `range` 后可以选择日期区间，此时 `confirm` 事件返回的 date 为数组结构，数组第一项为开始时间，第二项为结束时间。

```html
<van-cell title="选择日期区间" :value="date" @click="show = true" />
<van-calendar v-model:show="show" type="range" @confirm="onConfirm" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const date = ref('');
    const show = ref(false);

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (values) => {
      const [start, end] = values;
      show.value = false;
      date.value = `${formatDate(start)} - ${formatDate(end)}`;
    };

    return {
      date,
      show,
      onConfirm,
    };
  },
};
```

> Tips: 默认情况下，日期区间的起止时间不能为同一天，可以通过设置 allow-same-day 属性来允许选择同一天。

### 快捷选择

将 `show-confirm` 设置为 `false` 可以隐藏确认按钮，这种情况下选择完成后会立即触发 `confirm` 事件。

```html
<van-calendar v-model:show="show" :show-confirm="false" />
```

### 自定义颜色

通过 `color` 属性可以自定义日历的颜色，对选中日期和底部按钮生效。

```html
<van-calendar v-model:show="show" color="#ee0a24" />
```

### 自定义日期范围

通过 `min-date` 和 `max-date` 定义日历的范围。

```html
<van-calendar v-model:show="show" :min-date="minDate" :max-date="maxDate" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);

    return {
      show,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2010, 0, 31),
    };
  },
};
```

### 自定义按钮文字

通过 `confirm-text` 设置按钮文字，通过 `confirm-disabled-text` 设置按钮禁用时的文字。

```html
<van-calendar
  v-model:show="show"
  type="range"
  confirm-text="完成"
  confirm-disabled-text="请选择结束时间"
/>
```

### 自定义日期文案

通过传入 `formatter` 函数来对日历上每一格的内容进行格式化。

```html
<van-calendar v-model:show="show" type="range" :formatter="formatter" />
```

```js
export default {
  setup() {
    const formatter = (day) => {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();

      if (month === 5) {
        if (date === 1) {
          day.topInfo = '劳动节';
        } else if (date === 4) {
          day.topInfo = '青年节';
        } else if (date === 11) {
          day.text = '今天';
        }
      }

      if (day.type === 'start') {
        day.bottomInfo = '入住';
      } else if (day.type === 'end') {
        day.bottomInfo = '离店';
      }

      return day;
    };

    return {
      formatter,
    };
  },
};
```

### 自定义弹出位置

通过 `position` 属性自定义弹出层的弹出位置，可选值为 `top`、`left`、`right`。

```html
<van-calendar v-model:show="show" :round="false" position="right" />
```

### 日期区间最大范围

选择日期区间时，可以通过 `max-range` 属性来指定最多可选天数，选择的范围超过最多可选天数时，会弹出相应的提示文案。

```html
<van-calendar type="range" :max-range="3" />
```

### 自定义周起始日

通过 `first-day-of-week` 属性设置一周从哪天开始。

```html
<van-calendar first-day-of-week="1" />
```

### 平铺展示

将 `poppable` 设置为 `false`，日历会直接展示在页面内，而不是以弹层的形式出现。

```html
<van-calendar
  title="日历"
  :poppable="false"
  :show-confirm="false"
  :style="{ height: '500px' }"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 选择类型：<br>`single` 表示选择单个日期，<br>`multiple` 表示选择多个日期，<br>`range` 表示选择日期区间 | _string_ | `single` |
| switch-mode `v4.9.0` | 切换模式：<br>`none` 平铺展示所有月份，不展示切换按钮，<br>`month` 支持按月切换，展示上个月/下个月按钮，<br>`year-month` 支持按年切换，也支持按月切换，展示上一年/下一年，上个月/下个月按钮 | _string_ | `none` |
| title | 日历标题 | _string_ | `日期选择` |
| color | 主题色，对底部按钮和选中日期生效 | _string_ | `#1989fa` |
| min-date | 可选择的最小日期 | _Date_ | `switch-mode` 为 `none` 时为当前日期 |
| max-date | 可选择的最大日期 | _Date_ | `switch-mode` 为 `none` 时为当前日期的六个月后 |
| default-date | 默认选中的日期，`type` 为 `multiple` 或 `range` 时为数组，传入 `null` 表示默认不选择 | _Date \| Date[] \| null_ | 今天 |
| row-height | 日期行高 | _number \| string_ | `64` |
| formatter | 日期格式化函数 | _(day: Day) => Day_ | - |
| poppable | 是否以弹层的形式展示日历 | _boolean_ | `true` |
| lazy-render | 是否只渲染可视区域的内容 | _boolean_ | `true` |
| show-mark | 是否显示月份背景水印 | _boolean_ | `true` |
| show-title | 是否展示日历标题 | _boolean_ | `true` |
| show-subtitle | 是否展示日历副标题（年月） | _boolean_ | `true` |
| show-confirm | 是否展示确认按钮 | _boolean_ | `true` |
| readonly | 是否为只读状态，只读状态下不能选择日期 | _boolean_ | `false` |
| confirm-text | 确认按钮的文字 | _string_ | `确认` |
| confirm-disabled-text | 确认按钮处于禁用状态时的文字 | _string_ | `确认` |
| first-day-of-week | 设置周起始日 | _0-6_ | `0` |

### Calendar Poppable Props

当 Calendar 的 `poppable` 为 `true` 时，支持以下 props:

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:show | 是否显示日历弹窗 | _boolean_ | `false` |
| position | 弹出位置，可选值为 `top` `right` `left` | _string_ | `bottom` |
| round | 是否显示圆角弹窗 | _boolean_ | `true` |
| close-on-popstate | 是否在页面回退时自动关闭 | _boolean_ | `true` |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | _boolean_ | `true` |
| safe-area-inset-top | 是否开启[顶部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei) | _boolean_ | `false` |
| safe-area-inset-bottom | 是否开启[底部安全区适配](#/zh-CN/advanced-usage#di-bu-an-quan-qu-gua-pei) | _boolean_ | `true` |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://cn.vuejs.org/api/built-in-components.html#teleport) | _string \| Element_ | - |

### Calendar Range Props

当 Calendar 的 `type` 为 `range` 时，支持以下 props:

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| max-range | 日期区间最多可选天数 | _number \| string_ | 无限制 |
| range-prompt | 范围选择超过最多可选天数时的提示文案 | _string_ | `最多选择 xx 天` |
| show-range-prompt | 范围选择超过最多可选天数时，是否展示提示文案 | _boolean_ | `true` |
| allow-same-day | 是否允许日期范围的起止时间为同一天 | _boolean_ | `false` |

### Calendar Multiple Props

当 Calendar 的 `type` 为 `multiple` 时，支持以下 props:

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| max-range | 日期最多可选天数 | _number \| string_ | 无限制 |
| range-prompt | 选择超过最多可选天数时的提示文案 | _string_ | `最多选择 xx 天` |

### Day 数据结构

日历中的每个日期都对应一个 Day 对象，通过`formatter`属性可以自定义 Day 对象的内容

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| date | 日期对应的 Date 对象 | _Date_ |
| type | 日期类型，可选值为 `selected`、`start`、`middle`、`end`、`disabled`、`start-end`、`multiple-selected`、`multiple-middle`、`placeholder` | _string_ |
| text | 中间显示的文字 | _string_ |
| topInfo | 上方的提示信息 | _string_ |
| bottomInfo | 下方的提示信息 | _string_ |
| className | 额外类名 | _string_ |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击并选中任意日期时触发 | _value: Date \| Date[]_ |
| confirm | 日期选择完成后触发，若 `show-confirm` 为 `true`，则点击确认按钮后触发 | _value: Date \| Date[]_ |
| open | 打开弹出层时触发 | - |
| close | 关闭弹出层时触发 | - |
| opened | 打开弹出层且动画结束后触发 | - |
| closed | 关闭弹出层且动画结束后触发 | - |
| unselect | 当日历组件的 `type` 为 `multiple` 时，取消选中日期时触发 | _value: Date_ |
| month-show | 当某个月份进入可视区域时触发（`switch-mode` 为 `none` 时生效） | _{ date: Date, title: string }_ |
| over-range | 范围选择超过最多可选天数时触发 | - |
| click-subtitle | 点击日历副标题时触发 | _event: MouseEvent_ |
| click-disabled-date `v4.7.0` | 点击禁用日期时触发 | _value: Date \| Date[]_ |
| click-overlay `v4.9.16` | 点击遮罩层时触发 | _event: MouseEvent_ |
| panel-change | 日历面板切换时触发（`switch-mode` 不为 `none` 时生效） | _{ date: Date }_ |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| title | 自定义标题 | - |
| subtitle | 自定义日历副标题 | _{ text: string, date?: Date }_ |
| month-title `v4.0.9` | 自定义每个月份的小标题 | _{ text: string, date: Date }_ |
| footer | 自定义底部区域内容 | - |
| confirm-text | 自定义确认按钮的内容 | _{ disabled: boolean }_ |
| top-info | 自定义日期上方的提示信息 | _day: Day_ |
| bottom-info | 自定义日期下方的提示信息 | _day: Day_ |
| text | 自定义日期内容 | _day: Day_ |
| prev-month | 自定义上个月按钮 | _{ disabled: boolean }_ |
| prev-year | 自定义上一年按钮 | _{ disabled: boolean }_ |
| next-month | 自定义下个月按钮 | _{ disabled: boolean }_ |
| next-year | 自定义下一年按钮 | _{ disabled: boolean }_ |

### 方法

通过 ref 可以获取到 Calendar 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| reset | 将选中的日期重置到指定日期，未传参时会重置到默认日期 | _date?: Date \| Date[]_ | - |
| scrollToDate | 滚动到某个日期 | _date: Date_ | - |
| getSelectedDate | 获取选中的日期 | - | _Date \| Date[] \| null_ |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  CalendarSwitchMode,
  CalendarType,
  CalendarProps,
  CalendarDayItem,
  CalendarDayType,
  CalendarInstance,
} from 'vant';
```

`CalendarInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue';
import type { CalendarInstance } from 'vant';

const calendarRef = ref<CalendarInstance>();

calendarRef.value?.reset();
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --van-calendar-background | _var(--van-background-2)_ | - |
| --van-calendar-popup-height | _80%_ | - |
| --van-calendar-header-shadow | _0 2px 10px rgba(125, 126, 128, 0.16)_ | - |
| --van-calendar-header-title-height | _44px_ | - |
| --van-calendar-header-title-font-size | _var(--van-font-size-lg)_ | - |
| --van-calendar-header-subtitle-font-size | _var(--van-font-size-md)_ | - |
| --van-calendar-header-action-width | _28px_ | - |
| --van-calendar-header-action-color | _var(--van-text-color)_ | - |
| --van-calendar-header-action-disabled-color | _var(--van-text-color-3)_ | - |
| --van-calendar-weekdays-height | _30px_ | - |
| --van-calendar-weekdays-font-size | _var(--van-font-size-sm)_ | - |
| --van-calendar-month-title-font-size | _var(--van-font-size-md)_ | - |
| --van-calendar-month-mark-color | _fade(var(--van-gray-2), 80%)_ | - |
| --van-calendar-month-mark-font-size | _160px_ | - |
| --van-calendar-day-height | _64px_ | - |
| --van-calendar-day-font-size | _var(--van-font-size-lg)_ | - |
| --van-calendar-day-margin-bottom | _4px_ | - |
| --van-calendar-day-disabled-color | _var(--van-text-color-3)_ | - |
| --van-calendar-range-edge-color | _var(--van-white)_ | - |
| --van-calendar-range-edge-background | _var(--van-primary-color)_ | - |
| --van-calendar-range-middle-color | _var(--van-primary-color)_ | - |
| --van-calendar-range-middle-background-opacity | _0.1_ | - |
| --van-calendar-selected-day-size | _54px_ | - |
| --van-calendar-selected-day-color | _var(--van-white)_ | - |
| --van-calendar-selected-day-background | _var(--van-primary-color)_ | - |
| --van-calendar-info-font-size | _var(--van-font-size-xs)_ | - |
| --van-calendar-info-line-height | _var(--van-line-height-xs)_ | - |
| --van-calendar-confirm-button-height | _36px_ | - |
| --van-calendar-confirm-button-margin | _7px 0_ | - |

## 常见问题

### 如何在 formatter 中使用异步返回的数据？

如果需要在 formatter 中使用异步返回的数据，可以使用计算属性动态创建 formatter 函数，示例如下：

```js
const asyncData = ref();

const formatter = computed(() => {
  if (!asyncData.value) {
    return (day) => day;
  }
  return (day) => {
    day.bottomInfo = asyncData.value;
    return day;
  };
});

setTimeout(() => {
  asyncData.value = '后端文案';
}, 3000);
```

### 在 iOS 系统上初始化组件失败？

如果你遇到了在 iOS 上无法渲染组件的问题，请确认在创建 Date 对象时没有使用`new Date('2020-01-01')`这样的写法，iOS 不支持以中划线分隔的日期格式，正确写法是`new Date('2020/01/01')`。

对此问题的详细解释：[stackoverflow](https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios)。

或者，你应该采用一种在各个系统和浏览器上兼容性更好的写法：`new Date(2020, 0, 1)`，但是需要注意的是，月份是从 0 开始的。
