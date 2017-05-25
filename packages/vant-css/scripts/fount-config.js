module.exports = {
  name: 'vant-icon',
  output: '../build',
  meta: {
    author: 'houzi, zhangmin',
    license: 'MIT',
    license_url: 'https://opensource.org/licenses/MIT',
    homepage: 'http://github.com/youzan',
    css_prefix_text: 'van-icon-',
    filename_hash: true
  },
  hinting: true,
  glyphs_dir: '../icons',
  glyphs: [
    {
      keywords: ['qr', 'invalid'],
      src: '二维码失效.svg',
      css: 'qr-invalid'
    },
    {
      keywords: ['qr'],
      src: '二维码.svg',
      css: 'qr'
    },
    {
      keywords: ['exchange'],
      src: '兑换.svg',
      css: 'exchange',
      'correct_contour_direction': true
    },
    {
      keywords: ['close'],
      src: '关闭.svg',
      css: 'close'
    },
    {
      keywords: ['location'],
      src: '其他分店.svg',
      css: 'location',
      'correct_contour_direction': true
    },
    {
      keywords: ['upgrade'],
      src: '升级地址.svg',
      css: 'upgrade'
    },
    {
      keywords: ['check'],
      src: '单选.svg',
      css: 'check'
    },
    {
      keywords: ['checked'],
      src: '选中.svg',
      css: 'checked'
    },
    {
      keywords: ['like', 'outline'],
      src: '喜欢.svg',
      css: 'like-o'
    },
    {
      keywords: ['like', 'filled'],
      src: '喜欢2.svg',
      css: 'like'
    },
    {
      keywords: ['chat'],
      src: '客服.svg',
      css: 'chat',
      'correct_contour_direction': true
    },
    {
      keywords: ['shop'],
      src: '店铺.svg',
      css: 'shop'
    },
    {
      keywords: ['photograph'],
      src: '拍照.svg',
      css: 'photograph'
    },
    {
      keywords: ['add'],
      src: '新增地址.svg',
      css: 'add'
    },
    {
      keywords: ['add2'],
      src: '添加.svg',
      css: 'add2'
    },
    {
      keywords: ['photo'],
      src: '照片.svg',
      css: 'photo'
    },
    {
      keywords: ['logistics'],
      src: '物流.svg',
      css: 'logistics',
      'correct_contour_direction': true
    },
    {
      keywords: ['edit'],
      src: '编辑地址.svg',
      css: 'edit'
    },
    {
      keywords: ['passed'],
      src: '认证通过.svg',
      css: 'passed'
    },
    {
      keywords: ['cart'],
      src: '购物车.svg',
      css: 'cart'
    },
    {
      keywords: ['arrow'],
      src: '进入箭头.svg',
      css: 'arrow'
    },
    {
      keywords: ['gift'],
      src: '送礼.svg',
      css: 'gift'
    },
    {
      keywords: ['search'],
      src: '搜索.svg',
      css: 'search'
    },
    {
      keywords: ['clear'],
      src: '清除搜索.svg',
      css: 'clear'
    },
    {
      keywords: ['success'],
      src: '成功.svg',
      css: 'success'
    },
    {
      keywords: ['fail'],
      src: '失败.svg',
      css: 'fail'
    },
    {
      keywords: ['contact'],
      src: '联系人.svg',
      css: 'contact',
      'correct_contour_direction': true
    },
    {
      keywords: ['wechat'],
      src: '微信支付.svg',
      css: 'wechat'
    },
    {
      keywords: ['alipay'],
      src: '支付宝支付.svg',
      css: 'alipay'
    },
    {
      keywords: ['password', 'view'],
      src: '密码可见.svg',
      css: 'password-view'
    },
    {
      keywords: ['password', 'not', 'view'],
      src: '密码不见.svg',
      css: 'password-not-view'
    },
    {
      keywords: ['wap', 'nav'],
      src: 'wap导航.svg',
      css: 'wap-nav'
    },
    {
      keywords: ['wap', 'home'],
      src: 'wap首页.svg',
      css: 'wap-home'
    }
  ]
};
