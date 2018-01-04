// This file is auto gererated by build/bin/build-entry.js
import progress from 'nprogress';

function wrapper(component) {
  return function(r) {
    progress.start();
    component(r).then(() => {
      progress.done();
    }).catch(() => {
      progress.done();
    });
  };
}

export default {
  'zh-CN/actionsheet': wrapper(r => require.ensure([], () => r(require('./zh-CN/actionsheet.md')), 'zh-CN/actionsheet')),
  'zh-CN/address-edit': wrapper(r => require.ensure([], () => r(require('./zh-CN/address-edit.md')), 'zh-CN/address-edit')),
  'zh-CN/address-list': wrapper(r => require.ensure([], () => r(require('./zh-CN/address-list.md')), 'zh-CN/address-list')),
  'zh-CN/area': wrapper(r => require.ensure([], () => r(require('./zh-CN/area.md')), 'zh-CN/area')),
  'zh-CN/badge': wrapper(r => require.ensure([], () => r(require('./zh-CN/badge.md')), 'zh-CN/badge')),
  'zh-CN/button': wrapper(r => require.ensure([], () => r(require('./zh-CN/button.md')), 'zh-CN/button')),
  'zh-CN/card': wrapper(r => require.ensure([], () => r(require('./zh-CN/card.md')), 'zh-CN/card')),
  'zh-CN/cell-swipe': wrapper(r => require.ensure([], () => r(require('./zh-CN/cell-swipe.md')), 'zh-CN/cell-swipe')),
  'zh-CN/cell': wrapper(r => require.ensure([], () => r(require('./zh-CN/cell.md')), 'zh-CN/cell')),
  'zh-CN/changelog-generated': wrapper(r => require.ensure([], () => r(require('./zh-CN/changelog-generated.md')), 'zh-CN/changelog-generated')),
  'zh-CN/changelog': wrapper(r => require.ensure([], () => r(require('./zh-CN/changelog.md')), 'zh-CN/changelog')),
  'zh-CN/checkbox': wrapper(r => require.ensure([], () => r(require('./zh-CN/checkbox.md')), 'zh-CN/checkbox')),
  'zh-CN/contact': wrapper(r => require.ensure([], () => r(require('./zh-CN/contact.md')), 'zh-CN/contact')),
  'zh-CN/coupon': wrapper(r => require.ensure([], () => r(require('./zh-CN/coupon.md')), 'zh-CN/coupon')),
  'zh-CN/datetime-picker': wrapper(r => require.ensure([], () => r(require('./zh-CN/datetime-picker.md')), 'zh-CN/datetime-picker')),
  'zh-CN/dialog': wrapper(r => require.ensure([], () => r(require('./zh-CN/dialog.md')), 'zh-CN/dialog')),
  'zh-CN/field': wrapper(r => require.ensure([], () => r(require('./zh-CN/field.md')), 'zh-CN/field')),
  'zh-CN/goods-action': wrapper(r => require.ensure([], () => r(require('./zh-CN/goods-action.md')), 'zh-CN/goods-action')),
  'zh-CN/i18n': wrapper(r => require.ensure([], () => r(require('./zh-CN/i18n.md')), 'zh-CN/i18n')),
  'zh-CN/icon': wrapper(r => require.ensure([], () => r(require('./zh-CN/icon.md')), 'zh-CN/icon')),
  'zh-CN/image-preview': wrapper(r => require.ensure([], () => r(require('./zh-CN/image-preview.md')), 'zh-CN/image-preview')),
  'zh-CN/intro': wrapper(r => require.ensure([], () => r(require('./zh-CN/intro.md')), 'zh-CN/intro')),
  'zh-CN/layout': wrapper(r => require.ensure([], () => r(require('./zh-CN/layout.md')), 'zh-CN/layout')),
  'zh-CN/lazyload': wrapper(r => require.ensure([], () => r(require('./zh-CN/lazyload.md')), 'zh-CN/lazyload')),
  'zh-CN/loading': wrapper(r => require.ensure([], () => r(require('./zh-CN/loading.md')), 'zh-CN/loading')),
  'zh-CN/nav-bar': wrapper(r => require.ensure([], () => r(require('./zh-CN/nav-bar.md')), 'zh-CN/nav-bar')),
  'zh-CN/notice-bar': wrapper(r => require.ensure([], () => r(require('./zh-CN/notice-bar.md')), 'zh-CN/notice-bar')),
  'zh-CN/number-keyboard': wrapper(r => require.ensure([], () => r(require('./zh-CN/number-keyboard.md')), 'zh-CN/number-keyboard')),
  'zh-CN/pagination': wrapper(r => require.ensure([], () => r(require('./zh-CN/pagination.md')), 'zh-CN/pagination')),
  'zh-CN/panel': wrapper(r => require.ensure([], () => r(require('./zh-CN/panel.md')), 'zh-CN/panel')),
  'zh-CN/password-input': wrapper(r => require.ensure([], () => r(require('./zh-CN/password-input.md')), 'zh-CN/password-input')),
  'zh-CN/picker': wrapper(r => require.ensure([], () => r(require('./zh-CN/picker.md')), 'zh-CN/picker')),
  'zh-CN/popup': wrapper(r => require.ensure([], () => r(require('./zh-CN/popup.md')), 'zh-CN/popup')),
  'zh-CN/progress': wrapper(r => require.ensure([], () => r(require('./zh-CN/progress.md')), 'zh-CN/progress')),
  'zh-CN/pull-refresh': wrapper(r => require.ensure([], () => r(require('./zh-CN/pull-refresh.md')), 'zh-CN/pull-refresh')),
  'zh-CN/quickstart': wrapper(r => require.ensure([], () => r(require('./zh-CN/quickstart.md')), 'zh-CN/quickstart')),
  'zh-CN/radio': wrapper(r => require.ensure([], () => r(require('./zh-CN/radio.md')), 'zh-CN/radio')),
  'zh-CN/search': wrapper(r => require.ensure([], () => r(require('./zh-CN/search.md')), 'zh-CN/search')),
  'zh-CN/sku': wrapper(r => require.ensure([], () => r(require('./zh-CN/sku.md')), 'zh-CN/sku')),
  'zh-CN/stepper': wrapper(r => require.ensure([], () => r(require('./zh-CN/stepper.md')), 'zh-CN/stepper')),
  'zh-CN/steps': wrapper(r => require.ensure([], () => r(require('./zh-CN/steps.md')), 'zh-CN/steps')),
  'zh-CN/submit-bar': wrapper(r => require.ensure([], () => r(require('./zh-CN/submit-bar.md')), 'zh-CN/submit-bar')),
  'zh-CN/swipe': wrapper(r => require.ensure([], () => r(require('./zh-CN/swipe.md')), 'zh-CN/swipe')),
  'zh-CN/switch-cell': wrapper(r => require.ensure([], () => r(require('./zh-CN/switch-cell.md')), 'zh-CN/switch-cell')),
  'zh-CN/switch': wrapper(r => require.ensure([], () => r(require('./zh-CN/switch.md')), 'zh-CN/switch')),
  'zh-CN/tab': wrapper(r => require.ensure([], () => r(require('./zh-CN/tab.md')), 'zh-CN/tab')),
  'zh-CN/tabbar': wrapper(r => require.ensure([], () => r(require('./zh-CN/tabbar.md')), 'zh-CN/tabbar')),
  'zh-CN/tag': wrapper(r => require.ensure([], () => r(require('./zh-CN/tag.md')), 'zh-CN/tag')),
  'zh-CN/theme': wrapper(r => require.ensure([], () => r(require('./zh-CN/theme.md')), 'zh-CN/theme')),
  'zh-CN/toast': wrapper(r => require.ensure([], () => r(require('./zh-CN/toast.md')), 'zh-CN/toast')),
  'zh-CN/tree-select': wrapper(r => require.ensure([], () => r(require('./zh-CN/tree-select.md')), 'zh-CN/tree-select')),
  'zh-CN/uploader': wrapper(r => require.ensure([], () => r(require('./zh-CN/uploader.md')), 'zh-CN/uploader')),
  'zh-CN/waterfall': wrapper(r => require.ensure([], () => r(require('./zh-CN/waterfall.md')), 'zh-CN/waterfall')),
  'en-US/actionsheet': wrapper(r => require.ensure([], () => r(require('./en-US/actionsheet.md')), 'en-US/actionsheet')),
  'en-US/address-edit': wrapper(r => require.ensure([], () => r(require('./en-US/address-edit.md')), 'en-US/address-edit')),
  'en-US/address-list': wrapper(r => require.ensure([], () => r(require('./en-US/address-list.md')), 'en-US/address-list')),
  'en-US/area': wrapper(r => require.ensure([], () => r(require('./en-US/area.md')), 'en-US/area')),
  'en-US/badge': wrapper(r => require.ensure([], () => r(require('./en-US/badge.md')), 'en-US/badge')),
  'en-US/button': wrapper(r => require.ensure([], () => r(require('./en-US/button.md')), 'en-US/button')),
  'en-US/card': wrapper(r => require.ensure([], () => r(require('./en-US/card.md')), 'en-US/card')),
  'en-US/cell-swipe': wrapper(r => require.ensure([], () => r(require('./en-US/cell-swipe.md')), 'en-US/cell-swipe')),
  'en-US/cell': wrapper(r => require.ensure([], () => r(require('./en-US/cell.md')), 'en-US/cell')),
  'en-US/changelog': wrapper(r => require.ensure([], () => r(require('./en-US/changelog.md')), 'en-US/changelog')),
  'en-US/checkbox': wrapper(r => require.ensure([], () => r(require('./en-US/checkbox.md')), 'en-US/checkbox')),
  'en-US/contact': wrapper(r => require.ensure([], () => r(require('./en-US/contact.md')), 'en-US/contact')),
  'en-US/coupon': wrapper(r => require.ensure([], () => r(require('./en-US/coupon.md')), 'en-US/coupon')),
  'en-US/datetime-picker': wrapper(r => require.ensure([], () => r(require('./en-US/datetime-picker.md')), 'en-US/datetime-picker')),
  'en-US/dialog': wrapper(r => require.ensure([], () => r(require('./en-US/dialog.md')), 'en-US/dialog')),
  'en-US/field': wrapper(r => require.ensure([], () => r(require('./en-US/field.md')), 'en-US/field')),
  'en-US/goods-action': wrapper(r => require.ensure([], () => r(require('./en-US/goods-action.md')), 'en-US/goods-action')),
  'en-US/i18n': wrapper(r => require.ensure([], () => r(require('./en-US/i18n.md')), 'en-US/i18n')),
  'en-US/icon': wrapper(r => require.ensure([], () => r(require('./en-US/icon.md')), 'en-US/icon')),
  'en-US/image-preview': wrapper(r => require.ensure([], () => r(require('./en-US/image-preview.md')), 'en-US/image-preview')),
  'en-US/intro': wrapper(r => require.ensure([], () => r(require('./en-US/intro.md')), 'en-US/intro')),
  'en-US/layout': wrapper(r => require.ensure([], () => r(require('./en-US/layout.md')), 'en-US/layout')),
  'en-US/lazyload': wrapper(r => require.ensure([], () => r(require('./en-US/lazyload.md')), 'en-US/lazyload')),
  'en-US/loading': wrapper(r => require.ensure([], () => r(require('./en-US/loading.md')), 'en-US/loading')),
  'en-US/nav-bar': wrapper(r => require.ensure([], () => r(require('./en-US/nav-bar.md')), 'en-US/nav-bar')),
  'en-US/notice-bar': wrapper(r => require.ensure([], () => r(require('./en-US/notice-bar.md')), 'en-US/notice-bar')),
  'en-US/number-keyboard': wrapper(r => require.ensure([], () => r(require('./en-US/number-keyboard.md')), 'en-US/number-keyboard')),
  'en-US/pagination': wrapper(r => require.ensure([], () => r(require('./en-US/pagination.md')), 'en-US/pagination')),
  'en-US/panel': wrapper(r => require.ensure([], () => r(require('./en-US/panel.md')), 'en-US/panel')),
  'en-US/password-input': wrapper(r => require.ensure([], () => r(require('./en-US/password-input.md')), 'en-US/password-input')),
  'en-US/picker': wrapper(r => require.ensure([], () => r(require('./en-US/picker.md')), 'en-US/picker')),
  'en-US/popup': wrapper(r => require.ensure([], () => r(require('./en-US/popup.md')), 'en-US/popup')),
  'en-US/progress': wrapper(r => require.ensure([], () => r(require('./en-US/progress.md')), 'en-US/progress')),
  'en-US/pull-refresh': wrapper(r => require.ensure([], () => r(require('./en-US/pull-refresh.md')), 'en-US/pull-refresh')),
  'en-US/quickstart': wrapper(r => require.ensure([], () => r(require('./en-US/quickstart.md')), 'en-US/quickstart')),
  'en-US/radio': wrapper(r => require.ensure([], () => r(require('./en-US/radio.md')), 'en-US/radio')),
  'en-US/search': wrapper(r => require.ensure([], () => r(require('./en-US/search.md')), 'en-US/search')),
  'en-US/sku': wrapper(r => require.ensure([], () => r(require('./en-US/sku.md')), 'en-US/sku')),
  'en-US/stepper': wrapper(r => require.ensure([], () => r(require('./en-US/stepper.md')), 'en-US/stepper')),
  'en-US/steps': wrapper(r => require.ensure([], () => r(require('./en-US/steps.md')), 'en-US/steps')),
  'en-US/submit-bar': wrapper(r => require.ensure([], () => r(require('./en-US/submit-bar.md')), 'en-US/submit-bar')),
  'en-US/swipe': wrapper(r => require.ensure([], () => r(require('./en-US/swipe.md')), 'en-US/swipe')),
  'en-US/switch-cell': wrapper(r => require.ensure([], () => r(require('./en-US/switch-cell.md')), 'en-US/switch-cell')),
  'en-US/switch': wrapper(r => require.ensure([], () => r(require('./en-US/switch.md')), 'en-US/switch')),
  'en-US/tab': wrapper(r => require.ensure([], () => r(require('./en-US/tab.md')), 'en-US/tab')),
  'en-US/tabbar': wrapper(r => require.ensure([], () => r(require('./en-US/tabbar.md')), 'en-US/tabbar')),
  'en-US/tag': wrapper(r => require.ensure([], () => r(require('./en-US/tag.md')), 'en-US/tag')),
  'en-US/theme': wrapper(r => require.ensure([], () => r(require('./en-US/theme.md')), 'en-US/theme')),
  'en-US/toast': wrapper(r => require.ensure([], () => r(require('./en-US/toast.md')), 'en-US/toast')),
  'en-US/tree-select': wrapper(r => require.ensure([], () => r(require('./en-US/tree-select.md')), 'en-US/tree-select')),
  'en-US/uploader': wrapper(r => require.ensure([], () => r(require('./en-US/uploader.md')), 'en-US/uploader')),
  'en-US/waterfall': wrapper(r => require.ensure([], () => r(require('./en-US/waterfall.md')), 'en-US/waterfall'))
};
