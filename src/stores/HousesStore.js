import {defineStore} from "pinia";

export const useHousesStore = defineStore("houses", {
    state: () => {
        return {
            houses: []
        }
    },
    getters: {
        getHouses() {
            return this.houses;
        },
    },
    actions: {
        setHouses(houses) {
            this.houses = houses;
        },
    },
});