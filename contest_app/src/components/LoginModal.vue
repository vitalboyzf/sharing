<template>
  <div class="modalWrapper">
    <div class="loginModal">
      <div class="title">用户登录</div>
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
              v-model="formValue.password"
              placeholder="请输入密码"
              autocomplete="password"
          /></label>
        </div>
        <div class="btn">
          <input class="submit" type="button" value="登录" @click="submit" />
          <input class="reset" type="reset" value="重置" @click="reset" />
        </div>
        <div>
          没有账号，去<span
            style="
              color: #30f;
              display: inline-block;
              transform: scale(1.2);
              margin-left: 10px;
            "
            @click="toRegister"
            >注册</span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { login } from "../service/user";
export default {
  setup(props, ctx) {
    const formValue = reactive({ userName: "", password: "" });
    function toRegister() {
      ctx.emit("controlModal", "register");
    }
    function close() {
      ctx.emit("controlModal", "close");
    }
    async function submit() {
      try {
        const res = await login(formValue.userName, formValue.password);
        if (res.data) {
          alert(res.data);
          ctx.emit("controlModal", "close");
          location.reload();
        } else {
          alert("登录失败");
        }
      } catch (error) {
        alert("登录失败");
      }
    }
    function reset() {
      formValue.userName = "";
      formValue.password = "";
    }
    return {
      toRegister,
      close,
      submit,
      reset,
      formValue,
    };
  },
};
</script>

<style lang="less" scoped>
.modalWrapper {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  .loginModal {
    position: fixed;
    width: 400px;
    height: 300px;
    background-color: rgb(122, 121, 160);
    box-shadow: 2px 3px 2px rgb(136, 136, 136);
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
}
</style>>