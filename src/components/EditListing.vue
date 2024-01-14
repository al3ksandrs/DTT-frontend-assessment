<script>
import {router} from "@/index.js";
import {useAPIkeyStore} from "@/stores/apiKey.js";
import {editHouse, fetchHouseDetails, uploadImage} from "@/services/apiService.js";

export default {
  name: "EditListing",
  data() {
    return {
      apiKey: useAPIkeyStore().APIkey,
      listingID: this.$route.params.id,

      id: null,
      streetName: null,
      houseNumber: null,
      addition: null,
      postalCode: null,
      city: null,
      image: null,
      price: null,
      size: null,
      garage: false,
      bedrooms: null,
      bathrooms: null,
      constructionYear: null,
      description: null,

      imagePreview: null,
      isFormValid: true,
      isShowingPreviewImage: true,
      minConstructionYear: 1950,
      // Current year as max construction year
      maxConstructionYear: new Date().getFullYear(),
    };
  },
  mounted() {
    this.fetchHouseDetails();
  },
  methods: {
    // Fetch house's details
    async fetchHouseDetails() {
      try {
        this.house = await fetchHouseDetails(this.apiKey, this.listingID);

        // Set house properties
        this.id = this.house.id;
        this.streetName = this.house.location.street;
        this.houseNumber = this.house.location.houseNumber;
        this.addition = this.house.location.houseNumberAddition;
        this.postalCode = this.house.location.zip;
        this.city = this.house.location.city;
        this.image = this.house.image;
        this.imagePreview = this.house.image;
        this.price = this.house.price;
        this.size = this.house.size;
        this.constructionYear = this.house.constructionYear;
        this.bedrooms = this.house.rooms.bedrooms;
        this.bathrooms = this.house.rooms.bathrooms;
        this.garage = this.house.hasGarage;
        this.description = this.house.description;

      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    },
    // Fill in the formData and upload the edited house to the backend
    async editHouse() {
      try {
        let formData = new FormData();
        formData.append('price', this.price);
        formData.append('bedrooms', this.bedrooms);
        formData.append('bathrooms', this.bathrooms);
        formData.append('size', this.size);
        formData.append('streetName', this.streetName);
        formData.append('houseNumber', this.houseNumber);
        formData.append('numberAddition', this.addition);
        formData.append('zip', this.postalCode);
        formData.append('city', this.city);
        formData.append('constructionYear', this.constructionYear);
        formData.append('hasGarage', this.garage);
        formData.append('description', this.description);

        // Upload image using the house's id
        await this.uploadImage(this.listingID);
        await editHouse(this.apiKey, this.listingID, formData);

      } catch (error) {
        console.error(error);
      }
    },
    // Upload the image to the new house's ID
    async uploadImage(houseId) {
      try {
        await uploadImage(this.apiKey, houseId, this.image);
      } catch (error) {
        console.error(error);
      }
    },
    // Updating of the image variable and showing of a preview
    handleImageUpload(event) {
      this.image = event.target.files[0];
      this.isShowingPreviewImage = true;

      // Create a FileReader to read the image file
      const reader = new FileReader();

      // Set image preview when image is loaded on reader
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(this.image);
    },
    // Revert image back to null
    revertImageUpload() {
      this.image = null;
      this.isShowingPreviewImage = false;
    },
    // Validation check for the form
    async validationCheck() {
      if (!this.streetName || !this.houseNumber || !this.postalCode ||
          !this.city || !this.price || !this.size ||
          !this.garage || !this.bedrooms || !this.bathrooms ||
          !this.constructionYear || !this.description ||
          this.constructionYear < this.minConstructionYear ||
          this.constructionYear > this.maxConstructionYear ||
          !this.image
      ) {
        this.isFormValid = false
        return
      } else this.isFormValid = true

      // If validation passes the creation of the house proceeds
      await this.editHouse()
    }
  }
}
</script>

<template>
  <div class="subcomponent">
    <router-link :to="'/house-details/' + listingID">
      <div class="back-to-container">
        <img class="small-icon back-icon" src="../assets/images/ic_back_grey@3x.png">
        <p class="black-text-m">Back to detail page</p>
      </div>
    </router-link>
    <p class="black-text-m h1 create-new-listing-text">Edit listing</p>
    <form @submit.prevent="validationCheck">
      <div>
        <p class="black-text-m">Street name*</p>
        <input v-model="streetName" class="long-input" type="text" placeholder="Enter the street name">
      </div>
      <div class="row">
        <div>
          <p class="black-text-m">House number*</p>
          <input v-model="houseNumber" class="short-input" type="text" placeholder="Enter house number">
        </div>
        <div>
          <p class="black-text-m">Addition (optional)</p>
          <input v-model="addition" class="short-input" type="text" placeholder="e.g. A">
        </div>
      </div>
      <div>
        <p class="black-text-m">Postal code*</p>
        <input v-model="postalCode" class="long-input" type="text" placeholder="e.g. 1000 AA">
      </div>
      <div>
        <p class="black-text-m">City*</p>
        <input v-model="city" class="long-input" type="text" placeholder="e.g. Utrecht">
      </div>
      <div>
        <p class="black-text-m">Upload picture (PNG or JPG)*</p>
        <div v-if="!isShowingPreviewImage" class="image-upload-container">
          <input @change="handleImageUpload" type="file" id="image-upload" accept="image/png, image/jpeg" hidden>
          <label for="image-upload" class="image-upload-label">
            <img src="../assets/images/ic_upload@3x.png" id="image-upload-icon">
          </label>
        </div>
        <div class="image-preview-container" v-if="isShowingPreviewImage">
          <img :src=imagePreview class="image-preview">
          <button @click="revertImageUpload" class="small-icon small-icon-container"><img
              src="../assets/images/ic_clear_white@3x.png" class="small-icon"></button>
        </div>
      </div>
      <div>
        <p class="black-text-m">Price*</p>
        <input v-model="price" class="long-input" type="text" placeholder="e.g. €150.000">
      </div>
      <div class="row">
        <div>
          <p class="black-text-m">Size*</p>
          <input v-model="size" class="short-input" type="text" placeholder="e.g. 60m2">
        </div>
        <div>
          <p class="black-text-m">Garage*</p>
          <select v-model="garage">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div>
          <p class="black-text-m">Bedrooms*</p>
          <input v-model="bedrooms" class="short-input" type="text" placeholder="Enter amount">
        </div>
        <div>
          <p class="black-text-m">Bathrooms*</p>
          <input v-model="bathrooms" class="short-input" type="text" placeholder="Enter amount">
        </div>
      </div>
      <div>
        <p class="black-text-m">Construction date*</p>
        <input v-model="constructionYear" class="long-input" type="text" placeholder="e.g. 1990">
      </div>
      <div>
        <p class="black-text-m">Description*</p>
        <textarea v-model="description" placeholder="Enter description"></textarea>
      </div>
      <button type="submit" class="button white-text-m upload-button">Save</button>
      <p v-if="!isFormValid" class="black-text-m error-message">Please fill in all fields correctly</p>
    </form>
  </div>
</template>

<style scoped>
/*Resizing of back to button to not cover the width of the component*/
a {
  display: inline-block;
}

.row {
  justify-content: space-between;
  width: 27.5em;
}

.small-icon {
  width: 2em;
  height: 2em;
}

.subcomponent {
  background-image: url("@/assets/images/img_background@3x.png");
  background-size: cover;
  background-color: unset;
}

input {
  padding: 1.5em;
  border-radius: 5px;
  border-style: none;
}

textarea {
  padding: 1.5em;
  border-radius: 5px;
  border-style: none;
  width: 30em;
  height: 10em;
  resize: none;
}

select {
  padding: 1.5em;
  border-radius: 5px;
  border-style: none;
  width: 15em;
  color: rgb(128, 128, 128);
}

form {
  max-width: 27.5em;
}

option {
  color: black;
}

.image-preview-container{
  width: 10em;
  display: flex;
  justify-content: flex-end;
}

.small-icon-container{
  float: right;
  position: absolute;
  margin: 5px;
}

@media only screen and (max-width: 425px) {
  .row {
    width: 90%;
    flex-direction: column;
  }

  .long-input{
    width: 90%;
  }

  .short-input {
    width: 100%;
  }

  select {
    width: 93vw;
  }

  textarea {
    width: 90%;
  }

  .black-text-m {
    margin-block: 1em;
  }

  .create-new-listing-text {
    margin-bottom: 2em;
    text-align: center;
  }
}

</style>