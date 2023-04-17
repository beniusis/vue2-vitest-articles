export const messageMixin = {
  props: {
    informationType: String,
    message: String,
  },

  methods: {
    closeAlert() {
      this.$emit("onCloseAlert");
    },
  },
};
