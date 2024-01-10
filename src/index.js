import {createRouter, createWebHashHistory} from "vue-router";
import About from "@/components/About.vue";
import Houses from "@/components/Houses.vue";
import HouseDetails from "@/components/HouseDetails.vue";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/houses", component: Houses, name: "Houses"},
        { path: "/about", component: About, name: "About"},
        { path: "/house-details/:id", component: HouseDetails, name:"House Details" },
        // Redirect all other paths to /houses
        { path: "/:pathMatch(.*)*", redirect: "/houses" }
    ],
});
