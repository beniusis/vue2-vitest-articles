import { mount } from "@vue/test-utils";
import EditArticleModal from "../components/EditArticleModal.vue";
import { mockAuthors } from "./mockAuthors";
import { mockArticles } from "./mockArticles";

export function newWrapper() {
  const article = mockArticles[0];
  const idx = article.id;
  return mount(EditArticleModal, {
    propsData: { id: idx },
    mocks: {
      $requests: {
        getAuthors: () => {
          return new Promise((resolve) => resolve(mockAuthors));
        },
        getArticle: () => {
          return new Promise((resolve) =>
            resolve({
              id: idx,
              title: "Bourne Again",
              body: "010111100001",
              author: 1,
              created_at: "2023-02-06 10:15:43",
            })
          );
        },
        updateArticle: () => {
          return new Promise((resolve) => resolve());
        },
      },
    },
  });
}
