import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import InformationMessage from "../components/InformationMessage.vue";

describe("InformationMessage", () => {
  it("should render the page correctly with empty props", () => {
    const wrapper = mount(InformationMessage, {});

    expect(wrapper.vm.informationType).toBeUndefined();
    expect(wrapper.vm.message).toBeUndefined();
  });

  it("should render the page correctly", () => {
    const informationType = "Success";
    const message = "Your action was successful";
    const wrapper = mount(InformationMessage, {
      propsData: { informationType, message },
    });
    expect(wrapper.vm.informationType).toBe(informationType);
    expect(wrapper.vm.message).toBe(message);
    expect(wrapper.find("p").text()).toBe(informationType);
    expect(wrapper.find(".message-body").text()).toBe(message);
  });

  it("should emit onCloseAlert on close button click", async () => {
    const wrapper = mount(InformationMessage, {});

    await wrapper.find(".delete").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onCloseAlert")).toBeTruthy();
  });
});
