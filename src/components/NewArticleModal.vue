<template>
  <div class="new-article-modal">
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
            <p
              v-if="this.errorId == 2"
              class="has-text-danger has-text-weight-bold	"
            >
              * {{ this.errorMessage }}
            </p>
            <div class="control">
              <div class="select">
                <select v-model="selectedAuthor" id="author-selection">
                  <option disabled>Select Author</option>
                  <option v-for="author in authorsList" :key="author.id">{{
                    author.name
                  }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Body</label>
            <p
              v-if="this.errorId == 3"
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
              <button class="button is-link" id="create" @click="checkFields">
                Create
              </button>
            </div>
            <div class="control">
              <button class="button is-link is-light" id="go-back" @click="handleCloseModal">
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
  name: "NewArticleModal",

  data() {
    return {
      titleInput: "",
      selectedAuthor: "Select Author",
      bodyInput: "",

      authorsList: [],
      selectedAuthorsID: 0,

      errorMessage: "",
      errorId: 0
    };
  },

  methods: {
    async addNewArticle() {
      try {
        this.findAuthorsID();
        await this.$requests.createArticle(
          ...[,],
          this.titleInput,
          this.bodyInput,
          this.selectedAuthorsID,
          new Date().toLocaleString("lt-LT"),
          null
        );
        this.$emit("afterAdd", "Success");
      } catch (error) {
        this.$emit("afterAdd", "Failure");
      }
    },

    async getAuthorsList() {
      this.authorsList = await this.$requests.getAuthors();
    },

    findAuthorsID() {
      for (let i = 0; i < this.authorsList.length; i++) {
        if (this.authorsList[i].name == this.selectedAuthor) {
          this.selectedAuthorsID = this.authorsList[i].id;
        }
      }
    },

    handleCloseModal() {
      this.$emit("onModalClose");
    },

    checkFields() {
      if (this.titleInput == "") {
        this.errorId = 1;
        this.errorMessage = "Title field is empty.";
      } else if (
        this.selectedAuthor == "" ||
        this.selectedAuthor == "Select Author"
      ) {
        this.errorId = 2;
        this.errorMessage = "Author is not selected.";
      } else if (this.bodyInput == "") {
        this.errorId = 3;
        this.errorMessage = "Body field is empty.";
      } else {
        this.addNewArticle();
      }
    }
  },

  created() {
    this.getAuthorsList();
  }
};
</script>
