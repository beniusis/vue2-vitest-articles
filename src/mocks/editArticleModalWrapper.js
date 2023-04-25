import { mount } from "@vue/test-utils";
import EditArticleModal from "../components/EditArticleModal.vue";
import { mockAuthors } from "./mockAuthors";
import { mockArticles } from "./mockArticles";

export function newWrapper() {
  const article = articleMock();
  return mount(EditArticleModal, {
    propsData: { id: article.id },
    mocks: {
      $requests: {
        getAuthors: () => {
          return new Promise((resolve) => resolve(mockAuthors));
        },
        getArticle: () => {
          return new Promise((resolve) =>
            resolve({
              id: article.id,
              title: article.title,
              body: article.body,
              author: article.author,
              created_at: article.created_at,
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

export function articleMock() {
  return mockArticles[0];
}
