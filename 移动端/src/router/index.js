import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
    path: "/",
    component: Home

},
    {
        path: "/amusement",
        component: () => import("../views/Amusement.vue")
    },
    {
        path: "/person",
        component: () => import("../views/Person.vue")
    },
    {
        path: "/login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/register",
        component: () => import("../views/Register.vue")
    },
    {
        path: "/editUserInfo",
        component: () => import(  "../views/EditUserInfo.vue")
    },
    {
        path: "/momentDetail",
        component: () => import(  "../views/MomentDetail.vue")
    },
    {
        path: "/editMoment",
        component: () => import(  "../views/EditMoment.vue")
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    linkActiveClass: "active",
    routes
});


export default router;