<template>
  <div class="swiper" />
</template>

<script>
import { onMounted } from "vue";
import SwiperClass from "../jslib/swiper";
export default {
  setup() {
    onMounted(() => {
      const pictures = [
        {
          src: require("../assets/images/shiguang.jpeg"),
          href: "https://www.taobao.com",
        },
        {
          src: require("../assets/images/qinggan.jpeg"),
          href: "https://www.taobao.com",
        },
        {
          src: require("../assets/images/weilai.jpeg"),
          href: "https://www.tina.com",
        },
        {
          src: require("../assets/images/lizhi.jpeg"),
          href: "https://www.tina.com",
        },
        {
          src: require("../assets/images/ganwu.jpeg"),
          href: "https://www.tina.com",
        },
        {
          src: require("../assets/images/xinqing.jpeg"),
          href: "https://www.tina.com",
        },
      ];
      new SwiperClass({
        pictures,
        imgWidth: 800,
        container: document.querySelector(".swiper"),
        isAutoPlay: true,
        autoTimerDuration: 3000,
        onClick(property, self) {
          console.log(property);
        },
      });
    });
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/swiper.css);
.swiper {
  border-radius: 20px;
}
</style>