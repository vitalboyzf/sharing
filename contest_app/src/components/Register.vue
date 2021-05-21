<template>
  <div class="modal">
    <div class="register">
      <div class="title">用户注册</div>
      <i @click="toLogin" class="back"></i>
      <i @click="close" class="close"></i>
      <form class="form">
        <div class="userName">
          <label>
            用户：<input
              type="text"
              placeholder="请输入用户名"
              v-model="formValue.userName"
            />
          </label>
        </div>
        <div class="password">
          <label
            >密码：<input
              type="password"
              placeholder="请输入密码"
              autocomplete="password"
              v-model="formValue.password"
          /></label>
        </div>
        <div class="confirm">
          <label
            >密码：<input
              type="password"
              placeholder="请确认密码"
              autocomplete="confirm"
              v-model="formValue.confirm"
          /></label>
        </div>
        <div class="btn">
          <input class="submit" type="button" value="注册" @click="submit" />
          <input class="reset" type="button" value="重置" @click="reset" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
// import { useRouter } from "vue-router";
import { register } from "../service/user";
import { createStore } from "vuex";
export default {
  setup(props, ctx) {
    const store = createStore();
    const userInfo = store.state.userInfo;
    const formValue = reactive({ userName: "", password: "", confirm: "" });
    function toRegister() {
      ctx.emit("controlModal", "register");
    }
    function close() {
      ctx.emit("controlModal", "close");
    }
    function toLogin() {
      ctx.emit("controlModal", "login");
    }
    async function submit() {
      if (formValue.password !== formValue.confirm) {
        alert("密码不一致");
        return;
      }
      let result = await register(formValue.userName, formValue.password);
      if (result) {
        alert(result.message);
        ctx.emit("controlModal", "login");
      } else {
        alert(
          "注册失败，可能用户名重复！密码长度为6-16位数字字母下划线，用户名为1-10位字符"
        );
      }
    }
    function reset() {
      formValue.userName = "";
      formValue.password = "";
      formValue.confirm = "";
    }
    return {
      toRegister,
      formValue,
      close,
      toLogin,
      submit,
      reset,
      userInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.register {
  position: fixed;
  width: 400px;
  height: 400px;
  background-color: rgb(122, 121, 160);
  box-shadow: 2px 3px 2px #888;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  box-sizing: border-box;
  .close {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 15px;
    height: 15px;
    font-weight: bolder;
    padding: 8px;
    background: #ddd;
    background: url("../assets/images/close.png") no-repeat;
    background-size: cover;
    &:hover {
      cursor: pointer;
    }
  }
  .back {
    position: absolute;
    left: 30px;
    top: 30px;
    width: 15px;
    height: 15px;
    font-weight: bolder;
    padding: 8px;
    background: #ddd;
    background: url("../assets/images/back.png") no-repeat;
    background-size: cover;
  }
  .title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
  }
  .form {
    margin-top: 40px;
    text-align: center;
    font-weight: bold;
    div {
      margin-top: 10px;
      height: 40px;
      input {
        height: 30px;
        border: none;
        padding-left: 10px;
      }
    }
    .btn {
      input {
        width: 80px;
        height: 30px;
        background-color: #f90;
        outline: none;
        color: #fff;
        &.reset {
          margin-left: 20px;
          background-color: #f40;
        }
      }
    }
  }
}
</style>>