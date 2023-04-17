<template>
  <div class="edit-article-modal">
    <div class="modal-background" style="z-index: 999">
      <div class="modal-content mt-4">
        <div class="box">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <p
                v-if="this.errorId == 1"
                class="has-text-danger has-text-weight-bold	"
              >
                * {{ this.errorMessage }}
              </p>
              <input
                type="text"
                class="input"
                placeholder="Enter the title"
                v-model="titleInput"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Author</label>
            <div class="control">
              <input
                type="text"
                class="input"
                v-model="selectedAuthor"
                disabled
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Body</label>
            <p
              v-if="this.errorId == 2"
              class="has-text-danger has-text-weight-bold	"
            >
              * {{ this.errorMessage }}
            </p>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Text here..."
                v-model="bodyInput"
              ></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click="checkFields">
                Update
              </button>
            </div>
            <div class="control">
              <button class="button is-link is-light" @click="handleCloseModal">
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="handleCloseModal"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditArticleModal",
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      titleInput: "",
      selectedAuthor: "",
      bodyInput: "",

      authorsList: [],
      selectedAuthorsID: 0,
      oldCreatedDate: null,

      errorMessage: "",
      errorId: 0
    };
  },

  methods: {
    async getAuthorsList() {
      this.authorsList = await this.$requests.getAuthors();
    },

    async getArticleData() {
      const articleData = await this.$requests.getArticle(this.id);
      this.titleInput = articleData.title;
      this.selectedAuthorsID = articleData.author;
      this.selectedAuthor = this.authorsList[this.selectedAuthorsID - 1].name;
      this.oldCreatedDate = articleData.created_at;
      this.bodyInput = articleData.body;
    },

    async updateArticle() {
      try {
        await this.$requests.updateArticle(
          this.id,
          this.titleInput,
          this.bodyInput,
          this.selectedAuthorsID,
          this.oldCreatedDate,
          new Date().toLocaleString("lt-LT")
        );
        this.handleCloseModal();
        this.$emit("afterEdit", "Success");
      } catch (error) {
        this.handleCloseModal();
        this.$emit("afterEdit", "Failure");
      }
    },

    handleCloseModal() {
      this.$emit("onModalClose");
    },

    checkFields() {
      if (this.titleInput == "") {
        this.errorId = 1;
        this.errorMessage = "Title field is empty.";
      } else if (this.bodyInput == "") {
        this.errorId = 2;
        this.errorMessage = "Body field is empty.";
      } else {
        this.updateArticle();
      }
    }
  },

  created() {
    this.getAuthorsList();
    this.getArticleData();
  }
};
</script>
