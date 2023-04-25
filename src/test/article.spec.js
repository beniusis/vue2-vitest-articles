import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { mockAuthors } from "../mocks/mockAuthors";
import flushPromises from "flush-promises";
import { newWrapper, articleMock } from "../mocks/articleWrapper";
import Article from "../components/Article.vue";

const article = articleMock();

describe("Article", () => {
  it("should render the page correctly with empty props", async () => {
    const wrapper = mount(Article, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
        },
      },
    });
    await flushPromises();
    expect(wrapper.vm.$data.authorsList).toStrictEqual(mockAuthors);
    expect(wrapper.vm.id).toBeUndefined();
    expect(wrapper.vm.tite).toBeUndefined();
    expect(wrapper.vm.body).toBeUndefined();
    expect(wrapper.vm.author).toBeUndefined();
    expect(wrapper.vm.created_at).toBeUndefined();
    expect(wrapper.vm.updated_at).toBeUndefined();
    expect(wrapper.vm.isDetails).toBeFalsy();
  });

  it("should render the page correctly with props", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    expect(wrapper.vm.id).toBe(article.id);
    expect(wrapper.vm.title).toBe(article.title);
    expect(wrapper.vm.body).toBe(article.body);
    expect(wrapper.vm.author).toBe(article.author);
    expect(wrapper.vm.created_at).toStrictEqual(new Date(article.created_at));
    expect(wrapper.vm.updated_at).toStrictEqual(new Date(article.updated_at));
    expect(wrapper.vm.isDetails).toBe(article.isDetails);
    expect(wrapper.find(".title").text()).toBe(article.title);
    expect(wrapper.find(".subtitle").text()).toBe("Jason Bourne");
    expect(wrapper.find(".content").text()).toBe(article.updated_at);
  });

  it("should route to /articles/:id correctly on 'Details' button click", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted({ name: "article", params: { id: article.id } }));
  });

  it("should emit onEditClick on 'Edit' button click", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onEditClick")).toBeTruthy();
    expect(wrapper.emitted().onEditClick[0]).toStrictEqual([article.id]);
  });

  it("should emit onRemoveClick on 'Remove' button click", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(2).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onRemoveClick")).toBeTruthy();
    expect(wrapper.emitted().onRemoveClick[0]).toStrictEqual([article.id]);
  });
});
