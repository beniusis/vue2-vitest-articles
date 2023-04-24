import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Pagination from "../components/Pagination.vue";

describe("Pagination", () => {
  it("should render the page correctly", () => {
    const totalPages = 3;
    const testTotalPages = 3;
    const wrapper = mount(Pagination, {
      propsData: { totalPages },
    });

    expect(wrapper.vm.totalPages).toBe(testTotalPages);
  });

  it("should emit onPageChange on page hyperlink click", async () => {
    const totalPages = 3;
    const wrapper = mount(Pagination, {
      propsData: { totalPages },
    });

    const pageNumber = 1;
    const pages = wrapper.find(`#page-${pageNumber}`);
    await pages.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().onPageChange).toStrictEqual([[pageNumber]]);
  });
});
