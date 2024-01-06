<script>
export default {
  name: "Houses"
}
</script>

<template>
  <div class="subcomponent">
    <div class="houses-top-container">
      <p class="black-text-m h1">Houses</p>
      <button class="button white-text-m">
        <img class="white-plus" src="@/assets/images/ic_plus_white@3x.png" alt="white plus">
        CREATE NEW
      </button>
    </div>
    <div id="search-sort-container">
      <div id="search-container">
        <img id="search-logo" src="@/assets/images/ic_search@3x.png">
        <input class="house-search" type="text" placeholder="Search for a house">
      </div>
      <div id="price-size-container">
        <button class="button sort-button white-text-m" id="price-button">
          Price
        </button>
        <button class="button sort-button white-text-m NON_ACTIVE_BUTTON" id="size-button">
          Size
        </button>
      </div>
    </div>
    <div class="house-container">
      <div class="house-container-left">
        <img class="house-image" src="@/assets/images/img_placeholder_house@3x.png">
        <div class="house-details">
          <p class="black-text-m h2">Stokvisstraat 132</p>
          <p class="black-text-m">€ 500.000</p>
          <p class="black-text-m gray normal">1011AA Amsterdam</p>
          <div class="house-icon-container">
            <img class="small-icon" src="@/assets/images/ic_bed@3x.png">
            <p class="small-icon-text black-text-m normal">1</p>
            <img class="small-icon" src="@/assets/images/ic_bath@3x.png">
            <p class="small-icon-text black-text-m normal">1</p>
            <img class="small-icon" src="@/assets/images/ic_size@3x.png">
            <p class="small-icon-text black-text-m normal">120 m2</p>
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
  </div>
</template>

<style scoped>
.subcomponent{
  background-color: #E8E8E8;
  height: 100vh;
  padding-inline: 15em;
  padding-top: 3em;
}

.white-plus{
  width: 1.5em;
  padding-right: 1em;
}

.houses-top-container{
  display: flex;
  justify-content: space-between;
}

.button{
  align-self: center;
  background-color: #EB5440;
  height: 3em;
  padding: 1em;
  border-style: none;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.sort-button{
  width: 10em;
}

#price-button{
  border-radius: 15px 0 0 15px;
}

#size-button{
  border-radius: 0 15px 15px 0;
}

.white-text-m{
  color: #FFFFFF;
  font-family: 'Montserrat',serif;
  font-weight: bold;
}

#search-container{
  display: flex;
  background-color: #C3C3C3;
  padding: 1em;
  border-radius: 15px;
  width: 25em;
}

#search-logo{
  width: 2em;
  padding-right: 1em;
}

.house-search{
  background: none;
  border: none;
  outline: none;
  font-size: 22px;
}

#price-size-container{
  display: flex;
}

.NON_ACTIVE_BUTTON{
  background-color: #C3C3C3;
}

#search-sort-container{
  display: flex;
  justify-content: space-between;
}

.house-container{
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  padding: 1em;
  margin-block: 1em;
  border-radius: 15px;
}

.house-container-left{
  display: flex;
}

.house-image{
  width: 12em;
  aspect-ratio: 1/1;
  border-radius: 15px;
}

.house-details{
  padding-left: 1em;
}

.small-icon{
  width: 1.5em;
  height: 1.5em;
}

.house-icon-container{
  display: flex;
  align-items: center;
}

.small-icon-text{
  padding-inline: 1em;
}

.gray{
  color: #C3C3C3;
}

.normal{
  font-weight: normal;
}

.edit-delete-container{
  display: flex;
  height: 2em;
}

.edit-delete-button{
  background-color: #FFFFFF;
  align-self: center;
  border-style: none;
  display: flex;
  cursor: pointer;
}

</style>