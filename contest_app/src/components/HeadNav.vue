<template>
  <div class="navWrapper">
    <nav class="nav">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
        <span class="title">星空动态</span>
      </div>
      <div class="main">
        <router-link to="/">
          <span>首页</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </router-link>
        <router-link to="/moment">
          <span>动态</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </router-link>
        <router-link to="/labelMoment">
          <span>标签分类</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </router-link>
        <router-link to="/person">
          <span>个人中心</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span
        ></router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@keyframes run1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes run2 {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
@keyframes run3 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes run4 {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
.navWrapper {
  height: 80px;
  //   background: linear-gradient(
  //     to right,
  //     rgb(6, 13, 25),
  //     rgb(24, 2, 2),
  //     rgb(6, 13, 25)
  //   );
  background-color: rgba(6, 13, 25, 0.3);
  .nav {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    .logo {
      position: relative;
      overflow: hidden;

      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .title {
        margin-left: 10px;
        font-size: 30px;
        vertical-align: middle;
        color: rgb(35, 120, 218);
        text-shadow: 1px 1px 2px #240, -1px -1px 2px #430;
      }
    }
    .main {
      margin-left: 500px;
      width: 400px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      a {
        color: #aaa;
        display: inline-block;
        min-width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
        text-decoration: none;
        position: relative;
        overflow: hidden;

        // &::after {
        //   content: "";
        //   display: block;
        //   width: 60%;
        //   height: 2px;
        //   background-color: #fff;
        //   position: absolute;
        //   bottom: 20px;
        //   left: 50%;
        //   transform: translateX(-50%);
        //   opacity: 0;
        //   transition: opacity 0.5s;
        // }
        &:hover {
          transform: scale(1.1);
        }
        &.router-link-active {
          span {
            &:nth-of-type(1) {
              padding: 3px 8px;
            }
            &:nth-of-type(2) {
              position: absolute;
              top: 0;
              left: 0;
              // width: 300px;
              width: 100%;
              height: 1px;
              background: linear-gradient(to right, transparent, #cc4e1d);
              animation: run1 1s linear infinite;
            }
            &:nth-of-type(3) {
              position: absolute;
              right: 0;
              top: 0;
              // width: 300px;
              width: 1px;
              height: 100%;
              background: linear-gradient(to bottom, transparent, #1779ff);
              animation: run2 1s linear infinite;
            }
            &:nth-of-type(4) {
              position: absolute;
              bottom: 0;
              right: 0;
              // width: 300px;
              width: 100%;
              height: 1px;
              background: linear-gradient(to left, transparent, #cc4e1d);
              animation: run3 1s linear infinite;
            }
            &:nth-of-type(5) {
              position: absolute;
              bottom: 0;
              left: 0;
              // width: 300px;
              width: 1px;
              height: 100%;
              background: linear-gradient(to top, transparent, #1779ff);
              animation: run4 1s linear infinite;
            }
          }
          &::after {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>