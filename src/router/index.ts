import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/auth/Login.vue";
import Nprogress from "nprogress";
import Admin from "../pages/admin/AdminPage.vue";
import Requester from "../pages/requester/RequesterPage.vue";
import Approver from "../pages/approver/ApproverPage.vue";
import Purchaser from "../pages/purchaser/PurchaserPage.vue";
import Register from "../pages/auth/Register.vue";
import AdminAssign from "../pages/admin/AdminAssignPage.vue";
import Profile from "../pages/auth/Profile.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin
    },
    {
        path: "/admin/:uuid",
        name: "AdminAssign",
        component: AdminAssign
    },
    {
        path: "/requester",
        name: "Requester",
        component: Requester
    },
    {
        path: "/approver",
        name: "Approver",
        component: Approver
    },
    {
        path: "/purchaser",
        name: "Purchaser",
        component: Purchaser
    }
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