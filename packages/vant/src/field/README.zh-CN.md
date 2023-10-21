# Field 输入框

### 介绍

用户可以在文本框内输入或编辑文字。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Field, CellGroup } from 'vant';

const app = createApp();
app.use(Field);
app.use(CellGroup);
```

## 代码演示

### 基础用法

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```html
<!-- 可以使用 CellGroup 作为容器 -->
<template>
  <van-cell-group inset>
    <van-field v-model="value" label="文本" placeholder="请输入用户名" />
  </van-cell-group>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const value = ref('');
      return { value };
    },
  };
</script>
```

### 自定义类型

根据 `type` 属性定义不同类型的输入框，默认值为 `text`。

```html
<template>
  <van-cell-group inset>
    <!-- 输入任意文本 -->
    <van-field v-model="text" label="文本" />
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="tel" type="tel" label="手机号" />
    <!-- 允许输入正整数，调起纯数字键盘 -->
    <van-field v-model="digit" type="digit" label="整数" />
    <!-- 允许输入数字，调起带符号的纯数字键盘 -->
    <van-field v-model="number" type="number" label="数字" />
    <!-- 输入密码 -->
    <van-field v-model="password" type="password" label="密码" />
  </van-cell-group>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const tel = ref('');
      const text = ref('');
      const digit = ref('');
      const number = ref('');
      const password = ref('');

      return { tel, text, digit, number, password };
    },
  };
</script>
```

### 禁用输入框

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```html
<template>
  <van-cell-group inset>
    <van-field label="文本" model-value="输入框只读" readonly />
    <van-field label="文本" model-value="输入框已禁用" disabled />
  </van-cell-group>
</template>
```

### 显示图标

通过 `left-icon` 和 `right-icon` 配置输入框两侧的图标，通过设置 `clearable` 在输入过程中展示清除图标。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="value1"
      label="文本"
      left-icon="smile-o"
      right-icon="warning-o"
      placeholder="显示图标"
    />
    <van-field
      v-model="value2"
      clearable
      label="文本"
      left-icon="music-o"
      placeholder="显示清除图标"
    />
  </van-cell-group>
</template>

import { ref } from 'vue';

<script>
  export default {
    setup() {
      const value1 = ref('');
      const value2 = ref('123');
      return {
        value1,
        value2,
      };
    },
  };
</script>
```

### 错误提示

设置 `required` 属性表示这是一个必填项，可以配合 `error` 或 `error-message` 属性显示对应的错误提示。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="username"
      error
      required
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="phone"
      required
      label="手机号"
      placeholder="请输入手机号"
      error-message="手机号格式错误"
    />
  </van-cell-group>
</template>
```

### 插入按钮

通过 button 插槽可以在输入框尾部插入按钮。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="sms"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
    >
      <template #button>
        <van-button size="small" type="primary">发送验证码</van-button>
      </template>
    </van-field>
  </van-cell-group>
</template>
```

### 格式化输入内容

通过 `formatter` 属性可以对输入的内容进行格式化，通过 `format-trigger` 属性可以指定执行格式化的时机，默认在输入时进行格式化。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="value1"
      label="文本"
      :formatter="formatter"
      placeholder="在输入时执行格式化"
    />
    <van-field
      v-model="value2"
      label="文本"
      :formatter="formatter"
      format-trigger="onBlur"
      placeholder="在失焦时执行格式化"
    />
  </van-cell-group>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {
      const value1 = ref('');
      const value2 = ref('');
      // 过滤输入的数字
      const formatter = (value) => value.replace(/\d/g, '');

      return {
        value1,
        value2,
        formatter,
      };
    },
  };
</script>
```

### 高度自适应

对于 textarea，可以通过 `autosize` 属性设置高度自适应。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="1"
      autosize
      label="留言"
      type="textarea"
      placeholder="请输入留言"
    />
  </van-cell-group>
</template>
```

### 显示字数统计

设置 `maxlength` 和 `show-word-limit` 属性后会在底部显示字数统计。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="留言"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
  </van-cell-group>
</template>
```

### 输入框内容对齐

通过 `input-align` 属性可以设置输入框内容的对齐方式，可选值为 `center`、`right`。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="value"
      label="文本"
      placeholder="输入框内容右对齐"
      input-align="right"
    />
  </van-cell-group>
</template>
```

### 输入框文本位置

通过 `label-align` 属性可以设置输入框文本的位置，可选值为 `center`、`right`、`top`。

