## Vant 2.0 改动一览

## 不兼容更新

在 2.0 版本中，我们对组件和 API 进行重命名，以更加符合业界的命名规范，同时移除了少量不常用的属性，具体改动如下：

### Actionsheet

- 重命名为`ActionSheet`

### Button

- 移除`bottom-action`属性，请使用`square`和`size`代替

### Field

- 移除`on-icon-click`属性，请使用`click-right-icon`事件代替
- `icon`属性重命名为`right-icon`
- `icon`插槽重命名为`right-icon`
- `click-icon`事件重命名为`click-right-icon`

### GoodsAction

- `GoodsActionBigBtn`重命名为`GoodsActionButton`
- `GoodsActionMiniBtn`重命名为`GoodsActionIcon`
- `GoodsActionBigBtn`移除`primary`属性，请使用`type`属性代替

### Step

- 移除`icon`属性
- 移除`title`属性
- 移除`icon-class`属性
- 移除`description`属性
- 移除`message-extra`插槽

### Badge

- `BadgeGroup`重命名为`Sidebar`
- `Badge`重命名为`SlideBarItem`

### Loading

- 移除`circle`类型
- 移除`gradient-circle`类型

### Waterfall

- 移除在 1.0 版本废弃的 Waterfall 组件，请使用`List`组件代替，或使用独立的[@vant/waterfall](https://github.com/chenjiahan/vant-waterfall)包。

## 新特性

### Sku

- 新增`preview-open`事件
- 新增`preview-close`事件
