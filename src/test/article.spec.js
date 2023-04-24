import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Article from "../components/Article.vue";
import { mockAuthors } from "../mocks/mockAuthors";
import { mockArticles } from "../mocks/mockArticles";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";

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
  });

  it("should render the page correctly", async () => {
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
      },
    });

    await flushPromises();

    expect(wrapper.vm.id).toBe(article.id);
    expect(wrapper.vm.title).toBe(article.title);
    expect(wrapper.vm.body).toBe(article.body);
    expect(wrapper.vm.author).toBe(article.author);
    expect(wrapper.vm.created_at).toStrictEqual(new Date(article.created_at));
    expect(wrapper.vm.updated_at).toStrictEqual(new Date(article.updated_at));
    expect(wrapper.vm.isDetails).toBe(article.isDetails);
  });

  it("should emit on button clicks", async () => {
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
    expect(wrapper.emitted({ name: "article", params: { id: article.id } }));

    await wrapper.findAll("button").at(1).trigger("click");
    expect(wrapper.emitted("onEditClick")).toBeTruthy();
    expect(wrapper.emitted("onEditClick")).toStrictEqual([[article.id]]);

    await wrapper.findAll("button").at(2).trigger("click");
    expect(wrapper.emitted("onRemoveClick")).toBeTruthy();
    expect(wrapper.emitted("onRemoveClick")).toStrictEqual([[article.id]]);
  });
});
