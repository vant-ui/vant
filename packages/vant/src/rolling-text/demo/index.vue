<script setup lang="ts">
import VanRollingText, { type RollingTextInstance } from '..';
import RollingTextGroup from '../../rolling-text-group';
import Button from '../../button';
import { ref } from 'vue';
import { useTranslate } from '../../../docs/site';
import VanGrid from '../../grid';
import VanGridItem from '../../grid-item';

const t = useTranslate({
  'zh-CN': {
    direction: '设置翻滚方向',
    stopOrder: '设置各数位停止顺序',
    rollDown: '向下翻滚',
    rollUp: '向上翻滚',
    stopFrom: '从个位停止',
    manualControl: '手动控制',
    customStyle: '自定义样式',
    noNumberType: '翻转非数字内容',
    start: '开始',
    reset: '重置',
    useGroup: '使用翻滚文本组',
  },
  'en-US': {
    direction: 'Set Rolling Direction',
    stopOrder: 'Set Stop Order',
    rollDown: 'Roll Down',
    rollUp: 'Roll Up',
    stopFrom: 'Right Side Stop First',
    manualControl: 'Manual Control',
    customStyle: 'Custom Style',
    noNumberType: 'Roll Non-numeric Text',
    start: 'Start',
    reset: 'Reset',
    useGroup: 'Use Group',
  },
});

const isStart = ref(false);
const isStart2 = ref(false);
const isStart3 = ref(false);
const isStart4 = ref(false);
const isStartUseGroup = ref(false);

const isStartNoNumberType = ref(false);
const textList = ref([
  'aaaaa',
  'bbbbb',
  'ccccc',
  'ddddd',
  'eeeee',
  'fffff',
  'ggggg',
]);

const rollingTextRef = ref<RollingTextInstance>();
const start = () => {
  rollingTextRef.value?.start();
};
const reset = () => {
  rollingTextRef.value?.reset();
};
</script>

<template>
  <demo-block :title="t('basicUsage')">
    <div style="">
      <VanRollingText :start-num="0" :target-num="123" :auto-start="isStart" />
      <div style="margin-top: 10px">
        <Button @click="() => (isStart = true)" type="primary">{{
          t('rollDown')
        }}</Button>
      </div>
    </div>
  </demo-block>

  <demo-block :title="t('direction')">
    <div>
      <VanRollingText
        :start-num="0"
        :target-num="432"
        :auto-start="isStart2"
        direction="up"
      />
      <div style="margin-top: 10px">
        <Button @click="() => (isStart2 = true)" type="primary">{{
          t('rollUp')
        }}</Button>
      </div>
    </div>
  </demo-block>

  <demo-block :title="t('stopOrder')">
    <div>
      <VanRollingText
        :start-num="0"
        :target-num="54321"
        :auto-start="isStart3"
        stop-order="rtl"
      />
      <div style="margin-top: 10px">
        <Button @click="() => (isStart3 = true)" type="primary">{{
          t('stopFrom')
        }}</Button>
      </div>
    </div>
  </demo-block>

  <demo-block :title="t('noNumberType')">
    <div>
      <VanRollingText
        :text-list="textList"
        :duration="1"
        :auto-start="isStartNoNumberType"
      />
      <div style="margin-top: 10px">
        <Button @click="() => (isStartNoNumberType = true)" type="primary">{{
          t('start')
        }}</Button>
      </div>
    </div>
  </demo-block>

  <demo-block :title="t('customStyle')">
    <div>
      <VanRollingText
        class="my-rolling-text"
        :start-num="12345"
        :target-num="54321"
        :auto-start="isStart4"
        :height="54"
      />
    </div>
  </demo-block>

  <demo-block :title="t('useGroup')">
    <div>
      <RollingTextGroup :auto-start="isStartUseGroup">
        <span style="display: inline">-¥</span>
        <VanRollingText :target-num="1" />
        <VanRollingText :target-num="9" />
        <span style="display: inline">.</span>
        <VanRollingText :target-num="9" />
        <VanRollingText :target-num="8" />
      </RollingTextGroup>
      <div style="margin-top: 10px">
        <Button @click="() => (isStartUseGroup = true)" type="primary">{{
          t('start')
        }}</Button>
      </div>
    </div>
  </demo-block>

  <demo-block :title="t('manualControl')">
    <div>
      <VanRollingText
        class="my-rolling-text"
        ref="rollingTextRef"
        :start-num="0"
        :target-num="54321"
        :auto-start="false"
        :height="54"
      />
      <van-grid clickable :column-num="2" style="margin-top: 10px">
        <van-grid-item icon="play-circle-o" :text="t('start')" @click="start" />
        <van-grid-item icon="replay" :text="t('reset')" @click="reset" />
      </van-grid>
    </div>
  </demo-block>
</template>

<style lang="less">
.demo-rolling-text {
  .van-button {
    margin-left: var(--van-padding-md);
  }

  .van-rolling-text-group,
  .van-rolling-text {
    margin-left: var(--van-padding-md);
  }

  .van-rolling-text-group {
    .van-rolling-text {
      margin-left: 0;
    }
  }

  .my-rolling-text {
    --van-rolling-text-background: #1989fa;
    --van-rolling-text-color: white;
    --van-rolling-text-font-size: 24px;
    --van-rolling-text-gap: 6px;
    --van-rolling-text-item-border-radius: 5px;
    --van-rolling-text-item-width: 40px;
  }
}
</style>
