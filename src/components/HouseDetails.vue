<script>
import {useAPIkeyStore} from "@/stores/apiKey.js";
import {fetchHouseDetails, deleteHouse} from "@/services/apiService.js";
import DeletionConfirmation from "@/components/DeletionConfirmation.vue";
import {router} from "@/index.js";

export default {
  name: "HouseDetails",
  components: {DeletionConfirmation},
  data() {
    return {
      apiKey: useAPIkeyStore().APIkey,

      house: {},
      street: "",
      streetNumber: 0,
      addition: "",
      zip: "",
      city: "",
      price: 0,
      size: "",
      constructionYear: 0,
      bedrooms: 0,
      bathrooms: 0,
      hasGarage: false,
      description: "",
      madeByMe: false,

      isDeletionConfirmationVisisble: false,
    };
  },
  mounted() {
    this.fetchHouseDetails();
  },
  methods: {
    async fetchHouseDetails() {
      try {
        const houseId = this.$route.params.id;
        this.house = await fetchHouseDetails(this.apiKey, houseId);

        // Set house properties
        this.street = this.house.location.street;
        this.streetNumber = this.house.location.houseNumber;
        this.addition = this.house.location.houseNumberAddition;
        this.zip = this.house.location.zip;
        this.city = this.house.location.city;
        this.price = this.house.price;
        this.size = this.house.size;
        this.constructionYear = this.house.constructionYear;
        this.bedrooms = this.house.rooms.bedrooms;
        this.bathrooms = this.house.rooms.bathrooms;
        this.hasGarage = this.house.hasGarage;
        this.description = this.house.description;
        this.madeByMe = this.house.madeByMe;

      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    },
    async deleteHouse() {
      try {
        const houseId = this.$route.params.id;
        await deleteHouse(this.apiKey, houseId);

        // Redirect user back to houses after deletion
        await router.push({name: 'Houses'});
      } catch (error) {
        console.error('Error deleting house:', error);
      }
    },
  },
};
</script>

<template>
  <div class="subcomponent">
    <router-link to="/houses">
      <div class="back-to-container">
        <img class="small-icon back-icon" src="@/assets/images/ic_back_grey@3x.png">
        <p class="black-text-m">Back to overview</p>
      </div>
    </router-link>

    <div class="house-details-container">
      <img class="house-full-image" :src="house.image">
      <div class="house-details-info">
        <div class="row" id="street-delete-edit">
          <p class="black-text-m h1 no-margin">{{ this.street }} {{ this.streetNumber }}{{ this.addition }}</p>
          <div class="edit-delete-container">
            <router-link :to="'/edit-listing/' + house.id">
              <button v-if="madeByMe" class="edit-delete-button">
                <img class="small-icon" src="@/assets/images/ic_edit@3x.png">
              </button>
            </router-link>
            <button v-if="madeByMe" @click="isDeletionConfirmationVisisble = true" class="edit-delete-button">
              <img class="small-icon" src="@/assets/images/ic_delete@3x.png">
            </button>
          </div>
        </div>
        <div class="row" id="detail-padding">
          <img class="detail-icon" src="@/assets/images/ic_location@3x.png">
          <p class="black-text-m dark-gray">{{ this.zip }} {{ this.city }}</p>
        </div>
        <div class="row-container">
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_price@3x.png">
            <p class="black-text-m dark-gray">€ {{ this.price }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_size@3x.png">
            <p class="black-text-m dark-gray">{{ this.size }} m2</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_construction_date@3x.png">
            <p class="black-text-m dark-gray">Built in {{ this.constructionYear }}</p>
          </div>
        </div>
        <div class="row-container second-row-container">
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_bed@3x.png">
            <p class="black-text-m dark-gray">{{ this.bedrooms }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_bath@3x.png">
            <p class="black-text-m dark-gray">{{ this.bathrooms }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_garage@3x.png">
            <p class="black-text-m dark-gray">{{ this.hasGarage ? 'Yes' : 'No' }}</p>
          </div>
        </div>
        <p class="black-text-m dark-gray"> {{ this.description }} </p>
      </div>
    </div>
  </div>
  <deletion-confirmation v-if="isDeletionConfirmationVisisble" @close="isDeletionConfirmationVisisble = false"
                         @confirm="deleteHouse"></deletion-confirmation>
</template>

<style scoped>
/*Resizing of back to button to not cover the width of the component*/
a {
  display: inline-block;
}

</style>