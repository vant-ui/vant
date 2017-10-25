## Tabbar 标签栏

<style>
.demo-tabbar {
  .van-tabbar {
    position: relative;

    &-item {
      cursor: pointer;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      active: 0,
      active2: 0,
      icon: {
        normal: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
        active: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
      }
    }
  }
}
</script>

### 使用指南
``` javascript
import { Tabbar, TabbarItem } from 'vant';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabbarItem.name, TabbarItem);
```

### 代码演示

#### 基础用法

:::demo 基础用法
```html
<van-tabbar v-model="active">
  <van-tabbar-item icon="shop">标签</van-tabbar-item>
  <van-tabbar-item icon="chat" dot>标签</van-tabbar-item>
  <van-tabbar-item icon="records" info="5">标签</van-tabbar-item>
  <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item>
</van-tabbar>
```

```javascript
export default {
  data() {
    return {
      active: 0
    }
  }
}
```
:::

#### 自定义图标
通过 icon slot 自定义图标

:::demo 自定义图标
```html
<van-tabbar v-model="active2">
  <van-tabbar-item icon="shop">
    <span>自定义</span>
    <img slot="icon" :src="active2 === 0 ? icon.active : icon.normal" />
  </van-tabbar-item>
  <van-tabbar-item icon="chat">标签</van-tabbar-item>
  <van-tabbar-item icon="records">标签</van-tabbar-item>
</van-tabbar>
```

```javascript
export default {
  data() {
    return {
      active2: 0,
      icon: {
        normal: '//img.yzcdn.cn/1.png',
        active: '//img.yzcdn.cn/2.png'
      }
    }
  }
}
```
:::

### Tabbar API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|-----------|-----------|-----------|-------------|-------------|
| v-model | 当前选中标签的索引 | `Number` | - | - |

### Tabbar Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| change | 切换标签时触发 | active: 当前选中标签 |

### TabbarItem API

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|-----------|-----------|-----------|-------------|-------------|
| icon | 图标名称 | `String` | - | Icon 组件中可用的类型 |
| dot | 是否显示小红点 | `Boolean` | - | - |
| info | 图标右上角提示信息 | `String` | - | - |
