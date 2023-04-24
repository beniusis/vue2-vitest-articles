import { mount } from "@vue/test-utils";
import Article from "../components/Article.vue";
import { mockAuthors } from "./mockAuthors";
import { mockArticles } from "./mockArticles";

export function newWrapper() {
  const article = mockArticles[0];

  return mount(Article, {
    propsData: {
      id: article.id,
      title: article.title,
      body: article.body,
      author: article.author,
      created_at: new Date(article.created_at),
      updated_at: new Date(article.updated_at),
      isDetails: article.isDetails,
    },
    mocks: {
      $requests: {
        getAuthors: () => {
          return new Promise((resolve) => resolve(mockAuthors));
        },
      },
    },
  });
}
