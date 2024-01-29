import {defineStore} from "pinia";

export const useHouseDetailsStore = defineStore("houseDetails", {
    state: () => ({
        houseDetails: {},
    }),
    getters: {
        getHouseDetails() {
            return this.houseDetails;
        },
    },
    actions: {
        setHouseDetails(details) {
            this.houseDetails = details;
        },
    },
});