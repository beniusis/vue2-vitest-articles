import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import EditArticleModal from "../components/EditArticleModal.vue";
import localVue from "../mocks/localVue";

import { mockAuthors } from "../mocks/mockAuthors";
import { article } from "../mocks/article";

describe("NewArticleModal.vue", () => {
  it("should render the page correctly", () => {
    const authors = mockAuthors;
    const _article = article;
    const id = _article[0].id

    vi.fn().mockResolvedValueOnce(authors);
    vi.fn().mockResolvedValueOnce(_article);
    const wrapper = mount(EditArticleModal, {
      localVue,
      propsData: { id }
    });
    expect(wrapper.vm.$data.selectedAuthor).toBeTypeOf("string");
  });
});
