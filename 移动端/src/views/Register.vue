<template>
  <div class="wrap">
    <div class="title">
      <span
        @click="toLogin"
        class="to-login iconfont icon-fanhui-copy-copy"
      ></span>
      注册账号
    </div>
    <div class="infor">推荐使用<a href="#">快速安全登录</a>,防止盗号。</div>
    <form action="" method="post" id="form">
      <input
        autocomplete="userName"
        type="text"
        class="input"
        v-model="userName"
        placeholder="请输入用户名"
      />
      <input
        autocomplete="current-password"
        type="password"
        class="input"
        v-model="password"
        placeholder="请输入密码"
      />
      <input
        autocomplete="current-password"
        type="password"
        class="input"
        v-model="confirmPwd"
        placeholder="请确认密码"
      />
      <button type="button" id="btn" @click="submit">注 册</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { register as registServer } from "../service/user.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const userNameRef = ref("");
    const passwordRef = ref("");
    const confirmPasswordRef = ref("");
    function verifyUserNameAndPwd(userName, password, confirmPwd) {
      if (!userName.value || !password.value) {
        console.log("用户名密码不可为空！");
        return;
      }
      if (password.value !== confirmPwd.value) {
        console.log("两次密码输入不一致");
        return false;
      }

      if (
        !/.{1,10}/g.test(userNameRef.value) ||
        !/.{6,16}/g.test(password.value)
      ) {
        console.log("用户名密码不合法");
        return false;
      }
      return true;
    }
    async function submit() {
      const isValid = verifyUserNameAndPwd(
        userNameRef,
        passwordRef,
        confirmPasswordRef
      );
      if (!isValid) {
        console.log(
          "用户名或者密码不合法，请输入1-10个字符用户名，6-15个字符的密码"
        );
        return;
      }
      const result = await registServer(userNameRef.value, passwordRef.value);
      if (result && result.status === 200) {
        console.log(result.message);
        router.push("/login");
      }
    }
    function toLogin() {
      router.push("/login");
    }
    return {
      userName: userNameRef,
      password: passwordRef,
      confirmPwd: confirmPasswordRef,
      toLogin,
      submit
    };
  }
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
    position: relative;
    .to-login {
      position: absolute;
      //   top: -5px;
      font-size: 20px;
      left: 40px;
      background-color: #f90;
      border-radius: 10px;
      padding: 10px;
      color: #fff;
    }
  }
  .infor {
    text-align: center;
    color: #666;
    font-size: 16px;
    margin-bottom: 36px;
  }
  #form {
    text-align: center;
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