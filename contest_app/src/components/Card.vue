<template>
  <div class="cardContainer" :style="{ '--bgc': bgColor }">
    <div class="box">
      <span style="background: red"></span>
      <div class="content">
        <h2>{{ title }}</h2>
        <p>
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//   linear-gradient(315deg, #03a9f4, #ff0058);
//   linear-gradient(315deg, #4dff03, #00d0ff);

export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require:true,
    },
    bgColor: {
      type: String,
      default: "linear-gradient(315deg, #4dff03, #00d0ff)",
    },
  },
};
</script>

<style lang="less" scoped>
.cardContainer {
  @keyframes animate {
    0%,
    100% {
      transform: translateY(10px);
    }

    50% {
      transform: translateY(-10px);
    }
  }
  width: 350px;
  .box {
    position: relative;
    width: 320px;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 30px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50px;
      width: 50%;
      height: 100%;
      background-color: #fff;
      border-radius: 8px;
      transform: skewX(15deg);
      transition: 0.5s;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 50px;
      width: 50%;
      height: 100%;
      background-color: #fff;
      border-radius: 8px;
      transform: skewX(15deg);
      filter: blur(30px);
      transition: 0.5s;
    }
    &:nth-child(1):before {
      content: "";
      position: absolute;
      top: 0;
      left: 50px;
      width: 50%;
      height: 100%;
      background-color: #fff;
      border-radius: 8px;
      transform: skewX(-15deg);
      transition: 0.5s;
    }
    &:nth-child(1):after {
      content: "";
      position: absolute;
      top: 0;
      left: 50px;
      width: 50%;
      height: 100%;
      background-color: #fff;
      border-radius: 8px;
      transform: skewX(-15deg);
      filter: blur(30px);
      transition: 0.5s;
    }
    &:hover:before,
    &:hover:after {
      transform: skewX(0deg);
      left: 20px;
      width: calc(100% - 90px);
    }
    &:nth-child(1)::before,
    &:nth-child(1):after {
      background-image: var(--bgc);
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.1);
      opacity: 0;
      transition: 0.5s;
      animation: animate 2s ease-in-out infinite;
      animation-delay: -1s;
    }
    span {
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 20;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.1);
        opacity: 0;
        transition: 0.5s;
        animation: animate 2s ease-in-out infinite;
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.1);
        opacity: 0;
        transition: 0.5s;
        animation: animate 2s ease-in-out infinite;
        animation-delay: -1s;
      }
    }
    &:hover {
      span {
        &::before {
          top: -50px;
          left: 50px;
          width: 100px;
          height: 100px;
          opacity: 1;
        }
        &::after {
          bottom: -50px;
          right: 50px;
          width: 100px;
          height: 100px;
          opacity: 1;
        }
      }
      .content {
        left: -25px;
        padding: 60px 40px;
      }
    }
    .content {
      z-index: 1;
      position: relative;
      left: 0;
      color: #fff;
      padding: 20px 40px;
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      transition: 0.5s;
      h2 {
        font-size: 1.4em;
        color: #fff;
        margin-bottom: 10px;
      }
      p {
        font-size: 1.1em;
        margin-bottom: 10px;
        line-height: 1.2em;
        color:rgb(157, 214, 236);
      }
      a {
        color: #111;
        background-color: #fff;
        text-decoration: none;
        padding: 5px;
        border-radius: 4px;
        font-weight: 700;
      }
    }
  }
}
</style>