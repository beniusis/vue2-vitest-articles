import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import NewArticleModal from "../components/NewArticleModal.vue";
import localVue from "../mocks/localVue";

import { mockAuthors } from "../mocks/mockAuthors";
import { mockArticles } from "../mocks/mockArticles";

describe("NewArticleModal.vue", () => {
  it("should render the page correctly", () => {
    const authors = mockAuthors;
    const articles = mockArticles;

    vi.fn().mockResolvedValueOnce(authors);
    vi.fn().mockResolvedValueOnce(articles);
    const wrapper = mount(NewArticleModal, {
      localVue,
    });
    expect(wrapper.vm.$data.selectedAuthor).toBe("Select Author");
  });
});
