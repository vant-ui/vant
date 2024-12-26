<script setup lang="ts">
import { ref } from 'vue';
import WithPopup from './WithPopup.vue';
import WithPopupHorizontal from './WithPopupHorizontal.vue';
import VanPicker, {
  PickerChangeEventParams,
  PickerConfirmEventParams,
} from '..';
import {
  dateColumns,
  basicColumns,
  cascadeColumns,
  disabledColumns,
  customKeyColumns,
} from './data';
import VanEmpty from '../../empty';
import { showToast } from '../../toast';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    cascade: '级联选择',
    modelValue: '双向绑定',
    showToolbar: '展示顶部栏',
    dateColumns: dateColumns['zh-CN'],
    basicColumns: basicColumns['zh-CN'],
    defaultIndex: '默认选中项',
    disableOption: '禁用选项',
    cascadeColumns: cascadeColumns['zh-CN'],
    disabledColumns: disabledColumns['zh-CN'],
    multipleColumns: '多列选择',
    customChildrenKey: '自定义 Columns 结构',
    customChildrenColumns: customKeyColumns['zh-CN'],
    emptyDescription: '暂无数据',
    toastContent: (value: string) => `当前值：${value}`,
  },
  'en-US': {
    cascade: 'Cascade',
    modelValue: 'v-model',
    showToolbar: 'Show Toolbar',
    dateColumns: dateColumns['en-US'],
    basicColumns: basicColumns['en-US'],
    defaultIndex: 'Default Index',
    disableOption: 'Disable Option',
    cascadeColumns: cascadeColumns['en-US'],
    disabledColumns: disabledColumns['en-US'],
    multipleColumns: 'Multiple Columns',
    customChildrenKey: 'Custom Columns Fields',
    customChildrenColumns: customKeyColumns['en-US'],
    emptyDescription: 'No data',
    toastContent: (value: string) => `Value: ${value}`,
  },
});

const customFieldName = {
  text: 'cityName',
  value: 'cityName',
  children: 'cities',
};

const selectedValues = ref(['Wenzhou']);

const onChange1 = ({ selectedValues }: PickerChangeEventParams) => {
  showToast(t('toastContent', selectedValues.join(',')));
};

const onConfirm = ({ selectedValues }: PickerConfirmEventParams) => {
  showToast(t('toastContent', selectedValues.join(',')));
};

const onCancel = () => showToast(t('cancel'));
</script>

<template>
  <demo-block card :title="t('basicUsage')">
    <van-picker
      :title="t('title')"
      :columns="t('basicColumns')"
      @change="onChange1"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </demo-block>

  <WithPopup />

  <demo-block card :title="t('modelValue')">
    <van-picker
      v-model="selectedValues"
      :title="t('title')"
      :columns="t('basicColumns')"
    />
  </demo-block>

  <demo-block card :title="t('multipleColumns')">
    <van-picker
      :title="t('title')"
      :columns="t('dateColumns')"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </demo-block>

  <demo-block card :title="t('cascade')">
    <van-picker :title="t('title')" :columns="t('cascadeColumns')" />
  </demo-block>

  <demo-block card :title="t('disableOption')">
    <van-picker :title="t('title')" :columns="t('disabledColumns')" />
  </demo-block>

  <demo-block card :title="t('loadingStatus')">
    <van-picker loading :title="t('title')" />
  </demo-block>

  <demo-block card :title="t('emptyStatus')">
    <van-picker :title="t('title')">
      <template #empty>
        <van-empty
          image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
          image-size="80"
          :description="t('emptyDescription')"
        />
      </template>
    </van-picker>
  </demo-block>

  <demo-block card :title="t('customChildrenKey')">
    <van-picker
      :title="t('title')"
      :columns="t('customChildrenColumns')"
      :columns-field-names="customFieldName"
    />
  </demo-block>

  <WithPopupHorizontal />
</template>
