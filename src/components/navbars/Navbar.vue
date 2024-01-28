<script>
export default {
  name: "Navbar",
};
</script>

<template>
  <nav>
    <ul id="navbar-list">
      <li><img id="dtt-logo" src="../../assets/images/img_logo_dtt@3x.png" alt="logo"></li>
      <li class="navbar-item">
        <router-link to="/houses" class="navbar-text h2 black-text-m"
                     :class="{ 'active-link': $route.path === '/houses' }">Houses
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/about" class="navbar-text h2 black-text-m"
                     :class="{ 'active-link': $route.path === '/about' }">About
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
</style>
