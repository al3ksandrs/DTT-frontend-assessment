<script>
export default {
  name: "DeletionConfirmation",
  methods:{
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-confirmation {
  background: white;
  padding: 3em;
  padding-inline: 10em;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.delete-button{
  width: 20em;
  margin-block: 2em;
}

.confirmation-container{
  display: flex;
  flex-direction: column;

}

.go-back-button{
  width: 20em;
  background-color: #4A4B4C;
}
</style>