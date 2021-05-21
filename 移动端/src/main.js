import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import Vant from "vant";
import "vant/lib/index.css";
import "./assets/font/iconfont.css";
import "./assets/reset.css";
import 'default-passive-events'

createApp(App).use(store).use(router).use(Vant).mount("#app");