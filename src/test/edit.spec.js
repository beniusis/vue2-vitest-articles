import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import EditArticleModal from "../components/EditArticleModal.vue";
import { mockAuthors } from "../mocks/mockAuthors";
import { mockArticles } from "../mocks/mockArticles";
import flushPromises from "flush-promises";

describe("EditArticleModal", () => {
  it("should render the page correctly", async () => {
    const id = mockArticles[0].id - 1;

    const wrapper = mount(EditArticleModal, {
      propsData: { id },
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: (idx) => {
            idx = id;
            return new Promise((resolve) => resolve(mockArticles[idx]));
          },
        },
      },
    });

    await flushPromises();

    expect(wrapper.vm.$data.titleInput).toBe(mockArticles[id].title);
    expect(wrapper.vm.$data.bodyInput).toBe(mockArticles[id].body);
    expect(wrapper.vm.$data.authorsList).toStrictEqual(mockAuthors);
    expect(wrapper.vm.$data.selectedAuthorsID).toBe(mockArticles[id].author);
    expect(wrapper.vm.$data.oldCreatedDate).toStrictEqual(mockArticles[id].created_at)
  });
});
