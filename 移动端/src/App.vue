<template>
  <nav-bar></nav-bar>
  <router-view />
</template>
<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },
  setup() {}
};
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
