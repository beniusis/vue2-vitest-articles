import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Article from "../components/Article.vue";

describe("Article.vue", () => {
  it("should render the page correctly with empty props", () => {
    const wrapper = mount(Article, {});

    expect(wrapper.vm.id).toBeUndefined();
    expect(wrapper.vm.title).toBeUndefined();
    expect(wrapper.vm.body).toBeUndefined();
    expect(wrapper.vm.author).toBeUndefined();
    expect(wrapper.vm.created_at).toBeUndefined();
    expect(wrapper.vm.updated_at).toBeUndefined();
    expect(wrapper.vm.isDetails).toBeUndefined();
  });
});
