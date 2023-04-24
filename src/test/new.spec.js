import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeAll } from "vitest";
import NewArticleModal from "../components/NewArticleModal.vue";
import { mockAuthors } from "../mocks/mockAuthors";
import flushPromises from "flush-promises";
import { newWrapper } from "../mocks/wrapper";

describe("NewArticleModal", async () => {
  it("should render the page correctly", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    expect(wrapper.vm.$data.authorsList).toStrictEqual(mockAuthors);
  });

  it("should emit onModalClose on 'Go back' button click", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onModalClose")).toBeTruthy();
  });

  it("should show throw an error on 'Create' button click if title field is empty", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.errorId).toBe(1);
    expect(wrapper.vm.$data.errorMessage).toBe("Title field is empty.");
  });

  it("should throw an error on 'Create' button click if author was not selected", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.setData({
      titleInput: "testTitleInput",
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.errorId).toBe(2);
    expect(wrapper.vm.$data.errorMessage).toBe("Author is not selected.");
  });

  it("should throw an error on 'Create' button click if body field is empty", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.setData({
      titleInput: "testTitleInput",
      selectedAuthor: "Jason Bourne",
      selectedAuthorsID: 1,
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.errorId).toBe(3);
    expect(wrapper.vm.$data.errorMessage).toBe("Body field is empty.");
  });

  it("should create a new article on 'Create' button click", async () => {
    const wrapper = newWrapper();
    await flushPromises();
    await wrapper.setData({
      titleInput: "testTitleInput",
      bodyInput: "testBodyInput",
      selectedAuthor: "Jason Bourne",
      selectedAuthorsID: 1,
    });
    await wrapper.findAll("button").at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.errorId).toBe(0);
    expect(wrapper.vm.$data.errorMessage).toBe("");
    expect(wrapper.emitted().afterAdd[0]).toStrictEqual(["Success"]);
  });

  it("should fail on article creation after 'Create' button click", async () => {
    const wrapper = mount(NewArticleModal, {
      mocks: {
        $requests: {
          getAuthors: () => {
            return new Promise((resolve) => resolve(mockAuthors));
          },
          createArticle: () => {
            return new Promise(() => reject());
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
    expect(wrapper.vm.$data.errorId).toBe(0);
    expect(wrapper.vm.$data.errorMessage).toBe("");
    expect(wrapper.emitted().afterAdd[0]).toStrictEqual(["Failure"]);
  });
});
