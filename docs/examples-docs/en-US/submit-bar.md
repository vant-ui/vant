## SubmitBar

<script>
import { Toast } from 'packages';

export default {
  methods: {
    onClickButton() {
      Toast('点击按钮');
    },
    onClickEditAddress() {
      Toast('修改地址');
    }
  }
}
</script>

<style>
.demo-submit-bar {
  .van-submit-bar {
    position: relative;
  }
  .van-edit-address {
    color: #38F;
  }
}
</style>

### Install
``` javascript
import { SubmitBar } from 'vant';

Vue.component(SubmitBar.name, SubmitBar);
```

### Usage

#### Basic Usage

:::demo Basic Usage
```html
<van-submit-bar
  :price="3050"
  button-text="提交订单"
  @submit="onClickButton"
/>
```
:::

#### Disabled
禁用状态下不会触发`submit`事件

:::demo 禁用状态
```html
<van-submit-bar
  disabled
  :price="3050"
  button-text="提交订单"
  tip="您的收货地址不支持同城送, 我们已为您推荐快递"
  @submit="onClickButton"
/>
```
:::

#### Loading
加载状态下不会触发`submit`事件
:::demo 加载状态
```html
<van-submit-bar
  loading
  :price="3050"
  button-text="提交订单"
  @submit="onClickButton"
/>
```
:::

#### 
提示文案中的额外操作和说明
:::demo 提示文案中添加操作
```html
<van-submit-bar
  :price="3050"
  button-text="提交订单"
  @submit="onClickButton"
>
  <span slot="tip">
    您的收货地址不支持同城送, <span class="van-edit-address" @click="onClickEditAddress">修改地址 ></span>
  </span>
</van-submit-bar>
```
:::

### API

| Attribute | Description | Type | Default | 必须 |
|-----------|-----------|-----------|-------------|-------------|
| price | 价格（单位分） |  `Number` | - | 是 |
| button-text | 按钮文字 | `String` | - | 是 |
| button-type | 按钮类型 |  `String` | `danger` | 否 |
| tip | 提示文案 |  `String` | - | 否 |
| disabled | 是否禁用按钮 |  `Boolean` | `false` | 否 |
| loading | 是否显示加载中的按钮 |  `Boolean` | `false` | 否 |

### Event

| Event | Description | Attribute |
|-----------|-----------|-----------|
| submit | 按钮点击事件回调 | - |

### Slot

| Name | Description |
|-----------|-----------|
| tip | 提示文案中的额外操作和说明 |
