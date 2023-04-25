import { describe, it, expect } from "vitest";
import Pagination from "../components/Pagination.vue";
import createWrapper from "./mocks/mockWrapper";

describe("Pagination", () => {
  it("should render the page correctly", () => {
    const totalPages = 3;
    const wrapper = createWrapper(Pagination, {
      propsData: {
        totalPages: totalPages,
      },
    });
    expect(wrapper.vm.totalPages).toBe(totalPages);
  });

  it("should emit onPageChange on page hyperlink click", async () => {
    const totalPages = 3;
    const wrapper = createWrapper(Pagination, {
      propsData: {
        totalPages: totalPages,
      },
    });
    const pageNumber = 1;
    await wrapper.find(`#page-${pageNumber}`).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().onPageChange[0]).toStrictEqual([pageNumber]);
  });

  it("should fill up the page list correctly", () => {
    const totalPages = 3;
    const wrapper = createWrapper(Pagination, {
      propsData: {
        totalPages: totalPages,
      },
    });
    expect(wrapper.find(".pagination-list").element.childElementCount).toBe(totalPages);
  });
});
