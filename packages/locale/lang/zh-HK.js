export default {
  name: '姓名',
  tel: '電話',
  save: '保存',
  confirm: '確認',
  cancel: '取消',
  delete: '刪除',
  complete: '完成',
  loadingTip: '加載中...',
  telEmpty: '請填寫電話',
  nameEmpty: '請填寫姓名',
  confirmDelete: '確定要刪除麽',
  telInvalid: '請填寫正確的電話',
  vanContactCard: {
    addText: '添加訂單聯系人信息'
  },
  vanContactList: {
    addText: '新建聯系人'
  },
  vanPagination: {
    prev: '上一頁',
    next: '下一頁'
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '釋放即可刷新...'
  },
  vanSubmitBar: {
    label: '合計：'
  },
  vanCouponCell: {
    title: '優惠券',
    tips: '使用優惠',
    count: count => `您有 ${count} 個可用優惠`
  },
  vanCouponList: {
    empty: '暫無優惠券',
    exchange: '兌換',
    close: '不使用優惠',
    enable: '可使用優惠券',
    disabled: '不可使用優惠券',
    placeholder: '請輸入優惠碼'
  },
  vanCouponItem: {
    valid: '有效期',
    unlimited: '無使用門檻',
    discount: discount => `${discount}折`,
    condition: (condition) => `滿${condition}元可用`
  },
  vanAddressEdit: {
    area: '地區',
    postal: '郵政編碼',
    areaEmpty: '請選擇地區',
    addressEmpty: '請填寫詳細地址',
    postalEmpty: '郵政編碼格式不正確',
    defaultAddress: '設為默認收貨地址',
    telPlaceholder: '收貨人手機號',
    namePlaceholder: '收貨人姓名',
    areaPlaceholder: '選擇省 / 市 / 區'
  },
  vanAddressEditDetail: {
    label: '詳細地址',
    placeholder: '街道門牌、樓層房間號等信息'
  },
  vanAddressList: {
    add: '新增地址'
  },
  vanSku: {
    unavailable: '商品已經無法購買啦',
    spec: '請先選擇商品規格',
    least: '至少選擇一件',
    quota: quota => `限購${quota}件`,
    inventory: '庫存不足',
    purchase: count => `您已購買${count}件`
  },
  vanSkuActions: {
    cart: '加入購物車',
    buy: '立即購買'
  },
  vanSkuMessages: {
    fill: '請填寫',
    upload: '請上傳',
    number: '請填寫正確的數字格式留言',
    email: '請填寫正確的郵箱',
    id_no: '請填寫正確的身份證號碼',
    onePic: '僅限一張',
    placeholder: {
      id_no: '輸入身份證號碼',
      text: '輸入文本',
      tel: '輸入數字',
      email: '輸入郵箱',
      date: '點擊選擇日期',
      time: '點擊選擇時間',
      textarea: '點擊填寫段落文本'
    }
  },
  vanSkuImgUploader: {
    or: '或',
    uploading: '正在上傳...',
    rephoto: '重拍',
    photo: '拍照',
    reselect: '重新選擇照片',
    select: '選擇照片',
    maxSize: maxSize => `最大可上傳圖片為${maxSize}MB，請嘗試壓縮圖片尺寸`
  },
  vanSkuStepper: {
    title: '購買數量',
    remain: count => `剩余${count}件`,
    quota: quota => `每人限購${quota}件`
  }
};
