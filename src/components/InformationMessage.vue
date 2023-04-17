<template>
  <div class="modal-background">
    <div class="information-message is-flex is-justify-content-center mt-4">
      <div v-if="this.informationType == 'Success'">
        <article class="message is-success">
          <div class="message-header">
            <p>{{ this.informationType }}</p>
            <button
              class="delete"
              aria-label="delete"
              @click="closeAlert"
            ></button>
          </div>
          <div class="message-body">
            {{ this.message }}
          </div>
        </article>
      </div>
      <div v-else>
        <article class="message is-danger">
          <div class="message-header">
            <p>{{ this.informationType }}</p>
            <button
              class="delete"
              aria-label="delete"
              @click="closeAlert"
            ></button>
          </div>
          <div class="message-body">
            {{ this.message }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { messageMixin } from "../mixins/messageMixin.js";

export default {
  name: "InformationMessage",
  mixins: [messageMixin]
};
</script>
