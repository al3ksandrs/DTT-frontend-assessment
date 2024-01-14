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
    <router-link to="/houses">
      <div class="back-edit-delete-mobile-container">
        <button class="mobile-icon-container">
          <img class="small-icon mobile-icon" src="@/assets/images/ic_back_white@3x.png">
        </button>
        <div v-if="madeByMe" class="edit-delete-container-mobile">
          <router-link :to="'/edit-listing/' + house.id">
            <button class="mobile-icon-container">
              <img class="small-icon mobile-icon" src="@/assets/images/ic_edit_white@3x.png">
            </button>
          </router-link>
          <router-link to="">
            <button class="mobile-icon-container" @click="isDeletionConfirmationVisisble = true">
              <img class="small-icon mobile-icon" src="@/assets/images/ic_delete_white@3x.png">
            </button>
          </router-link>
        </div>
      </div>
    </router-link>

    <div class="house-details-container">
      <img class="house-full-image" :src="house.image">
      <div class="house-details-info">
        <div class="row" id="street-delete-edit">
          <p class="black-text-m h1 no-margin mobile-location">{{ this.street }} {{ this.streetNumber }}{{
              this.addition
            }}</p>
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
          <p class="black-text-m dark-gray inline-padding">{{ this.zip }} {{ this.city }}</p>
        </div>
        <div class="row-container">
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_price@3x.png">
            <p class="black-text-m dark-gray inline-padding">€ {{ this.price }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_size@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ this.size }} m2</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_construction_date@3x.png">
            <p class="black-text-m dark-gray inline-padding">Built in {{ this.constructionYear }}</p>
          </div>
        </div>
        <div class="row-container second-row-container">
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_bed@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ this.bedrooms }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_bath@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ this.bathrooms }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_garage@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ this.hasGarage ? 'Yes' : 'No' }}</p>
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

.mobile-icon {
  height: 2em;
  width: 2em;
}

@media only screen and (max-width: 940px){
  .house-full-image{
    width: 100%;
  }
}

@media only screen and (max-width: 425px) {
  a {
    display: block;
  }

  .black-text-m {
    font-size: 14px;
  }

  .mobile-location {
    font-size: 22px;
  }

  .back-to-container {
    display: none;
  }

  .subcomponent {
    margin: 0;
    padding: 0;
  }

  .house-full-image {
    width: 100%;
  }

  .house-details-info {
    border-radius: 25px 25px 0 0;
    position: relative;
    bottom: 2em;
  }

  .detail-icon {
    height: 1em;
    width: 1em;
  }

  .row-container {
    width: fit-content;
  }

  .edit-delete-container {
    display: none;
  }

  .second-row-container {
    padding-bottom: 1em;
  }

  .inline-padding {
    padding-left: 0.5em;
    padding-right: 1em;
  }
}

</style>