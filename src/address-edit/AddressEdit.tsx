import {
  ref,
  watch,
  computed,
  nextTick,
  reactive,
  PropType,
  defineComponent,
} from 'vue';

// Utils
import { ComponentInstance, createNamespace, isObject } from '../utils';
import { isMobile } from '../utils/validate/mobile';

// Composables
import { useExpose } from '../composables/use-expose';

// Components
import Area, { AreaList, AreaColumnOption } from '../area';
import Cell from '../cell';
import Field from '../field';
import Popup from '../popup';
import Toast from '../toast';
import Button from '../button';
import Dialog from '../dialog';
import Switch from '../switch';
import AddressEditDetail, { AddressEditSearchItem } from './AddressEditDetail';

const [name, bem, t] = createNamespace('address-edit');

export type AddressEditInfo = {
  tel: string;
  name: string;
  city: string;
  county: string;
  country: string;
  province: string;
  areaCode: string;
  isDefault?: boolean;
  postalCode?: string;
  addressDetail: string;
};

const defaultData: AddressEditInfo = {
  name: '',
  tel: '',
  city: '',
  county: '',
  country: '',
  province: '',
  areaCode: '',
  isDefault: false,
  postalCode: '',
  addressDetail: '',
};

function isPostal(value: string) {
  return /^\d{6}$/.test(value);
}

