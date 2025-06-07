import { createRouter, createWebHistory } from "vue-router";

import AboutView from "@/views/AboutView.vue";
import HomeView from "@/views/HomeView.vue";
import KeyGeneratorView from "@/views/KeyGeneratorView.vue";
import TimerView from "@/views/TimerView.vue";
import TimerMenuView from "@/views/TimerMenuView.vue";
import WatchList from "@/views/WatchList.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
    },
    {
        path: "/key-generator",
        name: "key-generator",
        component: KeyGeneratorView,
    },
    {
        path: "/timer",
        name: "timer-menu",
        component: TimerMenuView,
    },
    {
        path: "/timer/:time",
        name: "timer",
        component: TimerView,
    },
    {
        path: "/kijklijst",
        name: "kijklijst",
        component: WatchList,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

/**
 * Since this is a SPA, directly going to a url would not work, when
 * the site is published on github pages. Instead github pages would throw a 404 error.
 * This then displays the 404.html in the public directory. This file redirects to the index
 * page with a string query. This string query is catched by vue and the user is redirected
 * accordingly.
 */
router.beforeEach((to) => {
    if (to.query.redirect) {
        let direct = to.query.redirect.replace(" ", "%20");
        router.replace(direct);
        return;
    }
});

export default router;
