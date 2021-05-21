<template>
  <div class="container" :style="{ '--bgc': bgColor }">
    <div class="card">
      <span></span>
      <div class="content">
        <h2>{{ title }}</h2>
        <p>
          {{ content }}
        </p>
        <!-- <a href="#">Read More</a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    bgColor: {
      type: String,
      /*  linear-gradient(315deg, #4dff03, #00d0ff) */
      /*  linear-gradient(45deg, #ffbc00, #ff0058) */
      default: "linear-gradient(315deg, #03a9f4, #ff0058)",
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
  flex-wrap: wrap;
}
.container .card {
  position: relative;
  width: 320px;
  height: 400px;
  color: #fff;
  background-color: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 30px;
  transition: 0.5s;
}
.container .card:hover {
  transform: translateY(-25px);
}
.container .card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ffbc00, #ff0058);
}
.container .card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bgc);
  filter: blur(30px);
}
.container .card span {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  z-index: 1;
}
.container .card span::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}
.container .card .content {
  z-index: 2;
  position: relative;
  padding: 20px 40px;
  color:#aaa;
}
.container .card .content h2 {
  font-size: 1.5em;
  color: #fff;
  margin-bottom: 10px;
}
.container .card .content p {
  font-size: 1.1em;
  line-height: 1.4em;
  margin-bottom: 10px;
    color:#aaa;
}
.container .card .content a {
  display: inline-block;
  text-decoration: none;
  color: #000;
  background-color: #fff;
  padding: 7px;
  font-weight: 600;
  border-radius: 5px;
}
</style>