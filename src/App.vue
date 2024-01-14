<script setup>

import Navbar from "@/components/navbars/Navbar.vue";
import MobileNavbar from "@/components/navbars/MobileNavbar.vue";
</script>

<template>
  <head>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <title></title>
  </head>
  <Navbar></Navbar>
  <router-view></router-view>
  <MobileNavbar></MobileNavbar>
</template>

<style scoped>
</style>
