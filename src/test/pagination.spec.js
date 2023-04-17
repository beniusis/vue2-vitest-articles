import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Pagination from "../components/Pagination.vue";

describe("Pagination.vue", () => {
  it("should render the page correctly", () => {
    const totalPages = 3;
    const testTotalPages = 3;
    const wrapper = mount(Pagination, {
      propsData: { totalPages },
    });

    expect(wrapper.vm.totalPages).toBe(testTotalPages);
  });
});
