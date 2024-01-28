import {defineStore} from "pinia";

export const useHousesStore = defineStore("houses", {
    state: () => {
        return {
            houses: []
        }
    },
    actions: {
        setHouses(houses) {
            this.houses = houses;
        },
    },
});