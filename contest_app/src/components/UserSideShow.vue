<template>
  <div class="userInfo">
    <div class="user">
      <img src="../assets/images/myAvatar.jpg" alt="" />
      <div class="author">
        <span
          style="
            color: #fff;
            background-color: #399;
            padding: 3px 8px;
            border-radius: 10px;
          "
          >作者</span
        >
        张斐
      </div>
    </div>
    <div class="sentence">
      这是一个分享生活，保留青春痕迹的站点，作为即将毕业的大学生，未来充满了未知与希望，让我们燃烧着青春的余热，拥抱生活。
    </div>
    <div class="aboutLink">
      <div class="qq">
        <img src="../assets/images/qq.png" alt="" />
      </div>
      <div class="weixin">
        <img src="../assets/images/weixin.png" alt="" />
      </div>
      <div
        class="github"
        @click="toOther('https://github.com/vitalboyzf?tab=repositories')"
      >
        <img src="../assets/images/github.png" alt="" />
      </div>
      <div class="weibo" @click="toOther('https://weibo.com/')">
        <img src="../assets/images/weibo.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.userInfo {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(230, 0, 0, 0.5), -2px -2px 2px #f90;
  box-sizing: border-box;
  margin-right: 40px;
  flex-basis: 300px;
  transition: all 0.7s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .user {
    text-align: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: transform 0.3s;
      &:hover {
        transform: rotate(360deg);
      }
    }
    .author {
      color: #f4f;
      font-weight: border;
    }
  }
  .sentence {
    margin-top: 20px;
    color: #aaa;
  }
  .aboutLink {
    display: flex;
    margin-top: 20px;
    justify-content: space-evenly;
    background-color: #ccc;
    padding: 3px 8px;
    position: relative;

    img {
      width: 30px;
      height: 30px;
    }
    .qq {
      position: relative;
      &::after {
        content: "";
        display: block;
        width: 100px;
        height: 100px;
        background: url("../assets/images/qqerweima.jpg") no-repeat;
        background-size: cover;
        left: -30px;
        top: -101px;
        position: absolute;
        display: none;
      }
      &:hover {
        &::after {
          display: block;
        }
      }
    }
    .weixin {
      position: relative;
      &::after {
        content: "";
        display: block;
        width: 100px;
        height: 100px;
        background: url("../assets/images/weixinerweima.jpg") no-repeat;
        background-size: cover;
        left: -40px;
        top: -101px;
        position: absolute;
        display: none;
      }
      &:hover {
        &::after {
          display: block;
        }
      }
    }
  }
}
</style>