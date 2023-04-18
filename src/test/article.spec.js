import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Article from "../components/Article.vue";
import localVue from "../mocks/localVue";
import { mockAuthors } from "../mocks/mockAuthors";

describe("Article.vue", () => {
  it("should render the page correctly with empty props", () => {
    // const apiRequest = localVue.prototype.$requests.request
    const authors = mockAuthors;

    // apiRequest.mockResolvedValueOnce(authors)
    vi.fn().mockResolvedValueOnce(authors);

    const wrapper = mount(Article, {
      localVue,
    });
    wrapper.setData({ authorsList: authors });
    expect(wrapper.vm.authorsList).toStrictEqual(authors);
  });

  it("should render the page correctly", () => {
    const id = 1;
    const title = "Bourne Again";
    const body = "010111100001";
    const author = 1;
    const created_at = new Date("2023-02-06 10:15:43");
    const updated_at = new Date("2023-04-17 13:49:42");
    const isDetails = false;

    const wrapper = mount(Article, {
      localVue,
      propsData: { id, title, body, author, created_at, updated_at, isDetails },
    });

    expect(wrapper.vm.id).toBe(id);
    expect(wrapper.vm.title).toBe(title);
    expect(wrapper.vm.body).toBe(body);
    expect(wrapper.vm.author).toBe(author);
    expect(wrapper.vm.created_at).toBe(created_at);
    expect(wrapper.vm.updated_at).toBe(updated_at);
    expect(wrapper.vm.isDetails).toBe(isDetails);
  });
});
