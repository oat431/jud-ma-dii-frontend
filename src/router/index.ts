import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Nprogress from "nprogress";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(() => {
    Nprogress.start();
});

router.afterEach(() => {
    Nprogress.done();
});


export default router;