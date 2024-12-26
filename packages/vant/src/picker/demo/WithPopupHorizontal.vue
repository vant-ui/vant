<script setup lang="ts">
import { reactive } from 'vue';
import VanPicker from '..';
import VanField from '../../field';
import VanPopup from '../../popup';
import { basicColumns } from './data';
import { useTranslate } from '../../../docs/site';
import type { PickerConfirmEventParams } from '../types';

const t = useTranslate({
  'zh-CN': {
    rotateLeft: '向左旋转',
    rotateRight: '向右旋转',
    withPopup: '旋转后水平滑动',
    chooseCity: '选择城市',
    basicColumns: basicColumns['zh-CN'],
  },
  'en-US': {
    rotateLeft: 'Rotate Left',
    rotateRight: 'Rotate Righ',
    withPopup: 'Slide horizontally after rotation',
    chooseCity: 'Choose City',
    basicColumns: basicColumns['en-US'],
  },
});

type LeftOrRight = 'left' | 'right';
const showPicker = reactive({
  left: false,
  right: false,
});
const fieldValue = reactive({
  left: '',
  right: '',
});

const onClickField = (lor: LeftOrRight) => {
  showPicker[lor] = true;
};
const onCancel = (lor: LeftOrRight) => {
  showPicker[lor] = false;
};
const onConfirm = (
  lor: LeftOrRight,
  { selectedOptions }: PickerConfirmEventParams,
) => {
  showPicker[lor] = false;
  fieldValue[lor] = selectedOptions[0]!.text as string;
};
</script>

<template>
  <demo-block card :title="t('withPopup')">
    <van-field
      v-model="fieldValue.left"
      is-link
      readonly
      :label="t('rotateLeft')"
      :placeholder="t('chooseCity')"
      @click="onClickField('left')"
    />
    <div
      v-show="showPicker.left"
      class="demo-picker__rotate demo-picker__rotate--left"
    >
      <van-popup v-model:show="showPicker.left" round position="bottom">
        <van-picker
          :title="t('title')"
          :columns="t('basicColumns')"
          direction="horizontal"
          @cancel="onCancel('left')"
          @confirm="onConfirm('left', $event)"
        />
      </van-popup>
    </div>

    <van-field
      v-model="fieldValue.right"
      is-link
      readonly
      :label="t('rotateRight')"
      :placeholder="t('chooseCity')"
      @click="onClickField('right')"
    />
    <div
      v-show="showPicker.right"
      class="demo-picker__rotate demo-picker__rotate--right"
    >
      <van-popup v-model:show="showPicker.right" round position="bottom">
        <van-picker
          :title="t('title')"
          :columns="t('basicColumns')"
          direction="horizontal"
          @cancel="onCancel('right')"
          @confirm="onConfirm('right', $event)"
        />
      </van-popup>
    </div>
  </demo-block>
</template>

<style lang="less">
.demo-picker {
  &__rotate {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100vw;
    width: 100vh;
    &--left {
      transform-origin: right top;
      transform: rotate(-90deg) translate(0, -100vh);
    }
    &--right {
      transform-origin: left bottom;
      transform: rotate(90deg) translate(-100vw, 0%);
    }
  }
}
</style>
