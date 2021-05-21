<template>
  <nav class="nav">
    <ul>
      <li>
        <router-link to="/">
          <i class="iconfont icon-shouye"></i>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/amusement">
          <i class="iconfont icon-gerenzhongxin-zhong"></i>
          <span>娱乐</span>
        </router-link>
      </li>
      <li>
        <router-link to="/person">
          <i class="iconfont icon-c-shenghuo3"></i>
          <span>个人中心</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.nav {
  width: 100%;
  background-color: #eee;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ddd;
}
.nav ul {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
li {
  list-style: none;
}
li a {
  font-size: 12px;
  color: #333;
  line-height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul span {
  font-size: 12px;
}
</style>