# ImagePreview

### Intro

Used to zoom in and preview the picture, and it supports two methods: function call and component call.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { ImagePreview } from 'vant';

const app = createApp();
app.use(ImagePreview);
```

### Function Call

Vant provides some utility functions that can quickly evoke global `ImagePreview` components.

For example, calling the `showImagePreview` function will render a Dialog directly in the page.

```js
import { showImagePreview } from 'vant';

showImagePreview(['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg']);
```

## Usage

### Basic Usage

When calling `showImagePreview`, you can directly pass an array of images to display the image preview.

```js
import { showImagePreview } from 'vant';

showImagePreview([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
]);
```

### Set Start Position

`showImagePreview` supports passing a configuration object, and you can specify the initial position (index value) of the image through the `startPosition` option.

```js
import { showImagePreview } from 'vant';

showImagePreview({
  images: [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  ],
  startPosition: 1,
});
```

### Show Close Icon

When the `closeable` option is enabled, a close icon will be displayed in the top-right corner of the popup layer. You can customize the icon by using the `close-icon` option, and the icon position can be customized using the `close-icon-position` option.

```js
import { showImagePreview } from 'vant';

showImagePreview({
  images: [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  ],
  closeable: true,
});
```

### Close Event

You can listen to the close event of the image preview through the `onClose` option.

```js
import { showToast, showImagePreview } from 'vant';

showImagePreview({
  images: [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  ],
  onClose() {
    showToast('closed');
  },
});
```

### Before Close

You can pass a callback function through the `beforeClose` option to perform specific operations before closing the image preview.

```js
import { showImagePreview } from 'vant';

const instance = showImagePreview({
  images: [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  ],
  beforeClose: () => false,
});

setTimeout(() => {
  instance.close();
}, 2000);
```

### Use ImagePreview Component

If you need to embed components or other custom content inside the ImagePreview, you can directly use the ImagePreview component and customize it using the `index` slot. Before using it, you need to register the component through `app.use` or other methods.

```html
<van-image-preview v-model:show="show" :images="images" @change="onChange">
  <template v-slot:index>Page: {{ index + 1 }}</template>
</van-image-preview>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    const index = ref(0);
    const images = [
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ];
    const onChange = (newIndex) => {
      index.value = newIndex;
    };

    return {
      show,
      index,
      images,
      onChange,
    };
  },
};
```

### Use image slot

When using ImagePreview component, you can custom the image through the `image` slot, such as render a video content. In this example, you can also set `close-on-click-image` prop to `false`, so that the preview won't be accidentally closed when you click on the video.

```html
<van-image-preview
  v-model:show="show"
  :images="images"
  :close-on-click-image="false"
>
  <template #image="{ src }">
    <video style="width: 100%;" controls>
      <source :src="src" />
    </video>
  </template>
</van-image-preview>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(false);
    const images = [
      'https://www.w3school.com.cn/i/movie.ogg',
      'https://www.w3school.com.cn/i/movie.ogg',
      'https://www.w3school.com.cn/i/movie.ogg',
    ];
    return {
      show,
      images,
    };
  },
};
```

When you customize the image through the `image` slot, you can bind the `style` and `onLoad` callback through the params of the slot, which can allow the `<img>` tag to support image scaling.

```html
<van-image-preview
  v-model:show="show"
  :images="images"
  :close-on-click-image="false"
>
  <template #image="{ src, style, onLoad }">
    <img :src="src" :style="[{ width: '100%' }, style]" @load="onLoad" />
  </template>
