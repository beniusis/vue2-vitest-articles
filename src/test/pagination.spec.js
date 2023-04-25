import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Pagination from "../components/Pagination.vue";

describe("Pagination", () => {
  it("should render the page correctly", () => {
    const totalPages = 3;
    const wrapper = mount(Pagination, {
      propsData: { totalPages },
    });
    expect(wrapper.vm.totalPages).toBe(totalPages);
  });

  it("should emit onPageChange on page hyperlink click", async () => {
    const totalPages = 3;
    const wrapper = mount(Pagination, {
      propsData: { totalPages },
    });
    const pageNumber = 1;
    await wrapper.find(`#page-${pageNumber}`).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().onPageChange[0]).toStrictEqual([pageNumber]);
  });

  it("should fill up the page list correctly", () => {
    const totalPages = 3;
    const wrapper = mount(Pagination, {
      propsData: { totalPages },
    });
    expect(wrapper.findAll("li").length).toBe(totalPages);
  });
});
