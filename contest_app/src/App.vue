<template>
  <div id="nav">
    <head-nav />
  </div>
  <router-view />
</template>

<style lang="less">
// magicCube的 css
@import url("./assets/css/cube.css");
body {
  margin: 0;
  font-size: 16px;
}

.bgCanvas {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
:root {
  --swiper-theme-color: #007aff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#nav {
  a {
    &.router-link-exact-active {
      font-size: 16px;
      font-weight: 700;
      color: #00b3ff;
      text-decoration: none;
      transition: 0.2s;
      letter-spacing: 0.2em;
      text-shadow: 0 0 10px #00b344;
    }
  }
}
</style>
<script>
import HeadNav from "./components/HeadNav";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    HeadNav,
  },
  setup() {
    const store = useStore();
    // 发送请求获取数据
    onBeforeMount(() => {
      store.dispatch("getUserInfo");
      store.dispatch("getMoment", { offset: 0, limit: 8 });
      store.dispatch("getLabel", { offset: 0, limit: 15 });
      store.dispatch("setHotMoment");
    });
  },
};
</script>

