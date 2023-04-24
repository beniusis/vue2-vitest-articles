import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { mockAuthors } from "../mocks/mockAuthors";
import EditArticleModal from "../components/EditArticleModal.vue";
import { mockArticles } from "../mocks/mockArticles";
import flushPromises from "flush-promises";
import { newWrapper } from "../mocks/editArticleModalWrapper";

describe("EditArticleModal", () => {
  it("should render the page correctly", async () => {
    const article = mockArticles[0];
    const wrapper = newWrapper();
    await flushPromises();
    expect(wrapper.vm.$data.titleInput).toBe(article.title);
    expect(wrapper.vm.$data.bodyInput).toBe(article.body);
    expect(wrapper.vm.$data.authorsList).toStrictEqual(mockAuthors);
    expect(wrapper.vm.$data.selectedAuthorsID).toBe(article.author);
    expect(wrapper.vm.$data.oldCreatedDate).toStrictEqual(article.created_at);
  });

  it("should have disabled the author input field", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    expect(wrapper.findAll("input").at(1).attributes("disabled")).toBeTruthy();
  })

  it("should emit onModalClose on 'Go back' button click", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onModalClose")).toBeTruthy();
  });

  it("should throw an error on 'Update' button click if title field is empty", async () => {
    const wrapper = newWrapper();
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
    const wrapper = newWrapper();
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
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.setData({
      titleInput: "testTitleInput",
      bodyInput: "testBodyInput",
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().afterEdit[0]).toStrictEqual(["Success"]);
  });

  it("should fail updating an article after 'Update' button click", async () => {
    const idx = mockArticles[0].id;
    const wrapper = mount(EditArticleModal, {
      propsData: { id: idx },
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          getArticle: () => {
            return new Promise((resolve) =>
              resolve({
                id: idx,
                title: "Bourne Again",
                body: "010111100001",
                author: 1,
                created_at: "2023-02-06 10:15:43",
              })
            );
          },
          updateArticle: () => {
            return new Promise((resolve, reject) => reject());
          },
        },
      },
    });
    await flushPromises();
    await wrapper.setData({
      titleInput: "testTitleInput",
      bodyInput: "testBodyInput",
      selectedAuthor: "Jason Bourne",
      selectedAuthorsID: 1,
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().afterEdit[0]).toStrictEqual(["Failure"]);
  });
});
