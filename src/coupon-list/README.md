# Coupon

### Intro

Used for redemption and selection of coupons.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { CouponCell, CouponList } from 'vant';

const app = createApp();
app.use(CouponCell);
app.use(CouponList);
```

## Usage

### Basic Usage

```html
<!-- Coupon Cell -->
<van-coupon-cell
  :coupons="state.coupons"
  :chosen-coupon="state.chosenCoupon"
  @click="state.showList = true"
/>
<!-- Coupon List -->
<van-popup
  v-model="state.showList"
  round
  position="bottom"
  style="height: 90%; padding-top: 4px;"
>
  <van-coupon-list
    :coupons="state.coupons"
    :chosen-coupon="state.chosenCoupon"
    :disabled-coupons="disabledCoupons"
    @change="onChange"
    @exchange="onExchange"
  />
</van-popup>
```

```js
import { reactive } from 'vue';

const coupon = {
  available: 1,
  originCondition: 0,
  reason: '',
  value: 150,
  name: 'Coupon name',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};

export default {
  setup() {
    const state = reactive({
      coupons: [coupon],
      showList: false,
      chosenCoupon: -1,
    });

    const onChange = (index) => {
      state.showList = false;
      state.chosenCoupon = index;
    };
    const onExchange = (code) => {
      state.coupons.push(coupon);
    };

    return {
      state,
      onChange,
      onExchange,
      disabledCoupons: [coupon],
    };
  },
};
```

## API

### CouponCell Props

| Attribute     | Description                  | Type               | Default  |
| ------------- | ---------------------------- | ------------------ | -------- |
| title         | Cell title                   | _string_           | `Coupon` |
| chosen-coupon | Index of chosen coupon       | _number \| string_ | `-1`     |
| coupons       | Coupon list                  | _Coupon[]_         | `[]`     |
| editable      | Cell editable                | _boolean_          | `true`   |
| border        | Whether to show inner border | _boolean_          | `true`   |
| currency      | Currency symbol              | _string_           | `¥`      |

### CouponList Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| v-model | Current exchange code | _string_ | - |
| chosen-coupon | Index of chosen coupon | _number_ | `-1` |
| coupons | Coupon list | _Coupon[]_ | `[]` |
| disabled-coupons | Disabled coupon list | _Coupon[]_ | `[]` |
| enabled-title | Title of coupon list | _string_ | `Available` | - |
| disabled-title | Title of disabled coupon list | _string_ | `Unavailable` | - |
| exchange-button-text | Exchange button text | _string_ | `Exchange` |
| exchange-button-loading | Whether to show loading in exchange button | _boolean_ | `false` |
| exchange-button-disabled | Whether to disable exchange button | _boolean_ | `false` |
| exchange-min-length | Min length to enable exchange button | _number_ | `1` |
| displayed-coupon-index | Index of displayed coupon | _number_ | - |
| close-button-text | Close button text | _string_ | `Close` |
| input-placeholder | Input placeholder | _string_ | `Coupon code` |
| currency | Currency symbol | _string_ | `¥` |
| empty-image | Placeholder image when list is empty | _string_ | `https://img.yzcdn.cn/vant/coupon-empty.png` |
| show-count | Whether to show coupon count in tab title | _boolean_ | `true` |

### CouponList Events

| Event | Description | Arguments |
| --- | --- | --- |
| change | Emitted when chosen coupon changed | index: index of chosen coupon |
| exchange | Emitted when exchanging coupon | code: exchange code |

### CouponList Slots

| Name                           | Description                     |
| ------------------------------ | ------------------------------- |
| list-footer `v3.0.18`          | Coupon list bottom              |
| disabled-list-footer `v3.0.18` | Unavailable coupons list bottom |

### Data Structure of Coupon

| Key         | Description                         | Type     |
| ----------- | ----------------------------------- | -------- |
| id          | Id                                  | _string_ |
| name        | Name                                | _string_ |
| condition   | Condition                           | _string_ |
| startAt     | Start time (Timestamp, unit second) | _number_ |
| endAt       | End time (Timestamp, unit second)   | _number_ |
| description | Description                         | _string_ |
| reason      | Unavailable reason                  | _string_ |
| value       | Value                               | _number_ |
| valueDesc   | Value Text                          | _string_ |
| unitDesc    | Unit Text                           | _string_ |

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --van-coupon-margin | `0 @padding-sm @padding-sm` | - |
| --van-coupon-content-height | `84px` | - |
| --van-coupon-content-padding | `14px 0` | - |
| --van-coupon-background-color | `@white` | - |
| --van-coupon-active-background-color | `@active-color` | - |
| --van-coupon-border-radius | `@border-radius-lg` | - |
| --van-coupon-box-shadow | `0 0 4px rgba(0, 0, 0, 0.1)` | - |
| --van-coupon-head-width | `96px` | - |
| --van-coupon-amount-color | `@red` | - |
| --van-coupon-amount-font-size | `30px` | - |
| --van-coupon-currency-font-size | `40%` | - |
| --van-coupon-name-font-size | `@font-size-md` | - |
| --van-coupon-disabled-text-color | `@gray-6` | - |
| --van-coupon-description-padding | `@padding-xs @padding-md` | - |
| --van-coupon-description-border-color | `@border-color` | - |
| --van-coupon-corner-checkbox-icon-color | `@red` | - |
| --van-coupon-list-background-color | `@background-color` | - |
| --van-coupon-list-field-padding | `5px 0 5px @padding-md` | - |
| --van-coupon-list-exchange-button-height | `32px` | - |
| --van-coupon-list-close-button-height | `40px` | - |
| --van-coupon-list-empty-image-size | `200px` | - |
| --van-coupon-list-empty-tip-color | `@gray-6` | - |
| --van-coupon-list-empty-tip-font-size | `@font-size-md` | - |
| --van-coupon-list-empty-tip-line-height | `@line-height-md` | - |
| --van-coupon-cell-selected-text-color | `@text-color` | - |
