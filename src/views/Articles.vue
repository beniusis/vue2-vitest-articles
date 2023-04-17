<template>
  <div class="articles">
    <div class="is-flex is-justify-content-center mt-4">
      <button
        class="button is-success is-small is-uppercase"
        @click="openAddModal"
      >
        New Article
      </button>
    </div>
    <div v-if="articlesList.length == 0" class="columns">
      <div class="notification is-danger is-light mx-auto mt-6 mb-6">
        Currently there are <strong>NO</strong> articles.
      </div>
    </div>
    <div v-else class="is-flex is-justify-content-center">
      <div v-for="article in articlesList">
        <Article
          :key="article.id"
          :id="article.id"
          :title="article.title"
          :body="article.body"
          :author="article.author"
          :created_at="new Date(article.created_at)"
          :updated_at="new Date(article.updated_at)"
          :is-details="false"
          @onEditClick="handleOnEditClick"
          @onRemoveClick="handleOnRemoveClick"
        >
        </Article>
      </div>
    </div>
    <NewArticleModal
      v-if="this.showAddModal"
      @onModalClose="closeAddModal"
      @afterAdd="handleAfterAdd"
    >
    </NewArticleModal>
    <EditArticleModal
      v-if="this.showEditModal"
      :id="this.articlesId"
      @onModalClose="closeEditModal"
      @afterEdit="handleAfterEdit"
    ></EditArticleModal>
    <!-- searchbar -->
    <div class="is-flex is-justify-content-center">
      <div class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Search..."
          v-model="searchInput"
        />
        <span class="icon is-small is-left">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
      </div>
    </div>
    <Pagination
      @onPageChange="handlePageChange"
      :total-pages="this.totalPages"
    ></Pagination>
    <InformationMessage
      v-if="this.showInfo"
      :information-type="this.infoType"
      :message="this.message"
      @onCloseAlert="handleOnCloseAlert"
    ></InformationMessage>
    <Confirmation
      v-if="this.showConfirmationAlert"
      @onYesClick="removeArticle(articlesId)"
      @onCloseWindowClick="closeConfirmationWindow"
    ></Confirmation>
  </div>
</template>

<script>
import Article from "../components/Article.vue";
import Pagination from "../components/Pagination.vue";
import NewArticleModal from "../components/NewArticleModal.vue";
import EditArticleModal from "../components/EditArticleModal.vue";
import InformationMessage from "../components/InformationMessage.vue";
import Confirmation from "../components/Confirmation.vue";
import { modalsMixin } from "../mixins/modalsMixin.js";
import { debounce } from "vue-debounce";

export default {
  name: "Articles",
  mixins: [modalsMixin],
  components: {
    Article,
    Pagination,
    NewArticleModal,
    EditArticleModal,
    InformationMessage,
    Confirmation
  },

  data() {
    return {
      articlesList: [],
      articlesPerPage: 3,
      totalPages: 0,
      articlesId: 0,
      searchInput: ""
    };
  },

  watch: {
    searchInput() {
      this.debouncedFetch();
    }
  },

  methods: {
    async getArticlesList(page) {
      let currentPage = page < 0 || !page ? 1 : page;
      const params = {
        q: this.searchInput,
        _page: currentPage,
        _limit: this.articlesPerPage
      };
      const articles = await this.$requests.getArticles(params);
      this.totalPages = this.getPagesCount(articles.headers["x-total-count"]);
      this.articlesList = articles.data;
    },

    getPagesCount(articlesCount) {
      return parseInt(Math.ceil(articlesCount / this.articlesPerPage));
    },

    handlePageChange(page) {
      this.getArticlesList(page);
    },

    handleOnEditClick(index) {
      this.showEditModal = true;
      this.articlesId = index;
    },

    handleOnRemoveClick(index) {
      this.showConfirmationAlert = true;
      this.articlesId = index;
    },

    handleOnCloseAlert() {
      this.showInfo = false;
      this.getArticlesList();
    }
  },

  created() {
    this.getArticlesList(1);
    this.debouncedFetch = debounce(() => {
      this.getArticlesList();
    }, 1000);
  }
};
</script>
