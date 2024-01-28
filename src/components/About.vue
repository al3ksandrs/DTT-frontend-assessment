<script>
export default {
  name: "About"
}
</script>

<template>
  <div class="subcomponent">
    <p class="about-mobile black-text-m h2">ABOUT</p>
    <p class="black-text-m h2">About DTT Real Estate</p>
    <p class="black-text-m normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Euismod nisi porta lorem mollis aliquam. Vestibulum lorem sed risus
      ultricies tristique nulla aliquet. Sit amet justo donec enim diam. Vestibulum sed arcu non odio euismod lacinia at
      quis risus. Aliquam sem et tortor consequat id porta. Sagittis id consectetur purus ut faucibus. Elementum
      curabitur vitae nunc sed velit dignissim sodales ut eu. Velit dignissim sodales ut eu sem integer vitae. Eget
      nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Neque vitae tempus quam pellentesque nec nam
      aliquam sem et. Gravida cum sociis natoque penatibus et magnis. Cursus in hac habitasse platea dictumst quisque.
      Facilisi etiam dignissim diam quis enim. Purus sit amet luctus venenatis lectus. Nunc mattis enim ut tellus
      elementum. Adipiscing elit pellentesque habitant morbi tristique. Porttitor leo a diam sollicitudin tempor id eu
      nisl nunc.</p>
    <p class="black-text-m h2">Design and Development</p>
    <div class="row">
      <img class="about-logo" src="@/assets/images/img_logo_dtt@3x.png">
      <div>
        <p class="black-text-m normal">By DTT</p>
        <button class="dtt-link" onclick="window.location.href='https://www.d-tt.nl';">
          www.d-tt.nl
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.h2 {
  padding-block: 1em;
}

.about-mobile {
  display: none;
  text-align: center;
  font-size: 22px;
}

.dtt-link {
  border-style: none;
  background-color: transparent;
  color: #067BC2;
  cursor: pointer;
  padding: 0;
}

.about-logo {
  height: 5em;
  padding-right: 2em;
}

@media only screen and (max-width: 425px) {
  .about-mobile {
    display: block;
  }

  .black-text-m {
    margin: 0;
  }

  .dtt-link {
    font-size: 16px;
  }
}

@media only screen and (max-width: 375px) {
  .dtt-link {
    font-size: 12px
  }

  .about-logo {
    height: 4em;
  }
}

</style>