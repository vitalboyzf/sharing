import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import Home from "../views/Home.vue";
const routes = [{
    path: "/",
    name: "Home",
    exist: true,
    component: Home
  },
  {
    path: "/moment",
    name: "Moment",
    component: () => import("../views/Moment.vue")
  },
  {
    path: "/labelMoment",
    name: "LabelMoment",
    component: () => import("../views/LabelMoment.vue")
  },
  {
    path: "/person",
    name: "Person",
    component: () => import("../views/Person.vue")
  },
  {
    path: "/editMoment",
    name: "EditMoment",
    component: () => import("../views/EditMoment.vue")
  },
  {
    path: "/momentDetail",
    name: "MomentDetail",
    component: () => import("../views/MomentDetail.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;