```html
<template>
  <van-cell-group inset>
    <van-field
      v-model="value"
      label="文本"
      placeholder="顶部对齐"
      label-align="top"
    />
    <van-field
      v-model="value2"
      label="文本"
      placeholder="左对齐"
      label-align="left"
    />
    <van-field
      v-model="value3"
      label="文本"
      placeholder="居中对齐"
      label-align="center"
    />
    <van-field
      v-model="value4"
      label="文本"
      placeholder="右对齐"
      label-align="right"
    />
  </van-cell-group>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前输入的值 | _number \| string_ | - |
| label | 输入框左侧文本 | _string_ | - |
| name | 名称，作为提交表单时的标识符 | _string_ | - |
| id | 输入框 id，同时会设置 label 的 for 属性 | _string_ | `van-field-n-input` |
| type | 输入框类型, 支持原生 input 标签的所有 [type 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types)，额外支持了 `digit` 类型 | _FieldType_ | `text` |
| size | 大小，可选值为 `large` | _string_ | - |
| maxlength | 输入的最大字符数 | _number \| string_ | - |
| placeholder | 输入框占位提示文字 | _string_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法输入内容 | _boolean_ | `false` |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |
| required | 是否显示表单必填星号 | _boolean_ | `false` |
| center | 是否使内容垂直居中 | _boolean_ | `false` |
| clearable | 是否启用清除图标，点击清除图标后会清空输入框 | _boolean_ | `false` |
| clear-icon | 清除图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props) | _string_ | `clear` |
| clear-trigger | 显示清除图标的时机，`always` 表示输入框不为空时展示，<br>`focus` 表示输入框聚焦且不为空时展示 | _FieldClearTrigger_ | `focus` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| is-link | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
| autofocus | 是否自动聚焦，iOS 系统不支持该属性 | _boolean_ | `false` |
| show-word-limit | 是否显示字数统计，需要设置 `maxlength` 属性 | _boolean_ | `false` |
| error | 是否将输入内容标红 | _boolean_ | `false` |
| error-message | 底部错误提示文案，为空时不展示 | _string_ | - |
| error-message-align | 错误提示文案对齐方式，可选值为 `center` `right` | _FieldTextAlign_ | `left` |
| formatter | 输入内容格式化函数 | _(val: string) => string_ | - |
| format-trigger | 格式化函数触发的时机，可选值为 `onBlur` | _FieldFormatTrigger_ | `onChange` |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | _string_ | `right` |
| label-class | 左侧文本额外类名 | _string \| Array \| object_ | - |
| label-width | 左侧文本宽度，默认单位为 `px` | _number \| string_ | `6.2em` |
| label-align | 左侧文本对齐方式，可选值为 `center` `right` `top` | _FieldTextAlign_ | `left` |
| input-align | 输入框对齐方式，可选值为 `center` `right` | _FieldTextAlign_ | `left` |
| autosize | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 { maxHeight: 100, minHeight: 50 }，<br>单位为`px` | _boolean \| FieldAutosizeConfig_ | `false` |
| left-icon | 左侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props) | _string_ | - |
| right-icon | 右侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](#/zh-CN/icon#props) | _string_ | - |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 [class-prefix 属性](#/zh-CN/icon#props) | _string_ | `van-icon` |
| rules | 表单校验规则，详见 [Form 组件](#/zh-CN/form#rule-shu-ju-jie-gou) | _FieldRule[]_ | - |
| autocomplete | HTML 原生属性，用于控制自动完成功能，详见 [MDN - autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) | _string_ | - |
| autocapitalize `v4.6.2` | HTML 原生属性，用于控制文本输入时是否自动大写，此 API 仅在部分浏览器支持，详见 [MDN - autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize) | _string_ | - |
| enterkeyhint | HTML 原生属性，用于控制回车键样式，此 API 仅在部分浏览器支持，详见 [MDN - enterkeyhint](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)<br> | _string_ | - |
| spellcheck `v4.6.2` | HTML 原生属性，用于检查元素的拼写错误，此 API 仅在部分浏览器支持，详见 [MDN - spellcheck](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck)<br> | _boolean_ | - |
| autocorrect `v4.6.2` | 仅 Safari 适用，用于自动更正输入的文本，详见 [MDN - autocorrect](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocorrect)<br> | _string_ | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:model-value | 输入框内容变化时触发 | _value: string (当前输入的值)_ |
| focus | 输入框获得焦点时触发 | _event: Event_ |
| blur | 输入框失去焦点时触发 | _event: Event_ |
| clear | 点击清除按钮时触发 | _event: MouseEvent_ |
| click | 点击组件时触发 | _event: MouseEvent_ |
| click-input | 点击输入区域时触发 | _event: MouseEvent_ |
| click-left-icon | 点击左侧图标时触发 | _event: MouseEvent_ |
| click-right-icon | 点击右侧图标时触发 | _event: MouseEvent_ |
| start-validate | 开始表单校验时触发 | - |
| end-validate | 结束表单校验时触发 | _{ status: string, message: string }_ |

### 方法

通过 ref 可以获取到 Field 实例并调用实例方法，详见[组件实例方法](#/zh-CN/advanced-usage#zu-jian-shi-li-fang-fa)。

| 方法名 | 说明           | 参数 | 返回值 |
| ------ | -------------- | ---- | ------ |
| focus  | 获取输入框焦点 | -    | -      |
| blur   | 取消输入框焦点 | -    | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  FieldType,
  FieldRule,
  FieldProps,
  FieldInstance,
  FieldTextAlign,
  FieldRuleMessage,
  FieldClearTrigger,
  FieldFormatTrigger,
  FieldRuleValidator,
  FieldRuleFormatter,
  FieldValidateError,
  FieldAutosizeConfig,
  FieldValidateTrigger,
  FieldValidationStatus,
} from 'vant';
```

`FieldInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue';
import type { FieldInstance } from 'vant';

const fieldRef = ref<FieldInstance>();

fieldRef.value?.focus();
```

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| label | 自定义输入框左侧文本 | - |
| input | 自定义输入框，使用此插槽后，与输入框相关的属性和事件将失效 | - |
| left-icon | 自定义输入框头部图标 | - |
| right-icon | 自定义输入框尾部图标 | - |
| button | 自定义输入框尾部按钮 | - |
| error-message | 自定义底部错误提示文案 | _{ message: string }_ |
| extra | 自定义输入框最右侧的额外内容 | - |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                                  | 默认值                    | 描述 |
| ------------------------------------- | ------------------------- | ---- |
| --van-field-label-width               | _6.2em_                   | -    |
| --van-field-label-color               | _var(--van-text-color)_   | -    |
| --van-field-label-margin-right        | _var(--van-padding-sm)_   | -    |
| --van-field-input-text-color          | _var(--van-text-color)_   | -    |
| --van-field-input-error-text-color    | _var(--van-danger-color)_ | -    |
| --van-field-input-disabled-text-color | _var(--van-text-color-3)_ | -    |
| --van-field-placeholder-text-color    | _var(--van-text-color-3)_ | -    |
| --van-field-icon-size                 | _18px_                    | -    |
| --van-field-clear-icon-size           | _18px_                    | -    |
| --van-field-clear-icon-color          | _var(--van-gray-5)_       | -    |
| --van-field-right-icon-color          | _var(--van-gray-6)_       | -    |
| --van-field-error-message-color       | _var(--van-danger-color)_ | -    |
| --van-field-error-message-font-size   | _12px_                    | -    |
| --van-field-text-area-min-height      | _60px_                    | -    |
| --van-field-word-limit-color          | _var(--van-gray-7)_       | -    |
| --van-field-word-limit-font-size      | _var(--van-font-size-sm)_ | -    |
| --van-field-word-limit-line-height    | _16px_                    | -    |
| --van-field-disabled-text-color       | _var(--van-text-color-3)_ | -    |
| --van-field-required-mark-color       | _var(--van-red)_          | -    |

## 常见问题

### 设置 type 为 number 后，为什么 input 标签的类型仍为 text?

HTML 原生的 `type="number"` 属性在 iOS 和 Android 系统上都存在一定问题，比如 maxlength 属性不生效、无法获取到完整的输入内容等。因此设置 type 为 `number` 时，Field 不会使用原生的 `type="number"` 属性，而是用现代浏览器支持的 [inputmode 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/inputmode)来控制输入键盘的类型。

### 为什么 v-model 绑定的值被更新为 string 类型？

Field 组件内部会将传入的 v-model 格式化为 string 类型，便于组件内部进行处理。

如果你希望在 v-model 上绑定 number 类型，可以使用 Vue 提供的 [.number 修饰符](https://vuejs.org/guide/essentials/forms.html#lazy)。

```html
<van-field v-model.number="value" type="tel" />
```

### 在桌面端点击清除按钮无效？

清除按钮监听是的移动端 Touch 事件，参见[桌面端适配](#/zh-CN/advanced-usage#zhuo-mian-duan-gua-pei)。
