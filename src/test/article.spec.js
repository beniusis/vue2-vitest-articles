import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Article from "../components/Article.vue";
import { mockAuthors } from "../mocks/mockAuthors";
import { mockArticles } from "../mocks/mockArticles";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";
import { newWrapper } from "../mocks/articleWrapper";

describe("Article", () => {
  it("should render the page correctly with empty props", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    expect(wrapper.vm.$data.authorsList).toStrictEqual(mockAuthors);
  });

  it("should render the page correctly", async () => {
    const article = mockArticles[0];
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
    const router = new VueRouter();
    const article = mockArticles[0];
    const wrapper = mount(Article, {
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
        $router: {
          push: () => {
            router.push({ name: "article", params: { id: article.id } });
          },
        },
      },
    });
    await flushPromises();
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted({ name: "article", params: { id: article.id } }));
  });

  it("should emit onEditClick on 'Edit' button click", async () => {
    const article = mockArticles[0];
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onEditClick")).toBeTruthy();
    expect(wrapper.emitted().onEditClick[0]).toStrictEqual([article.id]);
  });

  it("should emit onRemoveClick on 'Remove' button click", async () => {
    const article = mockArticles[0];
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(2).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onRemoveClick")).toBeTruthy();
    expect(wrapper.emitted().onRemoveClick[0]).toStrictEqual([article.id]);
  });
});
