<script>
export default {
  name: "MobileNavbar",
  data() {
    return {
      isHomeActive: false,
      isAboutUsActive: false,
    }
  },
  watch: {
    // Set booleans to their value if path's match
    $route(to, from) {
      this.isHomeActive = to.path === '/houses';
      this.isAboutUsActive = to.path === '/about';
    },
  },
}
</script>

<template>
  <div class="mobile-navbar-container">
    <nav>
      <ul id="mobile-navbar-list">
        <li class="navbar-item">
          <router-link to="/houses" class="navbar-text h2 black-text-m" :class="{ 'active-link': isHomeActive }">
            <img v-if="!isHomeActive" class="mobile-navbar-icon" src="@/assets/images/ic_mobile_navigarion_home@3x.png">
            <img v-if="isHomeActive" class="mobile-navbar-icon"
                 src="@/assets/images/ic_mobile_navigarion_home_active@3x.png">
          </router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/about" class="navbar-text h2 black-text-m" :class="{ 'active-link': isAboutUsActive }">
            <img v-if="!isAboutUsActive" class="mobile-navbar-icon"
                 src="@/assets/images/ic_mobile_navigarion_info@3x.png">
            <img v-if="isAboutUsActive" class="mobile-navbar-icon"
                 src="@/assets/images/ic_mobile_navigarion_info_active@3x.png">
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
</style>