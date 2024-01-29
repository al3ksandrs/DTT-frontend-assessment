<script>
import {fetchHouseDetails, deleteHouse} from "@/services/apiService.js";
import DeletionConfirmation from "@/components/DeletionConfirmation.vue";
import {router} from "@/index.js";
import {useHouseDetailsStore} from "@/stores/HouseDetailsStore.js";

export default {
  name: "HouseDetails",
  components: {DeletionConfirmation},
  data() {
    return {
      isDeletionConfirmationVisisble: false,
      isLoading: true,
    };
  },
  computed: {
    // Get the house's details from the store.
    houseDetails() {
      return useHouseDetailsStore().getHouseDetails;
    }
  },
  mounted() {
    this.fetchHouseDetails();
  },
  methods: {
    async fetchHouseDetails() {
      try {
        const houseId = this.$route.params.id;
        let details = await fetchHouseDetails(houseId);

        // Set the house's details in the store.
        useHouseDetailsStore().setHouseDetails(details);
      } catch (error) {
        console.error('Error fetching house details:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteHouse() {
      try {
        const houseId = this.$route.params.id;
        await deleteHouse(houseId);

        // Redirect user back to houses after deletion
        await router.push({name: 'Houses'});
      } catch (error) {
        console.error('Error deleting house:', error);
      }
    },
    // Format raw price to a more readable one
    formatPrice(price) {
      let formattedPrice = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });

      return formattedPrice.replace(/,/g, '.');
    },
  },
};
</script>

<template>
  <div class="subcomponent" v-if="!isLoading">
    <router-link :to='{name: "Houses"}'>
      <div class="back-to-container">
        <img class="small-icon back-icon" src="@/assets/images/ic_back_grey@3x.png">
        <p class="black-text-m">Back to overview</p>
      </div>
    </router-link>
    <router-link :to='{name: "Houses"}'>
      <div class="back-edit-delete-mobile-container">
        <button class="mobile-icon-container">
          <img class="small-icon mobile-icon" src="@/assets/images/ic_back_white@3x.png">
        </button>
        <div v-if="houseDetails.madeByMe" class="edit-delete-container-mobile">
          <router-link :to="{ name: 'Edit listing', params: { id: houseDetails.id } }">
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
      <img class="house-full-image" :src="houseDetails.image">
      <div class="house-details-info">
        <div class="row" id="street-delete-edit">
          <p class="black-text-m h1 no-margin mobile-location">{{ houseDetails.location.street }}
            {{ houseDetails.location.houseNumber }}{{ houseDetails.location.houseNumberAddition }}</p>
          <div class="edit-delete-container">
            <router-link :to="{ name: 'Edit listing', params: { id: houseDetails.id } }">
              <button v-if="houseDetails.madeByMe" class="edit-delete-button">
                <img class="small-icon" src="@/assets/images/ic_edit@3x.png">
              </button>
            </router-link>
            <button v-if="houseDetails.madeByMe" @click="isDeletionConfirmationVisisble = true"
                    class="edit-delete-button">
              <img class="small-icon" src="@/assets/images/ic_delete@3x.png">
            </button>
          </div>
        </div>
        <div class="row" id="detail-padding">
          <img class="detail-icon" src="@/assets/images/ic_location@3x.png">
          <p class="black-text-m dark-gray inline-padding">{{ houseDetails.location.zip }} {{
              houseDetails.location.city
            }}</p>
        </div>
        <div class="row-container">
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_price@3x.png">
            <p class="black-text-m dark-gray inline-padding details-price">{{ formatPrice(houseDetails.price) }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_size@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ houseDetails.size }} m2</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_construction_date@3x.png">
            <p class="black-text-m dark-gray inline-padding">Built in {{ houseDetails.constructionYear }}</p>
          </div>
        </div>
        <div class="row-container second-row-container">
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_bed@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ houseDetails.rooms.bedrooms }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_bath@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ houseDetails.rooms.bathrooms }}</p>
          </div>
          <div class="row">
            <img class="detail-icon" src="@/assets/images/ic_garage@3x.png">
            <p class="black-text-m dark-gray inline-padding">{{ houseDetails.hasGarage ? 'Yes' : 'No' }}</p>
          </div>
        </div>
        <p class="black-text-m dark-gray"> {{ houseDetails.description }} </p>
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

.details-price {
  display: flex;
  align-items: center;
}

.mobile-icon {
  height: 2em;
  width: 2em;
}

@media only screen and (max-width: 940px) {
  .house-full-image {
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