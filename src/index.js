import {createRouter, createWebHistory} from "vue-router";
import About from "@/components/About.vue";
import Houses from "@/components/Houses.vue";
import HouseDetails from "@/components/HouseDetails.vue";
import NewListing from "@/components/NewListing.vue";
import EditListing from "@/components/EditListing.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/houses", component: Houses, name: "Houses"},
        {path: "/houses/house-details/:id", component: HouseDetails, name: "House details"},
        {path: "/houses/edit-listing/:id", component: EditListing, name: "Edit listing"},
        {path: "/houses/add-listing", component: NewListing, name: "Add listing"},
        {path: "/about", component: About, name: "About"},
        // Redirect all other paths to /houses
        {path: "/:pathMatch(.*)*", redirect: "/houses"}
    ],
});
