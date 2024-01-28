<script>
export default {
  name: "DeletionConfirmation",
  methods: {
    closePopup() {
      this.$emit('close');
    },
    confirmDelete() {
      this.$emit('confirm');
    }
  }
}
</script>

<template>
  <div class="modal-overlay" @click="closePopup">
    <div class="delete-confirmation">
      <p class="black-text-m h1">Delete listing</p>
      <p class="black-text-m normal">Are you sure you want to delete this listing?<br>This action cannot be undone.</p>
      <div class="confirmation-container">
        <button @click="confirmDelete" class="button white-text-m delete-button">Yes, delete</button>
        <button @click="closePopup" class="button go-back-button white-text-m">Go back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>