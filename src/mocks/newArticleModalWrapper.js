import { mount } from "@vue/test-utils";
import NewArticleModal from "../components/NewArticleModal.vue";
import { mockAuthors } from "./mockAuthors";

export function newWrapper() {
  return mount(NewArticleModal, {
    mocks: {
      $requests: {
        getAuthors: () => {
          return new Promise((resolve) => resolve(mockAuthors));
        },
        createArticle: () => {
          return new Promise((resolve) =>
            resolve({
              title: "testTitle",
              body: "testBody",
              author: 0,
              created_at: new Date().toLocaleString("lt-LT"),
              updated_at: null,
            })
          );
        },
      },
    },
  });
}
