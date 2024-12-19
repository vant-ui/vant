<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <van-collapse v-model="active1">
        <van-collapse-item :title="t('title') + 1">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 2">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 3">
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>

    <demo-block :title="t('accordion')">
      <van-collapse v-model="active2" accordion>
        <van-collapse-item :title="t('title') + 1">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 2">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 3">
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>

    <demo-block :title="t('disabled')">
      <van-collapse v-model="active3">
        <van-collapse-item :title="t('title') + 1">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 2" disabled>
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 3" disabled>
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>

    <demo-block :title="t('titleSlot')">
      <van-collapse v-model="active4">
        <van-collapse-item>
          <template #title>
            {{ t('title') + 1 }}<van-icon name="question-o" />
          </template>
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item
          :title="t('title') + 2"
          :value="t('content')"
          icon="shop-o"
        >
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>

    <demo-block :title="t('expandInViewport')">
      <van-collapse v-model="active5" accordion>
        <van-collapse-item
          v-for="(item, index) in new Array(10)"
          :key="index"
          :title="`标题${index}`"
          :name="index"
          expand-in-viewport
        >
          <p v-for="(item, i) in new Array(20 - index * 2)" :key="i">
            内容 {{ i }}
          </p>
        </van-collapse-item>
      </van-collapse>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      accordion: '手风琴',
      titleSlot: '自定义标题内容',
      text: '代码是写出来给人看的，附带能在机器上运行',
      expandInViewport:
        '手风琴模式下，保证展开动画期间被展开节点不会被挤出视口范围',
    },
    'en-US': {
      accordion: 'Accordion',
      titleSlot: 'Custom title',
      text: 'Content',
      expandInViewport:
        'In accordion mode, ensure that during the expansion animation, the nodes being expanded do not get pushed out of the viewport range.',
    },
  },

  data() {
    return {
      active1: [0],
      active2: 0,
      active3: [],
      active4: [],
      active5: 0,
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-collapse {
  .van-icon-question-o {
    margin-left: 5px;
    color: @blue;
    font-size: 15px;
    vertical-align: -3px;
  }
}
</style>
