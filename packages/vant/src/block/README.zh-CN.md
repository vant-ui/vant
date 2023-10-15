# Block 块级组件

### 介绍

块级组件提供类似容器的功能

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Block } from 'vant';

const app = createApp();
app.use(Block);
```

## 代码演示

### 基础用法

当作一个容器来使用，传入 `title` 属性作为标题。

```html
<van-block title="基础用法">
  <van-button type="default"> default</van-button>
  <van-button type="primary">primary</van-button>
  <van-button type="success">success</van-button>
</van-block>
```

### 卡片模式

通过 `card` 属性将容器设置为卡片模式。

```html
<van-block title="卡片模式">
  <van-button type="default">default</van-button>
  <van-button type="primary">primary</van-button>
  <van-button type="success">success</van-button>
</van-block>
```

## API

### Props

| 参数  | 说明     | 类型      | 默认值 |
| ----- | -------- | --------- | ------ |
| title | 标题     | _string_  | `-`    |
| card  | 卡片模式 | _boolean_ | `-`    |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
