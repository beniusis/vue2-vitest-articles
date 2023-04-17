export const modalsMixin = {
  data() {
    return {
      showEditModal: false,
      showAddModal: false,
      showConfirmationAlert: false,
      showInfo: false,
      infoType: "",
      message: "",
    };
  },

  methods: {
    openEditModal() {
      this.showEditModal = true;
    },

    openAddModal() {
      this.showAddModal = true;
    },

    closeEditModal() {
      this.showEditModal = false;
    },

    closeAddModal() {
      this.showAddModal = false;
    },

    closeConfirmationWindow() {
      this.showConfirmationAlert = false;
    },

    openShowInfo() {
      this.showInfo = true;
    },

    actionValue(value) {
      if (value == "Success") {
        this.message = "Your action was successful";
        this.infoType = "Success";
      } else {
        this.message = "Your action failed.";
        this.infoType = "Failure";
      }
    },

    handleAfterAdd(value) {
      this.openShowInfo();
      this.actionValue(value);
    },

    handleAfterEdit(value) {
      this.openShowInfo();
      this.actionValue(value);
    },

    async removeArticle(index) {
      this.closeConfirmationWindow();
      try {
        this.$requests.removeArticle(index);
        this.openShowInfo();
        this.actionValue("Success");
      } catch (error) {
        this.openShowInfo();
        this.actionValue("Failure");
      }
    },
  },
};
