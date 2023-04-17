<template>
  <div class="article-details">
    <Article
      :id="Number(this.id)"
      :title="this.title"
      :body="this.body"
      :author="this.authorsId"
      :created_at="new Date(this.createdDate)"
      :updated_at="new Date(this.updatedDate)"
      :is-details="true"
      @onEditClick="openEditModal"
      @onRemoveClick="handleOnRemoveClick"
    ></Article>
    <InformationMessage
      v-if="this.showInfo"
      :information-type="this.infoType"
      :message="this.message"
      @onCloseAlert="handleOnCloseAlert"
    ></InformationMessage>
    <EditArticleModal
      v-if="this.showEditModal"
      :id="this.id"
      @onModalClose="closeEditModal"
      @afterEdit="handleAfterEdit"
    ></EditArticleModal>
    <Confirmation
      v-if="this.showConfirmationAlert"
      @onYesClick="removeArticle(id)"
      @onCloseWindowClick="closeConfirmationWindow"
    ></Confirmation>
  </div>
</template>

<script>
import Article from "../components/Article.vue";
import EditArticleModal from "../components/EditArticleModal.vue";
import InformationMessage from "../components/InformationMessage.vue";
import Confirmation from "../components/Confirmation.vue";
import { modalsMixin } from "../mixins/modalsMixin.js";

export default {
  name: "ArticleDetails",
  mixins: [modalsMixin],
  components: {
    Article,
    EditArticleModal,
    InformationMessage,
    Confirmation
  },

  data() {
    return {
      id: this.$route.params.id,
      title: "",
      body: "",
      authorsId: 0,
      createdDate: null,
      updatedDate: null
    };
  },

  methods: {
    async getArticleData() {
      const articleData = await this.$requests.getArticle(this.id);
      this.title = articleData.title;
      this.body = articleData.body;
      this.authorsId = articleData.author;
      this.createdDate = articleData.created_at;
      this.updatedDate = articleData.updated_at;
    },

    handleOnRemoveClick() {
      this.showConfirmationAlert = true;
    },

    handleOnCloseAlert() {
      this.showInfo = false;
      this.$router.push({ name: "home" });
    }
  },

  created() {
    this.getArticleData();
  }
};
</script>
