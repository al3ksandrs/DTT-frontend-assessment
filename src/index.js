import {createRouter, createWebHashHistory} from "vue-router";
import About from "@/components/About.vue";
import Houses from "@/components/Houses.vue";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/houses", component: Houses, name: "Houses"},
        { path: "/about", component: About, name: "About"},
        // Redirect all other paths to /houses
        { path: "/:pathMatch(.*)*", redirect: "/houses" }
    ],
});
