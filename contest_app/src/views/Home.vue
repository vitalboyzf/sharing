<template>
  <div class="home">
    <div
      class="wrapper"
      :class="{ init: isInit, 'wrapper-active': isWrapperActiver }"
    >
      <ul class="content">
        <li
          class="item"
          v-for="(imgInfo, i) in imgs"
          :key="imgInfo.id"
          @click="handleItemClick(i)"
          :class="{ active: curIndex === i }"
        >
          <div class="inner">
            <div class="bg"></div>
            <div class="title">
              <h2>{{ imgInfo.title }}</h2>
            </div>
            <div class="direction">
              <div class="header">{{ imgInfo.content }}</div>
              <div @click="closePicture" class="close"></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="callMe">
      <p>人生的每一个阶段的记忆，都是我们最宝贵的东西</p>
      <p>我希望，我的回忆中有你们！</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Home",
  setup() {
    const imgsRef = ref([
      {
        id: 1,
        title: "心情",
        content:
          "风有归宿，鸟有暖窝。每一天，总是重复着昨日的事。思绪如风缠绵，夏日与秋日匆匆流过。稍带一丝遗憾。留给我们的总是如此凄凉。漫步越过流沙飞尘。拽住风的尾巴，使劲的把自己推向前，以寻求梦一样的明天。",
      },
      {
        id: 2,
        title: "情感",
        content:
          "人生真的是一场漫旅，苦乐随时同行。收起任性倔强，学着体贴担当，少猜疑多交流，少埋怨多倾听，学会静守关爱，珍惜眼前幸福。牢记往日的刻骨铭心，怀念那些情不自禁，无论是精彩还是平淡，无论是贫穷还是富有，都风雨同舟，都不离不弃。弱水三千取一瓢，且以深情共余生。",
      },
      {
        id: 3,
        title: "时光",
        content:
          "不停留，带着回忆向前看，不管是爱宠、恋人还是家人朋友，就让离别，成为一种开始。我会想念你，就像是又到毕业季，我又开始想念艳阳下你的轮廓，你们的身影，我们的欢笑",
      },
      {
        id: 4,
        title: "励志",
        content:
          "有梦就要去勇敢的追，不要放弃，每一种常试都是你应该经历的，那些心情，感受也是你应该体验的，我不知道这个世界上有多少人在为了自己的梦想而努力，但只要你在努力你就会收获到别人没有的东西。勇敢的去追吧，梦想看似遥远其实只在你一点一滴的努力中积淀。",
      },
      {
        id: 5,
        title: "感悟",
        content:
          "两个人非常渴，喝同一口井水时，一个用金杯，一个用泥杯。前者觉得自己富贵，后者认为自己贫贱；前者得到了虚荣的满足，后者陷入无谓的烦恼中。他们都忘了，自己需要的是“水”，而不是“盛水的杯”。我们在生活中也是如此，不要被自己不需要的东西所烦恼。",
      },
      {
        id: 6,
        title: "未来",
        content: `现在的未来，是可以把握的。不要否认，付出永远是和回报成正比的。那种不劳而获或者怀才不遇的，我都将它归为实力不够，我不会怨天尤人，该做的，是继续努力，更加努力。`,
      },
    ]);
    const isInitRef = ref(true);
    const isActiveRef = ref(false);
    const isWrapperActiverRef = ref(false);
    const curIndexRef = ref(-1);
    setTimeout(function () {
      isInitRef.value = false;
    }, 200);
    function handleItemClick(i) {
      // isActiveRef
      curIndexRef.value = i;
      isWrapperActiverRef.value = true;
    }
    function closePicture($event) {
      $event.stopPropagation();
      curIndexRef.value = -1;
      isWrapperActiverRef.value = false;
    }
    return {
      isInit: isInitRef,
      isActive: isActiveRef,
      isWrapperActiver: isWrapperActiverRef,
      handleItemClick,
      closePicture,
      imgs: imgsRef,
      curIndex: curIndexRef,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 500px;
  .wrapper {
    &.wrapper-active {
      .content {
        .item {
          transition: height 0.5s linear, width 0.5s linear 0.5s;
          &.active {
            width: 100%;
          }
        }
      }
    }
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 70%;
      height: 80%;
    }
    .item {
      width: 16%;
      height: 100%;
      background: #333;
      border-radius: 20px;
      overflow: hidden;
      transition: height 0.5s linear 0.5s, width 0.5s linear;
    }
  }
  .wrapper-active .item:not(.active) {
    height: 0%;
    width: 0%;
  }
  .item .inner {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: transform 0.5s linear;
  }
  .item:nth-of-type(1) .inner {
    transition-delay: 0.1s;
  }
  .item:nth-of-type(2) .inner {
    transition-delay: 0.2s;
  }
  .item:nth-of-type(3) .inner {
    transition-delay: 0.3s;
  }
  .item:nth-of-type(4) .inner {
    transition-delay: 0.4s;
  }
  .item:nth-of-type(5) .inner {
    transition-delay: 0.5s;
  }
  .item:nth-of-type(6) .inner {
    transition-delay: 0.6s;
  }
  .init .item .inner {
    transform: translate3d(0, 100%, 0);
  }
  .item .inner .bg {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
  }
  .item:nth-of-type(1) .inner .bg {
    background-image: url("../assets/images/xinqing.jpeg");
  }
  .item:nth-of-type(2) .inner .bg {
    background-image: url("../assets/images/qinggan.jpeg");
  }
  .item:nth-of-type(3) .inner .bg {
    background-image: url("../assets/images/shiguang.jpeg");
  }
  .item:nth-of-type(4) .inner .bg {
    background-image: url("../assets/images/lizhi.jpeg");
  }
  .item:nth-of-type(5) .inner .bg {
    background-image: url("../assets/images/ganwu.jpeg");
  }
  .item:nth-of-type(6) .inner .bg {
    background-image: url("../assets/images/xuexi.jpeg");
  }
  .item .inner .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    /* 关闭图片时，文字1s后显示 */
    transition: opacity 0.2s linear 1s;
  }
  .item .inner .title h2 {
    font-size: 16px;
    color: #fff;
  }
  /* 点开图片时，文字立即隐藏 */
  .wrapper-active .item .title {
    opacity: 0;
    transition: opacity 0.2s linear;
  }
  .item:hover .title h2 {
    font-size: 24px;
    transition: font-size 0.2s linear;
  }
  .item:hover .bg {
    opacity: 1;
    transition: opacity 0.2s linear;
  }
  .item .inner .direction {
    position: absolute;
    top: 50px;
    width: 100%;
    height: 30px;
    opacity: 0;
  }
  /* 点开图片时，bird close 1s后显示 */
  .wrapper-active .item .inner .direction {
    opacity: 1;
    transition: opacity 0.5s linear 1s;
  }
  .item .inner .direction .header {
    position: absolute;
    width: 80%;
    left: 50px;
    top: 50%;
    // transform: translateY(-50%);
    color: #fff;
    font-size: 24px;
    text-shadow: 1px 1px 1px #fff, -1px -1px 2px rgb(17, 109, 214);
    background-color: rgba(0, 0, 0, 0.3);
    padding: 10px;
    backdrop-filter: blur(10px);
    border-radius: 10px;
  }
  .item .inner .direction .close {
    position: absolute;
    right: 50px;
    color: #fff;
    width: 30px;
    height: 30px;
    background-color: rgb(45, 78, 189);
    border:2px solid #f00;
    border-radius: 50%;
    padding: 5px;
 
  }
  .active .inner .direction .close {
    transform: rotate(360deg);
    transition: transform 0.5s linear 1s;
  }
  .close:before,
  .close:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 30px;
    height: 4px;
    margin-left: -2px;
    background: #fff;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  .callMe {
    text-align: center;
    p {
      text-shadow: 1px 1px 1px #fff, 0px 0px 1px #f00;
    }
  }
}
</style>
