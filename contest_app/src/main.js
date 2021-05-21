import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./jslib/magicCube.js";
import "./assets/font/iconfont.css";
import "./jslib/bg1";
// router.beforeResolve((to, from, next) => {
//     console.log(to, from);
//     next();
// });
createApp(App).use(router).use(store).mount("#app");