# Swipe

### Intro

Used to loop a group of pictures or content.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Swipe, SwipeItem } from 'vant';

const app = createApp();
app.use(Swipe);
app.use(SwipeItem);
```

## Usage

### Basic Usage

Use `autoplay` prop to set autoplay interval.

```html
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>

<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
```

### Lazy Render

Use `lazy-render` prop to enable lazy rendering.

```html
<van-swipe :autoplay="3000" lazy-render>
  <van-swipe-item v-for="image in images" :key="image">
    <img :src="image" />
  </van-swipe-item>
</van-swipe>
```

```js
export default {
  setup() {
    const images = [
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ];
    return { images };
  },
};
```

### Change Event

```html
<van-swipe @change="onChange">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>
```

```js
import { showToast } from 'vant';

export default {
  setup() {
    const onChange = (index) => showToast('Current Swipe index:' + index);
    return { onChange };
  },
};
```

### Vertical Scrolling

```html
<van-swipe :autoplay="3000" vertical>
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>
```

### Set SwipeItem Size

```html
<van-swipe :loop="false" :width="300">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>
```

> It's not supported to set SwipeItem size in the loop mode.

### Custom Indicator

```html
<van-swipe>
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
  <template #indicator="{ active, total }">
    <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
  </template>
</van-swipe>

<style>
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
```

### RTL Layout

```html
<van-swipe indicator-color="white" style="direction: rtl;">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>
```

## API

### Swipe Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| autoplay | Autoplay interval (ms) | _number \| string_ | - |
| duration | Animation duration (ms) | _number \| string_ | `500` |
| initial-swipe | Index of initial swipe, start from 0 | _number \| string_ | `0` |
| width | Width of swipe item | _number \| string_ | `0` |
| height | Height of swipe item | _number \| string_ | `0` |
| loop | Whether to enable loop | _boolean_ | `true` |
| show-indicators | Whether to show indicators | _boolean_ | `true` |
| vertical | Whether to be vertical Scrolling | _boolean_ | `false` |
| touchable | Whether to allow swipe by touch gesture | _boolean_ | `true` |
| stop-propagation | Whether to stop touchmove event propagation | _boolean_ | `false` |
| lazy-render | Whether to enable lazy render | _boolean_ | `false` |
| indicator-color | Indicator color | _string_ | `#1989fa` |

### Swipe Events

| Event | Description | Arguments |
| --- | --- | --- |
| change | Emitted when current swipe changed | _index: number_ |
| drag-start `v4.0.9` | Emitted when user starts dragging the swipe | _{ index: number }_ |
| drag-end `v4.0.9` | Emitted when user ends dragging the swipe | _{ index: number }_ |

### SwipeItem Events

| Event | Description                       | Arguments           |
| ----- | --------------------------------- | ------------------- |
| click | Emitted when component is clicked | _event: MouseEvent_ |

### Swipe Methods

Use [ref](https://vuejs.org/guide/essentials/template-refs.html) to get Swipe instance and call instance methods..

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| prev | Swipe to prev item | - | - |
| next | Swipe to next item | - | - |
| swipeTo | Swipe to target index | _index: number, options: SwipeToOptions_ | - |
| resize | Resize Swipe when container element resized or visibility changed | - | - |

### Types

The component exports the following type definitions:

```ts
import type { SwipeProps, SwipeInstance, SwipeToOptions } from 'vant';
```

`SwipeInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { SwipeInstance } from 'vant';

const swipeRef = ref<SwipeInstance>();

swipeRef.value?.next();
```

### SwipeToOptions

| Name      | Description               | Type      |
| --------- | ------------------------- | --------- |
| immediate | Whether to skip animation | _boolean_ |

### Swipe Slots

| Name      | Description      | SlotProps                           |
| --------- | ---------------- | ----------------------------------- |
| default   | Content          | -                                   |
| indicator | Custom indicator | _{ active: number, total: number }_ |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --van-swipe-indicator-size | _6px_ | - |
| --van-swipe-indicator-margin | _var(--van-padding-sm)_ | - |
| --van-swipe-indicator-active-opacity | _1_ | - |
| --van-swipe-indicator-inactive-opacity | _0.3_ | - |
| --van-swipe-indicator-active-background | _var(--van-primary-color)_ | - |
| --van-swipe-indicator-inactive-background | _var(--van-border-color)_ | - |
