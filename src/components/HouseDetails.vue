<script>
export default {
  name: "HouseDetails",
  data() {
    return {
      apiKey: 'mcji3Z6OkCvB_u2RpyVD5FHf1aQbzX-n',
      house: {},
      street: "",
      streetNumber: 0,
      zip: "",
      city: "",
      price: 0,
      size: "",
      constructionYear: 0,
      bedrooms: 0,
      bathrooms: 0,
      hasGarage: false,
      description: "",
    };
  },
  mounted() {
    this.fetchHouseDetails();
  },
  methods: {
    async fetchHouseDetails() {
      try {
        const houseId = this.$route.params.id;
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': this.apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch house details');
        }

        // Needed to specify the position of house in the array since the GET request returns a single object array instead of only the object.
        this.house = (await response.json())[0];

        // Set house properties
        this.street = this.house.location.street;
        this.streetNumber = this.house.location.houseNumber;
        this.zip = this.house.location.zip;
        this.city = this.house.location.city;
        this.price = this.house.price;
        this.size = this.house.size;
        this.constructionYear = this.house.constructionYear;
        this.bedrooms = this.house.rooms.bedrooms;
        this.bathrooms = this.house.rooms.bathrooms;
        this.hasGarage = this.house.hasGarage;
        this.description = this.house.description;
      } catch (error) {
        console.error('Error fetching house details:', error);
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
          <p class="black-text-m h1 no-margin">{{this.street}} {{ this.streetNumber }}</p>
          <div class="edit-delete-container">
            <button class="edit-delete-button">
              <img class="small-icon" src="@/assets/images/ic_edit@3x.png">
            </button>
            <button class="edit-delete-button">
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
</template>

<style scoped>
/*Resizing of back to button to not cover the width of the component*/
a{
  display: inline-block;
}

</style>