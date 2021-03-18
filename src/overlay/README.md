# Overlay

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways。

```js
import { createApp } from 'vue';
import { Overlay } from 'vant';

const app = createApp();
app.use(Overlay);
```

## Usage

### Basic Usage

```html
<van-button type="primary" text="Show Overlay" @click="show = true" />
<van-overlay :show="show" @click="show = false" />
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    return { show };
  },
};
```

### Embedded Content

```html
<van-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" />
  </div>
</van-overlay>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| show | Whether to show overlay | _boolean_ | `false` |
| z-index | z-index | _number \| string_ | `1` |
| duration | Animation duration | _number \| string_ | `0.3` |
| class-name | ClassName | _string_ | - |
| custom-class | Custom style | _object_ | - |
| lock-scroll | Whether to lock background scroll | _boolean_ | `true` |

### Events

| Event | Description                       | Arguments           |
| ----- | --------------------------------- | ------------------- |
| click | Emitted when component is clicked | _event: MouseEvent_ |

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | Default slot |

### Less Variables

How to use: [Custom Theme](#/en-US/theme).

| Name                      | Default Value        | Description |
| ------------------------- | -------------------- | ----------- |
| @overlay-z-index          | `1`                  | -           |
| @overlay-background-color | `rgba(0, 0, 0, 0.7)` | -           |
