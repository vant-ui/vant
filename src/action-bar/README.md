# ActionBar

### Intro

Used to provide convenient interaction for page-related operations.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';

const app = createApp();
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
```

## Usage

### Basic Usage

```html
<van-action-bar>
  <van-action-bar-icon icon="chat-o" text="Icon1" @click="onClickIcon" />
  <van-action-bar-icon icon="cart-o" text="Icon2" @click="onClickIcon" />
  <van-action-bar-icon icon="shop-o" text="Icon3" @click="onClickIcon" />
  <van-action-bar-button type="danger" text="Button" @click="onClickButton" />
</van-action-bar>
```

```js
import { Toast } from 'vant';

export default {
  setup() {
    const onClickIcon = () => Toast('Click Icon');
    const onClickButton = () => Toast('Click Button');
    return {
      onClickIcon,
      onClickButton,
    };
  },
};
```

### Icon Badge

Use `badge` prop to show badge in icon.

```html
<van-action-bar>
  <van-action-bar-icon icon="chat-o" text="Icon1" dot />
  <van-action-bar-icon icon="cart-o" text="Icon2" badge="5" />
  <van-action-bar-icon icon="shop-o" text="Icon3" badge="12" />
  <van-action-bar-button type="warning" text="Button" />
  <van-action-bar-button type="danger" text="Button" />
</van-action-bar>
```

### Custom Icon Color

```html
<van-action-bar>
  <van-action-bar-icon icon="chat-o" text="Icon1" color="#ee0a24" />
  <van-action-bar-icon icon="cart-o" text="Icon2" />
  <van-action-bar-icon icon="star" text="Collected" color="#ff5000" />
  <van-action-bar-button type="warning" text="Button" />
  <van-action-bar-button type="danger" text="Button" />
</van-action-bar>
```

### Custom Button Color

```html
<van-action-bar>
  <van-action-bar-icon icon="chat-o" text="Icon1" />
  <van-action-bar-icon icon="shop-o" text="Icon2" />
  <van-action-bar-button color="#be99ff" type="warning" text="Button" />
  <van-action-bar-button color="#7232dd" type="danger" text="Button" />
</van-action-bar>
```

## API

### ActionBar Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_ | `true` |

### ActionBarIcon Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| text | Button text | _string_ | - |
| icon | Icon | _string_ | - |
| color | Icon color | _string_ | `#323233` |
| icon-class | Icon class name | _string \| Array \| object_ | `''` |
| dot `2.5.5` | Whether to show red dot | _boolean_ | - |
| badge `2.5.6` | Content of the badge | _number \| string_ | - |
| url | Link | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### ActionBarButton Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| text | Button text | _string_ | - |
| type | Button type, Can be set to `primary` `info` `warning` `danger` | _string_ | `default` |
| color | Button color, support linear-gradient | _string_ | - |
| icon | Left Icon | _string_ | - |
| disabled | Whether to disable button | _boolean_ | `false` |
| loading | Whether show loading status | _boolean_ | `false` |
| url | Link | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### ActionBarIcon Slots

| Name    | Description |
| ------- | ----------- |
| default | Text        |
| icon    | Custom icon |

### ActionBarButton Slots

| Name    | Description    |
| ------- | -------------- |
| default | Button content |

### Less Variables

How to use: [Custom Theme](#/en-US/theme).

| Name                              | Default Value      | Description |
| --------------------------------- | ------------------ | ----------- |
| @action-bar-background-color      | `@white`           | -           |
| @action-bar-height                | `50px`             | -           |
| @action-bar-icon-width            | `48px`             | -           |
| @action-bar-icon-height           | `100%`             | -           |
| @action-bar-icon-color            | `@text-color`      | -           |
| @action-bar-icon-size             | `18px`             | -           |
| @action-bar-icon-font-size        | `@font-size-xs`    | -           |
| @action-bar-icon-active-color     | `@active-color`    | -           |
| @action-bar-icon-text-color       | `@gray-7`          | -           |
| @action-bar-icon-background-color | `@white`           | -           |
| @action-bar-button-height         | `40px`             | -           |
| @action-bar-button-warning-color  | `@gradient-orange` | -           |
| @action-bar-button-danger-color   | `@gradient-red`    | -           |
