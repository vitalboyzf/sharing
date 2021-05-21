<template>
  <div class="loading">
    <div class="wrapper">
      <p>加载中</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@keyframes run {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  75% {
    transform: translate(-50%, -50%) rotate(270deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(115, 205, 228, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  .wrapper {
    border-radius: 50%;
    border: 1px solid #f00;
    box-shadow: 2px 1px 2px #034, -2px -1px 2px #0435, inset 4px 3px 5px #904,
      inset 20px 20px 20px #f40, inset -6px -4px #045;
    width: 100px;
    height: 100px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: run 3s infinite linear;
  }
  p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: rgb(122, 184, 209);
    font-weight: bolder;
    font-size: 16px;
    text-align: center;
    line-height: 100px;
    padding: 0;
    margin: 0;
    &:nth-of-type(2) {
      top: 60%;
      margin-top: 50px;
      font-size: 16px;
    }
  }
}
</style>