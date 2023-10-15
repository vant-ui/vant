# Button

### Intro

block components provide container like functionality.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Block } from 'vant';

const app = createApp();
app.use(Block);
```

## Usage

### Base

use as a container, passing in the 'title' attribute as the title.

```html
<van-block title="基础用法">
  <van-button type="default">default</van-button>
  <van-button type="primary">primary</van-button>
  <van-button type="success">success</van-button>
</van-block>
```

### Card

set the container to card mode through the 'card' attribute.

```html
<van-block title="卡片模式">
  <van-button type="default">default</van-button>
  <van-button type="primary">primary</van-button>
  <van-button type="success">success</van-button>
</van-block>
```

## API

### Props

| Attribute | Description | Type      | Default |
| --------- | ----------- | --------- | ------- |
| title     | Title       | _string_  | `-`     |
| card      | Card mode   | _boolean_ | `-`     |

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | Default slot |
