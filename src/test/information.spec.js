import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import InformationMessage from "../components/InformationMessage.vue";

describe("InformationMessage.vue", () => {
  it("should render the page correctly with empty props", () => {
    const wrapper = mount(InformationMessage, {});

    expect(wrapper.vm.informationType).toBeUndefined();
    expect(wrapper.vm.message).toBeUndefined();
  });

  it("should render the page correctly", () => {
    const informationType = "Success";
    const testInformationType = "Success";
    const message = "Your action was successful";
    const testMessage = "Your action was successful";
    const wrapper = mount(InformationMessage, {
      propsData: { informationType, message },
    });

    expect(wrapper.vm.informationType).toBe(testInformationType);
    expect(wrapper.vm.message).toBe(testMessage);
  });
});
