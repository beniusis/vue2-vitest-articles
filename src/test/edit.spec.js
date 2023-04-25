import { describe, it, expect } from "vitest";
import { mockAuthors } from "./mocks/mockAuthors";
import EditArticleModal from "../components/EditArticleModal.vue";
import flushPromises from "flush-promises";
import { mockArticle } from "./mocks/mockArticle";
import createWrapper from "./mocks/mockWrapper";

describe("EditArticleModal", () => {
  it("should render the page correctly", async () => {
    const wrapper = createWrapper(EditArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: mockArticle.id,
                title: mockArticle.title,
                body: mockArticle.body,
                author: mockArticle.author,
                created_at: mockArticle.created_at,
              })
            );
          },
        },
      },
      propsData: {
        id: mockArticle.id,
      },
    });
    await flushPromises();
    expect(wrapper.vm.id).toBe(mockArticle.id);
    expect(wrapper.vm.$data.titleInput).toBe(mockArticle.title);
    expect(wrapper.vm.$data.bodyInput).toBe(mockArticle.body);
    expect(wrapper.vm.$data.authorsList).toStrictEqual(mockAuthors);
    expect(wrapper.vm.$data.selectedAuthorsID).toBe(mockArticle.author);
    expect(wrapper.vm.$data.oldCreatedDate).toStrictEqual(
      mockArticle.created_at
    );
    expect(wrapper.vm.$data.errorMessage).toBe("");
    expect(wrapper.vm.$data.errorId).toBe(0);
  });

  it("should have disabled the author input field", async () => {
    const wrapper = createWrapper(EditArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: mockArticle.id,
                title: mockArticle.title,
                body: mockArticle.body,
                author: mockArticle.author,
                created_at: mockArticle.created_at,
              })
            );
          },
        },
      },
      propsData: {
        id: mockArticle.id,
      },
    });
    await flushPromises();
    expect(wrapper.findAll("input").at(1).attributes("disabled")).toBeTruthy();
  });

  it("should emit onModalClose on 'Go back' button click", async () => {
    const wrapper = createWrapper(EditArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: mockArticle.id,
                title: mockArticle.title,
                body: mockArticle.body,
                author: mockArticle.author,
                created_at: mockArticle.created_at,
              })
            );
          },
        },
      },
      propsData: {
        id: mockArticle.id,
      },
    });
    await flushPromises();
    await wrapper.findAll("button").at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onModalClose")).toBeTruthy();
  });

  it("should throw an error on 'Update' button click if title field is empty", async () => {
    const wrapper = createWrapper(EditArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: mockArticle.id,
                title: mockArticle.title,
                body: mockArticle.body,
                author: mockArticle.author,
                created_at: mockArticle.created_at,
              })
            );
          },
        },
      },
      propsData: {
        id: mockArticle.id,
      },
    });
    await flushPromises();
    await wrapper.setData({
      titleInput: "",
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.errorId).toBe(1);
    expect(wrapper.vm.$data.errorMessage).toBe("Title field is empty.");
  });

  it("should throw an error on 'Update' button click if body field is empty", async () => {
    const wrapper = createWrapper(EditArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: mockArticle.id,
                title: mockArticle.title,
                body: mockArticle.body,
                author: mockArticle.author,
                created_at: mockArticle.created_at,
              })
            );
          },
        },
      },
      propsData: {
        id: mockArticle.id,
      },
    });
    await flushPromises();
    await wrapper.setData({
      bodyInput: "",
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.errorId).toBe(2);
    expect(wrapper.vm.$data.errorMessage).toBe("Body field is empty.");
  });

  it("should update an article on 'Update' button click", async () => {
    const wrapper = createWrapper(EditArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: mockArticle.id,
                title: mockArticle.title,
                body: mockArticle.body,
                author: mockArticle.author,
                created_at: mockArticle.created_at,
              })
            );
          },
          updateArticle: () => {
            return new Promise((resolve) => resolve());
          },
        },
      },
      propsData: {
        id: mockArticle.id,
      },
    });
    await flushPromises();
    await wrapper.setData({
      titleInput: "testTitleInput",
      bodyInput: "testBodyInput",
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().afterEdit[0]).toStrictEqual(["Success"]);
  });

  it("should fail updating an Article after 'Update' button click", async () => {
    const wrapper = createWrapper(EditArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: mockArticle.id,
                title: mockArticle.title,
                body: mockArticle.body,
                author: mockArticle.author,
                created_at: mockArticle.created_at,
              })
            );
          },
          updateArticle: () => {
            return new Promise((resolve, reject) => reject());
          },
        },
      },
      propsData: {
        id: mockArticle.id,
      },
    });
    await flushPromises();
    await wrapper.setData({
      titleInput: mockArticle.title,
      bodyInput: mockArticle.body,
      selectedAuthor: mockAuthors[mockArticle.author - 1].name,
      selectedAuthorsID: mockArticle.author,
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().afterEdit[0]).toStrictEqual(["Failure"]);
  });
});
