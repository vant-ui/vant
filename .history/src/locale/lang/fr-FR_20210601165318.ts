export default {
  name: 'Nom',
  tel: 'Telephone',
  save: 'Sauvegarder',
  confirm: 'Confirmer',
  cancel: 'Annuler',
  delete: 'Suprimer',
  complete: 'Terminé',
  loading: 'Chargement...',
  telEmpty: 'Veuillez remplir le tel',
  nameEmpty: 'Veuillez remplir le nom',
  nameInvalid: 'Nom incorrect',
  confirmDelete: 'Êtes-vous sûr de vouloir supprimer?',
  telInvalid: 'Numéro de téléphone incorrect',
  vanCalendar: {
    end: 'Fin',
    start: 'Début',
    title: 'Calendrier',
    startEnd: 'Début/Fin',
    weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Choisir pas plus de ${maxRange} jours`,
  },
  vanCascader: {
    select: 'Sélectionner',
  },
  vanContactCard: {
    addText: 'Ajouter des informations de contact',
  },
  vanContactList: {
    addText: 'Ajouter un nouveau contact,
  },
  vanPagination: {
    prev: 'Précédent',
    next: 'Suivant',
  },
  vanPullRefresh: {
    pulling: 'Tirer pour actualiser ...',
    loosing: 'Relâcher pour actualiser...',
  },
  vanSubmitBar: {
    label: 'Total：',
  },
  vanCoupon: {
    unlimited: 'Unlimited',
    discount: (discount: number) => `${discount * 10}% off`,
    condition: (condition: number) => `At least ${condition}`,
  },
  vanCouponCell: {
    title: 'Coupon',
    tips: 'No coupons',
    count: (count: number) => `You have ${count} coupons`,
  },
  vanCouponList: {
    empty: 'No coupons',
    exchange: 'Exchange',
    close: 'Close',
    enable: 'Available',
    disabled: 'Unavailable',
    placeholder: 'Coupon code',
  },
  vanAddressEdit: {
    area: 'Area',
    postal: 'Postal',
    areaEmpty: 'Please select a receiving area',
    addressEmpty: 'Address can not be empty',
    postalEmpty: 'Wrong postal code',
    defaultAddress: 'Set as the default address',
    telPlaceholder: 'Phone',
    namePlaceholder: 'Name',
    areaPlaceholder: 'Area',
  },
  vanAddressEditDetail: {
    label: 'Address',
    placeholder: 'Address',
  },
  vanAddressList: {
    add: 'Add new address',
  },
};
