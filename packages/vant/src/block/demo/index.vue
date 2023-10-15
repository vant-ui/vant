<script setup lang="ts">
import VanBlock from '..';
import VanButton from '../../button';
import { useTranslate } from '../../../docs/site';

const t = useTranslate({
  'zh-CN': {
    base: '基础用法',
    card: '卡片模式',
    default: '默认按钮',
    primary: '主要按钮',
    success: '成功按钮',
  },
  'en-US': {
    base: 'Base',
    card: 'Card',
    default: 'Default',
    primary: 'Primary',
    success: 'Success',
  },
});
</script>

<template>
  <van-block :title="t('base')">
    <van-button type="default">{{ t('default') }}</van-button>
    <van-button type="primary">{{ t('primary') }}</van-button>
    <van-button type="success">{{ t('success') }}</van-button>
  </van-block>

  <van-block :title="t('card')" card>
    <van-button type="default">{{ t('default') }}</van-button>
    <van-button type="primary">{{ t('primary') }}</van-button>
    <van-button type="success">{{ t('success') }}</van-button>
  </van-block>
</template>

<style lang="less">
.van-block {
  .van-button {
    &--normal:not(:last-child) {
      margin-right: var(--van-padding-md);
    }
  }
}
</style>
