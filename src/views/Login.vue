<template>
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
        :rules="[{ required: true, message: '请填写登录码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loginCode: "",
    };
  },
  methods: {
    async onSubmit() {
      var md5 = require("js-md5");
      const formData = new FormData();
      formData.append("username", md5(this.username));
      formData.append("password", md5(this.password));
      formData.append("loginCode", md5(this.loginCode));
      this.axios
        .post("/login", formData)
        .then((result) => {
          console.info(result);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>
