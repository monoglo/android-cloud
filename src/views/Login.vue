<template>
  <div id="test">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="loginCode"
          name="登录码"
          label="登录码"
          placeholder="登录码"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
  <van-button type="primary" text="显示遮罩层" @click="onClick" />
  <van-button type="primary" text="打开浏览器" @click="onClickOpenBrowser" />
  <van-button type="primary" text="锁定横屏" @click="lockPortrait" />
  <van-button type="primary" text="锁定竖屏" @click="lockLandscape" />
  <van-button type="primary" text="解除锁定" @click="unlock" />
  <van-overlay :show="show" @click="show = false">
    <div class="wrapper">
      <div class="block">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </div>
  </van-overlay>
</template>

<script>
// import { nextTick } from "vue";
import { Browser } from "@capacitor/browser";
import { ElLoading } from "element-plus";
import "element-plus/dist/index.css";
export default {
  data() {
    return {
      username: "",
      password: "",
      loginCode: "",
      show: false,
      loadingInstance: null,
    };
  },
  methods: {
    async onSubmit() {
      var md5 = require("js-md5");
      const formData = new FormData();
      formData.append(
        "username",
        md5((this.loginCode || "") + this.username + "{0}")
      );
      formData.append("password", md5(this.password));
      const loadingInstance = ElLoading.service({
        target: document.getElementById("test"),
      });
      this.axios
        .post("/login", formData)
        .then(({ data }) => {
          if (data.code == 0) {
            this.$store.commit("setToken", data.data.token);
            this.$store.commit("setUser", data.data.user);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          loadingInstance.close();
        });
    },
    // onClick() {
    //   console.info(loadingInstance);
    //   nextTick(() => {
    //     // Loading should be closed asynchronously
    //     console.info(loadingInstance);
    //   });
    // },
    async onClickOpenBrowser() {
      await Browser.open({ url: "https://baidu.com/" });
    },
    lockPortrait() {
      window.screen.orientation.lock("portrait");
    },
    lockLandscape() {
      window.screen.orientation.lock("landscape");
    },
    unlock() {
      window.screen.orientation.unlock();
    },
  },
};
</script>
<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