</van-image-preview>
```

## API

### Methods

Vant exports following ImagePreview utility functions:

| Methods | Description | Attribute | Return value |
| --- | --- | --- | --- |
| showImagePreview | Display a full-screen image preview component | _string[] \| ImagePreviewOptions_ | ImagePreview Instance |

### ImagePreviewOptions

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| images | Images URL list | _string[]_ | `[]` |
| startPosition | Start position | _number \| string_ | `0` |
| showIndex | Whether to show index | _boolean_ | `true` |
| showIndicators | Whether to show indicators | _boolean_ | `false` |
| loop | Whether to enable loop | _boolean_ | `true` |
| swipeDuration | Animation duration (ms) | _number \| string_ | `300` |
| onClose | Emitted when ImagePreview is closed | _Function_ | - |
| onChange | Emitted when current image changed | _Function_ | - |
| onScale | Emitted when scaling current image | _Function_ | - |
| closeOnPopstate | Whether to close when popstate | _boolean_ | `true` |
| doubleScale `v4.7.2` | Whether to enable double tap zoom gesture. When disabled, the image preview will be closed immediately upon clicking | _boolean_ | `true` |
| closeOnClickImage `v4.8.3` | Whether to close when image is clicked | _boolean_ | `true` |
| closeOnClickOverlay `v4.6.4` | Whether to close when overlay is clicked | _boolean_ | `true` |
| vertical `v4.8.6` | Whether to enable vertical gesture sliding | _boolean_ | `false` |
| beforeClose | Callback function before close | _(action) => boolean \| Promise_ | - |
| className | Custom className | _string \| Array \| object_ | - |
| maxZoom | Max zoom | _number \| string_ | `3` |
| minZoom | Min zoom | _number \| string_ | `1/3` |
| closeable | Whether to show close icon | _boolean_ | `false` |
| closeIcon | Close icon name | _string_ | `clear` |
| closeIconPosition | Close icon position, can be set to `top-left` `bottom-left` `bottom-right` | _string_ | `top-right` |
| transition | Transition, equivalent to `name` prop of [transition](https://vuejs.org/api/built-in-components.html#transition) | _string_ | `van-fade` |
| overlayClass | Custom overlay class | _string \| Array \| object_ | - |
| overlayStyle | Custom overlay style | _object_ | - |
| teleport | Specifies a target element where ImagePreview will be mounted | _string \| Element_ | - |
| rotate | Whether to enable the image rotation function | _boolean_ | `false` |

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:show | Whether to show ImagePreview | _boolean_ | `false` |
| images | Images URL list | _string[]_ | `[]` |
| start-position | Start position | _number \| string_ | `0` |
| swipe-duration | Animation duration (ms) | _number \| string_ | `300` |
| show-index | Whether to show index | _boolean_ | `true` |
| show-indicators | Whether to show indicators | _boolean_ | `false` |
| loop | Whether to enable loop | _boolean_ | `true` |
| double-scale | Whether to enable double tap zoom gesture. When disabled, the image preview will be closed immediately upon clicking | _boolean_ | `true` |
| before-close | Callback function before close | _(action: number) => boolean \| Promise\<boolean\>_ | - |
| close-on-popstate | Whether to close when popstate | _boolean_ | `true` |
| close-on-click-image `v4.8.3` | Whether to close when image is clicked | _boolean_ | `true` |
| close-on-click-overlay `v4.6.4` | Whether to close when overlay is clicked | _boolean_ | `true` |
| vertical `v4.8.6` | Whether to enable vertical gesture sliding | _boolean_ | `false` |
| class-name | Custom className (apply to Popup in image preview) | _string \| Array \| object_ | - |
| max-zoom | Max zoom | _number \| string_ | `3` |
| min-zoom | Min zoom | _number \| string_ | `1/3` |
| closeable | Whether to show close icon | _boolean_ | `false` |
| close-icon | Close icon name | _string_ | `clear` |
| close-icon-position | Close icon position, can be set to `top-left` `bottom-left` `bottom-right` | _string_ | `top-right` |
| transition | Transition, equivalent to `name` prop of [transition](https://vuejs.org/api/built-in-components.html#transition) | _string_ | `van-fade` |
| overlay-class | Custom overlay class | _string \| Array \| object_ | - |
| overlay-style | Custom overlay style | _object_ | - |
| teleport | Specifies a target element where ImagePreview will be mounted | _string \| Element_ | - |
| rotate | Whether to enable the image rotation function | _boolean_ | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| close | Emitted when closing ImagePreview | _{ index: number, url: string }_ |
| closed | Emitted when ImagePreview is closed | - |
| change | Emitted when current image changed | _index: number_ |
| scale | Emitted when scaling current image | _{ index: number, scale: number }_ |
| long-press | Emitted when long press current image | _{ index: number }_ |

### Methods

Use [ref](https://vuejs.org/v2/api/#ref) to get ImagePreview instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| resetScale `4.7.4` | Reset the current image's zoom ratio | - | - |
| swipeTo | Swipe to target index | _index: number, options?: SwipeToOptions_ | - |

### Types

The component exports the following type definitions:

```ts
import type {
  ImagePreviewProps,
  ImagePreviewOptions,
  ImagePreviewInstance,
  ImagePreviewScaleEventParams,
} from 'vant';
```

`ImagePreviewInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { ImagePreviewInstance } from 'vant';

const imagePreviewRef = ref<ImagePreviewInstance>();

imagePreviewRef.value?.swipeTo(1);
```

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| index | Custom index | _{ index: index of current image }_ |
| cover | Custom content that covers the image preview | - |
| image | Custom image content | _{ src: current image src, onLoad: load image, style: current image style }_ |

### onClose Parameters

| Attribute | Description            | Type     |
| --------- | ---------------------- | -------- |
| url       | URL of current image   | _number_ |
| index     | Index of current image | _number_ |

### onScale Parameters

| Attribute | Description            | Type     |
| --------- | ---------------------- | -------- |
| index     | Index of current image | _number_ |
| scale     | scale of current image | _number_ |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --van-image-preview-index-text-color | _var(--van-white)_ | - |
| --van-image-preview-index-font-size | _var(--van-font-size-md)_ | - |
| --van-image-preview-index-line-height | _var(--van-line-height-md)_ | - |
| --van-image-preview-index-text-shadow | _0 1px 1px var(--van-gray-8)_ | - |
| --van-image-preview-overlay-background | _rgba(0, 0, 0, 0.9)_ | - |
| --van-image-preview-close-icon-size | _22px_ | - |
| --van-image-preview-close-icon-color | _var(--van-gray-5)_ | - |
| --van-image-preview-close-icon-margin | _var(--van-padding-md)_ | - |
| --van-image-preview-close-icon-z-index | _1_ | - |