export default defineComponent({
  name,

  props: {
    areaList: Object as PropType<AreaList>,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function as PropType<
      (key: string, value: string) => string | undefined
    >,
    showDelete: Boolean,
    showPostal: Boolean,
    disableArea: Boolean,
    searchResult: Array as PropType<AddressEditSearchItem[]>,
    telMaxlength: [Number, String],
    showSetDefault: Boolean,
    saveButtonText: String,
    areaPlaceholder: String,
    deleteButtonText: String,
    showSearchResult: Boolean,
    showArea: {
      type: Boolean,
      default: true,
    },
    showDetail: {
      type: Boolean,
      default: true,
    },
    detailRows: {
      type: [Number, String],
      default: 1,
    },
    detailMaxlength: {
      type: [Number, String],
      default: 200,
    },
    addressInfo: {
      type: Object as PropType<Partial<AddressEditInfo>>,
      default: () => ({ ...defaultData }),
    },
    telValidator: {
      type: Function as PropType<(val: string) => boolean>,
      default: isMobile,
    },
    postalValidator: {
      type: Function as PropType<(val: string) => boolean>,
      default: isPostal,
    },
    areaColumnsPlaceholder: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  emits: [
    'save',
    'focus',
    'delete',
    'click-area',
    'change-area',
    'change-detail',
    'cancel-delete',
    'select-search',
    'change-default',
  ],

  setup(props, { emit, slots }) {
    const areaRef = ref<ComponentInstance>();

    const state = reactive({
      data: {} as AddressEditInfo,
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: '',
        name: '',
        areaCode: '',
        postalCode: '',
        addressDetail: '',
      } as Record<string, string>,
    });

    const areaListLoaded = computed(
      () => isObject(props.areaList) && Object.keys(props.areaList).length
    );

    const areaText = computed(() => {
      const { country, province, city, county, areaCode } = state.data;
      if (areaCode) {
        const arr = [country, province, city, county];
        if (province && province === city) {
          arr.splice(1, 1);
        }
        return arr.filter(Boolean).join('/');
      }
      return '';
    });

    // hide bottom field when use search && detail get focused
    const hideBottomFields = computed(
      () => props.searchResult?.length && state.detailFocused
    );

    const assignAreaValues = () => {
      if (areaRef.value) {
        const detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        Object.assign(state.data, detail);
      }
    };

    const onFocus = (key: string) => {
      state.errorInfo[key] = '';
      state.detailFocused = key === 'addressDetail';
      emit('focus', key);
    };

    const getErrorMessage = (key: string) => {
      const value = String((state.data as any)[key] || '').trim();

      if (props.validator) {
        const message = props.validator(key, value);
        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : t('nameEmpty');
        case 'tel':
          return props.telValidator(value) ? '' : t('telInvalid');
        case 'areaCode':
          return value ? '' : t('areaEmpty');
        case 'addressDetail':
          return value ? '' : t('addressEmpty');
        case 'postalCode':
          return value && !props.postalValidator(value) ? t('postalEmpty') : '';
      }
    };

    const onSave = () => {
      const items = ['name', 'tel'];

      if (props.showArea) {
        items.push('areaCode');
      }

      if (props.showDetail) {
        items.push('addressDetail');
      }

      if (props.showPostal) {
        items.push('postalCode');
      }

      const isValid = items.every((item) => {
        const msg = getErrorMessage(item);
        if (msg) {
          state.errorInfo[item] = msg;
        }
        return !msg;
      });

      if (isValid && !props.isSaving) {
        emit('save', state.data);
      }
    };

    const onChangeDetail = (val: string) => {
      state.data.addressDetail = val;
      emit('change-detail', val);
    };

    const onAreaConfirm = (values: AreaColumnOption[]) => {
      values = values.filter(Boolean);

      if (values.some((value) => !value.code)) {
        Toast(t('areaEmpty'));
        return;
      }

      state.showAreaPopup = false;
      assignAreaValues();
      emit('change-area', values);
    };

    const onDelete = () => {
      Dialog.confirm({
        title: t('confirmDelete'),
      })
        .then(() => emit('delete', state.data))
        .catch(() => emit('cancel-delete', state.data));
    };

    // get values of area component
    const getArea = () => (areaRef.value ? areaRef.value.getValues() : []);

    // set area code to area component
    const setAreaCode = (code?: string) => {
      state.data.areaCode = code || '';

      if (code) {
        nextTick(assignAreaValues);
      }
    };

    const onDetailBlur = () => {
      // await for click search event
      setTimeout(() => {
        state.detailFocused = false;
      });
    };

    const setAddressDetail = (value: string) => {
      state.data.addressDetail = value;
    };

    const renderSetDefaultCell = () => {
      if (props.showSetDefault) {
        const slots = {
          'right-icon': () => (
            <Switch
              v-model={state.data.isDefault}
              size="24"
              onChange={(event) => emit('change-default', event)}
            />
          ),
        };

        return (
          <Cell
            v-slots={slots}
            v-show={!hideBottomFields.value}
            center
            title={t('defaultAddress')}
            class={bem('default')}
          />
        );
      }

      return null;
    };

    useExpose({
      getArea,
      setAreaCode,
      setAddressDetail,
    });

    watch(
      () => props.areaList,
      () => setAreaCode(state.data.areaCode)
    );

    watch(
      () => props.addressInfo,
      (value) => {
        state.data = {
          ...defaultData,
          ...value,
        };
        setAreaCode(value.areaCode);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return () => {
      const { data, errorInfo } = state;
      const { disableArea } = props;

      return (
        <div class={bem()}>
          <div class={bem('fields')}>
            <Field
              v-model={data.name}
              clearable
              label={t('name')}
              placeholder={t('namePlaceholder')}
              errorMessage={errorInfo.name}
              onFocus={() => onFocus('name')}
            />
            <Field
              v-model={data.tel}
              clearable
              type="tel"
              label={t('tel')}
              maxlength={props.telMaxlength}
              placeholder={t('telPlaceholder')}
              errorMessage={errorInfo.tel}
              onFocus={() => onFocus('tel')}
            />
            <Field
              v-show={props.showArea}
              readonly
              label={t('area')}
              clickable={!disableArea}
              rightIcon={!disableArea ? 'arrow' : undefined}
              modelValue={areaText.value}
              placeholder={props.areaPlaceholder || t('areaPlaceholder')}
              errorMessage={errorInfo.areaCode}
              onFocus={() => onFocus('areaCode')}
              onClick={() => {
                emit('click-area');
                state.showAreaPopup = !disableArea;
              }}
            />
            <AddressEditDetail
              show={props.showDetail}
              value={data.addressDetail}
              focused={state.detailFocused}
              detailRows={props.detailRows}
              errorMessage={errorInfo.addressDetail}
              searchResult={props.searchResult}
              detailMaxlength={props.detailMaxlength}
              showSearchResult={props.showSearchResult}
              onBlur={onDetailBlur}
              onFocus={() => onFocus('addressDetail')}
              onInput={onChangeDetail}
              onSelect-search={(event: Event) => emit('select-search', event)}
            />
            {props.showPostal && (
              <Field
                v-show={!hideBottomFields.value}
                v-model={data.postalCode}
                type="tel"
                maxlength="6"
                label={t('postal')}
                placeholder={t('postal')}
                errorMessage={errorInfo.postalCode}
                onFocus={() => onFocus('postalCode')}
              />
            )}
            {slots.default?.()}
          </div>
          {renderSetDefaultCell()}
          <div v-show={!hideBottomFields.value} class={bem('buttons')}>
            <Button
              block
              round
              loading={props.isSaving}
              type="danger"
              text={props.saveButtonText || t('save')}
              onClick={onSave}
            />
            {props.showDelete && (
              <Button
                block
                round
                loading={props.isDeleting}
                text={props.deleteButtonText || t('delete')}
                onClick={onDelete}
              />
            )}
          </div>
          <Popup
            v-model={[state.showAreaPopup, 'show']}
            round
            teleport="body"
            position="bottom"
            lazyRender={false}
          >
            <Area
              ref={areaRef}
              value={data.areaCode}
              loading={!areaListLoaded.value}
              areaList={props.areaList}
              columnsPlaceholder={props.areaColumnsPlaceholder}
              onConfirm={onAreaConfirm}
              onCancel={() => {
                state.showAreaPopup = false;
              }}
            />
          </Popup>
        </div>
      );
    };
  },
});
