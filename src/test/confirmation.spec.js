import { describe, it, expect } from "vitest";
import Confirmation from "../components/Confirmation.vue";
import createWrapper from "./mocks/mockWrapper";

describe("InformationMessage", () => {
  it("should render the page correctly without props", () => {
    const wrapper = createWrapper(Confirmation);
    expect(wrapper.vm.$props).toBeUndefined();
  });

  it("should emit 'onYesClick' on Yes button click", async () => {
    const wrapper = createWrapper(Confirmation);
    await wrapper.find("#yes").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onYesClick")).toBeTruthy();
  });

  it("should emit 'onCloseWindowClick' on No button click", async () => {
    const wrapper = createWrapper(Confirmation);
    await wrapper.find("#no").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onCloseWindowClick")).toBeTruthy();
  });
});
