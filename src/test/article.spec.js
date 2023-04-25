import { describe, it, expect } from "vitest";
import { mockAuthors } from "./mocks/mockAuthors";
import flushPromises from "flush-promises";
import { mockArticle } from "./mocks/mockArticle";
import Article from "../components/Article.vue";
import VueRouter from "vue-router";
import createWrapper from "./mocks/mockWrapper";

describe("Article", () => {
  it("should render the page correctly with empty props", async () => {
    const wrapper = createWrapper(Article, {
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
    const wrapper = createWrapper(Article, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
        },
      },
      propsData: {
        id: mockArticle.id,
        title: mockArticle.title,
        body: mockArticle.body,
        author: mockArticle.author,
        created_at: new Date(mockArticle.created_at).toLocaleString("lt-LT"),
        updated_at: new Date(mockArticle.updated_at).toLocaleString("lt-LT"),
        isDetails: mockArticle.isDetails,
      },
    });
    await flushPromises();
    expect(wrapper.vm.id).toBe(mockArticle.id);
    expect(wrapper.vm.title).toBe(mockArticle.title);
    expect(wrapper.vm.body).toBe(mockArticle.body);
    expect(wrapper.vm.author).toBe(mockArticle.author);
    expect(wrapper.vm.created_at).toStrictEqual(
      new Date(mockArticle.created_at).toLocaleString("lt-LT")
    );
    expect(wrapper.vm.updated_at).toStrictEqual(
      new Date(mockArticle.updated_at).toLocaleString("lt-LT")
    );
    expect(wrapper.vm.isDetails).toBe(mockArticle.isDetails);
    expect(wrapper.find(".title").text()).toBe(mockArticle.title);
    expect(wrapper.find(".subtitle").text()).toBe(
      mockAuthors[mockArticle.author - 1].name
    );
    expect(wrapper.find(".content").text()).toBe(mockArticle.updated_at);
  });

  it("should route to /articles/:id correctly on 'Details' button click", async () => {
    const router = new VueRouter();
    const wrapper = createWrapper(Article, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
        },
        $router: {
          push: () => {
            router.push({ name: "article", params: { id: mockArticle.id } });
          },
        },
      },
      propsData: {
        id: mockArticle.id,
        title: mockArticle.title,
        body: mockArticle.body,
        author: mockArticle.author,
        created_at: new Date(mockArticle.created_at).toLocaleString("lt-LT"),
        updated_at: new Date(mockArticle.updated_at).toLocaleString("lt-LT"),
        isDetails: mockArticle.isDetails,
      },
    });
    await flushPromises();
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(
      wrapper.emitted({ name: "article", params: { id: mockArticle.id } })
    );
  });

  it("should emit onEditClick on 'Edit' button click", async () => {
    const wrapper = createWrapper(Article, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
        },
      },
      propsData: {
        id: mockArticle.id,
        title: mockArticle.title,
        body: mockArticle.body,
        author: mockArticle.author,
        created_at: new Date(mockArticle.created_at).toLocaleString("lt-LT"),
        updated_at: new Date(mockArticle.updated_at).toLocaleString("lt-LT"),
        isDetails: mockArticle.isDetails,
      },
    });
    await flushPromises();
    await wrapper.findAll("button").at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onEditClick")).toBeTruthy();
    expect(wrapper.emitted().onEditClick[0]).toStrictEqual([mockArticle.id]);
  });

  it("should emit onRemoveClick on 'Remove' button click", async () => {
    const wrapper = createWrapper(Article, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
        },
      },
      propsData: {
        id: mockArticle.id,
        title: mockArticle.title,
        body: mockArticle.body,
        author: mockArticle.author,
        created_at: new Date(mockArticle.created_at).toLocaleString("lt-LT"),
        updated_at: new Date(mockArticle.updated_at).toLocaleString("lt-LT"),
        isDetails: mockArticle.isDetails,
      },
    });
    await flushPromises();
    await wrapper.findAll("button").at(2).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onRemoveClick")).toBeTruthy();
    expect(wrapper.emitted().onRemoveClick[0]).toStrictEqual([mockArticle.id]);
  });
});
