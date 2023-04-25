<template>
  <div class="modal-background">
    <div class="action-confirmation is-flex is-justify-content-center mt-4">
      <div class="notification is-danger is-light">
        <p>Are you sure you want to <strong>remove</strong> this article?</p>
        <div class="buttons is-flex is-justify-content-center">
          <button class="button is-success is-small is-uppercase mt-2" id="yes" @click="$emit('onYesClick')">
            Yes
          </button>
          <button class="button is-danger is-small is-uppercase mt-2" id="no" @click="$emit('onCloseWindowClick')">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirmation"
};
</script>
