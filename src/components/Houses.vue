<script>
export default {
  name: "Houses",
  data() {
    return {
      apiKey: 'mcji3Z6OkCvB_u2RpyVD5FHf1aQbzX-n',
      houses: [],
      filteredHouses: [],
      searching: false,
      searchInput: "",
      searchResults: 0,
      sortBy: null,
      sortDesc: true,
    };
  },
  mounted() {
    this.fetchHouses();
  },
  methods: {
    // Get all the houses from the API and fill in the "houses" array with the information
    async fetchHouses() {
      try {
        const response = await fetch("https://api.intern.d-tt.nl/api/houses", {
          method: 'GET',
          headers: {
            'X-Api-Key': this.apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch houses');
        }

        this.houses = await response.json();
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


  },
};
</script>

<template>
  <div class="subcomponent">
    <!--    Houses header and "create new" button-->
    <div class="houses-top-container">
      <p class="black-text-m h1">Houses</p>
      <router-link to="/add-listing">
        <button class="button white-text-m">
          <img class="white-plus" src="@/assets/images/ic_plus_white@3x.png" alt="white plus">
          CREATE NEW
        </button>
      </router-link>
    </div>
    <!--    Search bar and sort buttons-->
    <div id="search-sort-container">
      <div id="search-container">
        <img id="search-logo" src="@/assets/images/ic_search@3x.png">
        <input class="house-search" type="text" placeholder="Search for a house" v-model="searchInput"
               @input="handleSearch">
        <button v-if="searching" class="clear-search-button" @click="clearSearch"><img class="small-icon"
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
    <p class="black-text-m h2" v-if="searching"> {{ this.searchResults }} results found</p>
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
            <p class="black-text-m h2">{{ house.location.street }} {{ house.location.houseNumber }}</p>
            <p class="black-text-m">€ {{ house.price }}</p>
            <p class="black-text-m gray normal">{{ house.location.zip }} {{ house.location.city }}</p>
            <div class="house-icon-container">
              <img class="small-icon" src="@/assets/images/ic_bed@3x.png">
              <p class="small-icon-text black-text-m normal">{{ house.rooms.bedrooms }}</p>
              <img class="small-icon" src="@/assets/images/ic_bath@3x.png">
              <p class="small-icon-text black-text-m normal">{{ house.rooms.bathrooms }}</p>
              <img class="small-icon" src="@/assets/images/ic_size@3x.png">
              <p class="small-icon-text black-text-m normal">{{ house.size }} m2</p>
            </div>
          </div>
        </div>
        <div class="edit-delete-container">
          <button class="edit-delete-button">
            <img class="small-icon" src="@/assets/images/ic_edit@3x.png">
          </button>
          <button class="edit-delete-button">
            <img class="small-icon" src="@/assets/images/ic_delete@3x.png">
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
</style>