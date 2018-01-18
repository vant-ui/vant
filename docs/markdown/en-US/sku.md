## Sku

### Install
```javascript
import { Sku } from 'vant';

Vue.use(Sku);
```

### Usage
#### Basic Usage

```html
<van-sku
  v-model="showBase"
  :sku="sku"
  :goods="goods"
  :goods-id="goodsId"
  :hide-stock="sku.hide_stock"
  :quota="quota"
  :quota-used="quotaUsed"
  :reset-stepper-on-hide="resetStepperOnHide"
  :disable-stepper-input="disableStepperInput"
  @buy-clicked="handleBuyClicked"
  @add-cart="handleAddCartClicked"
/>
```

#### Advanced Usage

```html
<van-sku
  v-model="showCustomAction"
  stepper-title="Stepper title"
  :sku="sku"
  :goods="goods"
  :goods-id="goodsId"
  :hide-stock="sku.hide_stock"
  :show-add-cart-btn="true"
  :quota="quota"
  :quota-used="quotaUsed"
  :reset-stepper-on-hide="true"
  :initial-sku="initialSku"
  @buy-clicked="handleBuyClicked"
  @add-cart="handleAddCartClicked"
>
  <!-- hide sku messages -->
  <template slot="sku-messages"></template>
  <!-- custom sku actions -->
  <template slot="sku-actions" slot-scope="props">
    <div class="van-sku-actions">
      <van-button bottom-action @click="handlePointClicked">Button</van-button>
      <!-- trigger sku inner event -->
      <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">Button</van-button>
    </div>
  </template>
</van-sku>
```

### API

| Attribute | Description | Type | Default | Accepted Values |
|-----------|-----------|-----------|-------------|-------------|
| v-model | Whether to show sku | `Boolean` | `false` | - |
| sku | Sku data | `Object` | - | - |
| goods | Goods info | `Object` | - | - |
| goods-id | Goods id | `String | Number` | - | - |
| hide-stock | Whether to hide stock | `Boolean` | `false` | - |
| show-add-cart-btn | Whether to show cart button | `Boolean` | `true` | - |
| quota | Quota (0 as no limit) | `Number` | `0` | - |
| quota-used | Used quota | `Number` | `0` | - |
| reset-stepper-on-hide | Whether to reset stepper when hide | `Boolean` | `false` | - |
| disable-stepper-input | Whether to disable stepper input | `Boolean` | `false` | - |
| stepper-title | Quantity title | `String` | `Quantity` | - |

### Event

| Event | Description | Arguments |
|-----------|-----------|-----------|
| add-cart | Triggered when click cart button | data: Object |
| buy-clicked | Triggered when click buy button | data: Object |

### Slot

| Name | Description | 
|-----------|-----------|
| sku-header | Custom header |
| sku-group | Custom sku |
| extra-sku-group | Extra custom content |
| sku-stepper | Custom stepper |
| sku-messages | Custom messages |
| sku-actions | Custom button actions |

#### Data Structure
#### Sku Data Structure
```javascript
sku: {
  tree: [
    {
      k: 'Color',
      v: [
        {
          id: '30349',
          name: 'Red',
          imgUrl: 'https://img.yzcdn.cn/1.jpg'
        },
        {
          id: '1215',
          name: 'Blue',
          imgUrl: 'https://img.yzcdn.cn/2.jpg'
        }
      ],
      k_s: 's1'
    }
  ],
  list: [
    {
      id: 2259,
      price: 100,
      s1: '1215',
      s2: '1193',
      s3: '0',
      stock_num: 110
    }
  ],
  price: '1.00',
  stock_num: 227,
  collection_id: 2261,
  none_sku: false,
  messages: [
    {
      datetime: '0',
      multiple: '0',
      name: 'Message',
      type: 'text',
      required: '1'
    }
  ],
  hide_stock: false
}
```

#### Goods Data Structure

```javascript
goods: {
  title: 'Title',
  picture: 'https://img.yzcdn.cn/1.jpg'
}
```

#### Event Params Data Structure

```javascript
skuData: {
  goodsId: '946755',
  messages: {
    message_0: '12',
    message_1: ''
  },
  cartMessages: {
    'Message 1': 'xxxx'
  },
  selectedNum: 1,
  selectedSkuComb: {
    id: 2257,
    price: 100,
    s1: '30349',
    s2: '1193',
    s3: '0',
    stock_num: 111
  }
}
```
