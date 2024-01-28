<script>
import {useAPIkeyStore} from "@/stores/apiKey.js";
import {useHousesStore} from "@/stores/HousesStore.js";
import {deleteHouse, fetchHouses} from "@/services/apiService.js";
import {router} from "@/index.js";
import DeletionConfirmation from "@/components/DeletionConfirmation.vue";

export default {
  name: "Houses",
  components: {DeletionConfirmation},
  data() {
    return {
      apiKey: useAPIkeyStore().APIkey,
      filteredHouses: [],
      searching: false,
      searchInput: "",
      searchResults: 0,
      sortBy: null,
      sortDesc: true,

      houseToDeleteId: null,
      isDeletionConfirmationVisible: false,
    };
  },
  computed: {
    houses() {
      return useHousesStore().houses;
    }
  },
  mounted() {
    this.fetchHouses();
  },
  methods: {
    // Get all the houses from the API and fill in the "houses" array with the information
    async fetchHouses() {
      try {
        const houses = await fetchHouses(this.apiKey);
        useHousesStore().setHouses(houses);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    },
    // Filter houses based on street, city, size, price, bedrooms and bathrooms
    handleSearch() {
      this.searching = true;
      this.filteredHouses = this.houses.filter((house) => {
        let searchRegex = new RegExp(this.searchInput, "i");
        return (
            searchRegex.test(house.location.street) ||
            searchRegex.test(house.location.city) ||
            searchRegex.test(house.size) ||
            searchRegex.test(house.price) ||
            searchRegex.test(house.rooms.bedroom) ||
            searchRegex.test(house.rooms.bathroom)
        );
      });

      // Set search result length
      this.searchResults = this.filteredHouses.length;
    },
    // Clear search bar and set search result amount back to 0
    clearSearch() {
      this.searchInput = "";
      this.searchResults = 0;
      this.searching = false;
    },
    // Sorting of houses based on price and size, also works if user has searched something. (sorting order is descending by default)
    sortHouses() {
      if (!this.searching) {
        if (this.sortBy === "price") {
          this.houses.sort((a, b) => (this.sortDesc ? a.price - b.price : b.price - a.price));
        } else if (this.sortBy === "size") {
          this.houses.sort((a, b) => (this.sortDesc ? a.size - b.size : b.size - a.size));
        }
      } else {
        // Sort filtered houses
        if (this.sortBy === "price") {
          this.filteredHouses.sort((a, b) => (this.sortDesc ? a.price - b.price : b.price - a.price));
        } else if (this.sortBy === "size") {
          this.filteredHouses.sort((a, b) => (this.sortDesc ? a.size - b.size : b.size - a.size));
        }
      }

      // Change sorting order for the next click
      this.sortDesc = !this.sortDesc;
    },
    // Open the deletion confirmation and pass the listing ID to houseToDeleteID.
    openDeletionConfirmation(houseId) {
      this.houseToDeleteId = houseId;
      this.isDeletionConfirmationVisible = true;
    },
    // Deletion of a listing
    async deleteHouse(houseId) {
      try {
        await deleteHouse(this.apiKey, houseId);

        // Refresh list after a deletion
        await this.fetchHouses()
      } catch (error) {
        console.error('Error deleting house:', error);
      }
    }
  },
};
</script>

<template>
  <div class="subcomponent">
    <!--    Houses header and "create new" button-->
    <div class="houses-top-container">
      <p class="black-text-m h1">Houses</p>
      <router-link to="/add-listing">
        <button class="button white-text-m pc-button">
          <img class="white-plus" src="@/assets/images/ic_plus_white@3x.png" alt="New listing">
          CREATE NEW
        </button>
      </router-link>
    </div>
    <router-link to="/add-listing">
      <button class="mobile-button">
        <img class="gray-plus" src="@/assets/images/ic_plus_grey@3x.png" alt="New listing">
      </button>
    </router-link>
    <!--    Search bar and sort buttons-->
    <div id="search-sort-container">
      <div id="search-container">
        <img id="search-logo" src="@/assets/images/ic_search@3x.png">
        <input class="house-search" type="text" placeholder="Search for a house" v-model="searchInput"
               @input="handleSearch">
        <button v-if="searching" class="clear-search-button" @click="clearSearch"><img
            class="small-icon clear-search-icon"
            src="@/assets/images/ic_clear@3x.png">
        </button>
      </div>
      <div id="price-size-container">
        <button
            id="price-button"
            class="button sort-button white-text-m not-active-button"
            :class="{ 'active-button': sortBy === 'price' }"
            @click="sortBy = 'price'; sortHouses()"
        >
          Price
        </button>
        <button
            id="size-button"
            class="button sort-button white-text-m not-active-button"
            :class="{ 'active-button': sortBy === 'size' }"
            @click="sortBy = 'size'; sortHouses()"
        >
          Size
        </button>
      </div>
    </div>
    <p class="black-text-m h2 result-text" v-if="searching"> {{ this.searchResults }} results found</p>
    <!--    House container, initially loads houses but if user starts searching it loads filteredHouses-->
    <router-link
        v-for="house in (searching ? filteredHouses : houses)"
        :to="'/house-details/' + house.id"
        :key="house.id"
    >
      <div class="house-container">
        <div class="house-container-left">
          <img class="house-image" :src="house.image">
          <div class="house-details">
            <p class="black-text-m h2">{{ house.location.street }} {{
                house.location.houseNumber
              }}{{ house.location.houseNumberAddition }}</p>
            <p class="black-text-m house-detail-text house-price">€ {{ house.price }}</p>
            <p class="black-text-m gray normal house-detail-text">{{ house.location.zip }} {{ house.location.city }}</p>
            <div class="house-icon-container">
              <img class="small-icon" src="@/assets/images/ic_bed@3x.png">
              <p class="small-icon-text black-text-m normal house-detail-text">{{ house.rooms.bedrooms }}</p>
              <img class="small-icon" src="@/assets/images/ic_bath@3x.png">
              <p class="small-icon-text black-text-m normal house-detail-text">{{ house.rooms.bathrooms }}</p>
              <img class="small-icon" src="@/assets/images/ic_size@3x.png">
              <p class="small-icon-text black-text-m normal house-detail-text">{{ house.size }} m2</p>
            </div>
          </div>
        </div>
        <div class="edit-delete-container">
          <router-link :to="'/edit-listing/' + house.id">
            <button v-if="house.madeByMe" class="edit-delete-button">
              <img class="small-icon edit-delete-icon" src="@/assets/images/ic_edit@3x.png">
            </button>
          </router-link>
          <router-link to="">
            <button @click="openDeletionConfirmation(house.id)" v-if="house.madeByMe" class="edit-delete-button">
              <img class="small-icon edit-delete-icon" src="@/assets/images/ic_delete@3x.png">
            </button>

          </router-link>
        </div>
      </div>
    </router-link>
    <deletion-confirmation v-if="isDeletionConfirmationVisible" @close="isDeletionConfirmationVisible = false"
                           @confirm="deleteHouse(houseToDeleteId)"></deletion-confirmation>
  </div>
</template>

<style scoped>

a {
  align-self: center;
}

</style>