<template>
  <van-nav-bar
    title="标题"
    :left-text="showLeft ? '返回' : ''"
    right-text="按钮"
    :left-arrow="showLeft"
    @click-left="$router.go(-1)"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: ["showLeft"],
  methods: {
    onClickRight() {
      console.info("onClickRight");
    },
  },
};
</script>

<style></style>
