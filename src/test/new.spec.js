import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NewArticleModal from "../components/NewArticleModal.vue";
import { mockAuthors } from "../mocks/mockAuthors";
import { mockArticles } from "../mocks/mockArticles";
import flushPromises from "flush-promises";

describe("NewArticleModal", () => {
  it("should render the page correctly", async () => {
    const wrapper = mount(NewArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticles: () => {
            return new Promise((resolve) => resolve(mockArticles));
          },
        },
      },
    });

    await flushPromises();

    console.log(wrapper.vm.$data.articlesList);

    expect(wrapper.vm.$data.authorsList).toStrictEqual(mockAuthors);
    expect(wrapper.vm.$data.articlesList).toStrictEqual(mockArticles);
  });
});
