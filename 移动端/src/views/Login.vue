<template>
  <div class="wrap">
    <div class="title">账号密码登录</div>
    <div class="infor">推荐使用<a href="#">快速安全登录</a>,防止盗号。</div>
    <form action="" method="post" id="form">
      <input
        type="text"
        class="input"
        v-model="userName"
        autocomplete="userName"
        placeholder="请输入用户名"
      />
      <input
        type="password"
        class="input"
        v-model="password"
        placeholder="请输入密码"
        autocomplete="current-password"
      />
      <button type="button" id="btn" @click="login">登 录</button>
    </form>
    <div class="register">
      <span>没有账号 <i class="to-regist" @click="toRegist">去注册</i></span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { login as loginServer } from "../service/user.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const userNameRef = ref("");
    const passwordRef = ref("");
    async function login() {
      try {
        const result = await loginServer(userNameRef.value, passwordRef.value);
        if (result) {
          router.push("/person");
        } else {
          console.log("失败");
        }
      } catch (error) {
        console.log(error);
      }
    }
    function toRegist() {
      router.push("/register");
    }
    return {
      userName: userNameRef,
      password: passwordRef,
      login,
      toRegist,
    };
  },
};
</script>

<style lang="less" scoped>
.wrap {
  padding-top: 40px;
  box-sizing: border-box;
  height: 91vh;
  border: solid rgb(238, 238, 238) 2px;
  background-color: white;

  .title {
    margin-top: 6px;
    margin-bottom: 16px;
    font-size: 30px;
    color: rgb(51, 51, 51);
    text-align: center; /*居中*/
  }
  .infor {
    text-align: center;
    color: #666;
    font-size: 16px;
    margin-bottom: 36px;
  }
  #form {
    text-align: center;
    height: 150px;
    width: 272px;
    margin: 0px auto;
    .input {
      height: 38px;
      width: 268px;
      box-sizing: border-box;
      font-size: 16px;
      padding: 10px;
      padding-right: 0px;
      margin-bottom: 17px;
      border-radius: 3px;
      border: solid rgb(214, 214, 21) 1px;
    }
    #btn {
      border-radius: 3px;
      height: 37px;
      width: 258px;
      padding: 1px 7px 2px 7px;
      box-sizing: content-box;
      border: none;
      background-color: rgb(136, 210, 48);
      color: white;
      font-size: 17px;
    }
  }
  .register {
    font-size: 20px;
    margin-top: 20px;
    text-align: right;
    margin-right: 60px;
    color: #333;
    .to-regist {
      color: rgb(0, 0, 238);
    }
  }
}
</style>