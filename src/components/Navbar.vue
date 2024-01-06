<!-- Navbar.vue -->

<script>
export default {
  name: "Navbar",
};
</script>

<template>
  <nav>
    <ul id="navbar-list">
      <li><img id="dtt-logo" src="@/assets/images/img_logo_dtt@3x.png" alt="logo"></li>
      <li class="navbar-item">
        <router-link to="/houses" class="navbar-text h2 black-text-m" :class="{ 'active-link': $route.path === '/houses' }">Houses</router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/about" class="navbar-text h2 black-text-m" :class="{ 'active-link': $route.path === '/about' }">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
#navbar-list {
  display: flex;
  flex-direction: row;
}

#dtt-logo {
  width: 10em;
  padding-right: 1em;
}

ul{
  padding-inline: 0;
}

li {
  list-style-type: none;
}

.navbar-item {
  padding-inline: 1.5em;
  align-self: center;
}

.black-text-m {
  color: #C3C3C3;
  font-family: 'Montserrat',serif;
  font-weight: bold;
  text-decoration: none;
}

.h1{
  font-size: 32px;
}

.h2{
  font-size: 22px;
}

.active-link {
  color: black;
}
</style>
