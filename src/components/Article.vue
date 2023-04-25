<template>
  <div class="article">
    <div class="tile is-ancestor">
      <div class="tile is-parent m-6">
        <article class="tile is-child box">
          <p class="title">{{ title }}</p>
          <p class="subtitle">{{ this.authorsName }}</p>
          <div class="content">
            <p>{{ convertedDate }}</p>
          </div>
          <button
            v-if="!isDetails"
            class="button is-info is-small is-uppercase mr-2"
            @click="openArticleDetails"
            id="details"
          >
            Details
          </button>
          <button
            class="button is-warning is-small is-uppercase mr-2"
            @click="$emit('onEditClick', id)"
            id="edit"
          >
            Edit
          </button>
          <button
            class="button is-danger is-small is-uppercase"
            @click="$emit('onRemoveClick', id)"
            id="remove"
          >
            Remove
          </button>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    id: Number,
    title: String,
    body: String,
    author: Number,
    created_at: Date,
    updated_at: Date,
    isDetails: Boolean
  },

  data() {
    return {
      authorsList: [],
      authorsName: ""
    };
  },

  computed: {
    convertedDate() {
      let created = new Date(this.created_at);
      let updated = new Date(this.updated_at);

      if (created.getTime() > updated.getTime()) {
        return created.toLocaleString("lt-LT");
      } else {
        return updated.toLocaleString("lt-LT");
      }
    }
  },

  methods: {
    async getAuthorsList() {
      this.authorsList = await this.$requests.getAuthors();

      for (let i = 0; i < this.authorsList.length; i++) {
        if (this.authorsList[i].id == this.author) {
          this.authorsName = this.authorsList[i].name;
        }
      }
    },

    openArticleDetails() {
      this.$router.push({
        name: "article",
        params: {
          id: this.id
        }
      });
    }
  },

  created() {
    this.getAuthorsList();
  }
};
</script>
