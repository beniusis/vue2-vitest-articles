export const requests = {
  request: vi.fn(() => {
    return new Promise((resolve) => {
      resolve({});
    });
  }),
};

export default () => {
  return {
    default: {
      install: function (Vue) {
        Vue.prototype.$requests = { requests };
      },
    },
  };
};
