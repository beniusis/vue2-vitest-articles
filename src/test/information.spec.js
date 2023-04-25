import { describe, it, expect } from "vitest";
import InformationMessage from "../components/InformationMessage.vue";
import createWrapper from "./mocks/mockWrapper";

describe("InformationMessage", () => {
  it("should render the page correctly with empty props", () => {
    const wrapper = createWrapper(InformationMessage);
    expect(wrapper.vm.informationType).toBeUndefined();
    expect(wrapper.vm.message).toBeUndefined();
  });

  it("should render the page correctly with props", () => {
    const informationType = "Greeting";
    const message = "Welcome!";
    const wrapper = createWrapper(InformationMessage, {
      propsData: {
        informationType: informationType,
        message: message,
      },
    });
    expect(wrapper.vm.informationType).toBe(informationType);
    expect(wrapper.vm.message).toBe(message);
  });

  it("should render the page correctly if the action was successful", () => {
    const informationType = "Success";
    const message = "Your action was successful";
    const wrapper = createWrapper(InformationMessage, {
      propsData: {
        informationType: informationType,
        message: message,
      },
    });
    expect(wrapper.vm.informationType).toBe(informationType);
    expect(wrapper.vm.message).toBe(message);
    expect(wrapper.find("p").text()).toBe(informationType);
    expect(wrapper.find(".message-body").text()).toBe(message);
  });

  it("should render the page correctly if the action was not successful", () => {
    const informationType = "Error";
    const message = "Your action failed.";
    const wrapper = createWrapper(InformationMessage, {
      propsData: {
        informationType: informationType,
        message: message,
      },
    });
    expect(wrapper.vm.informationType).toBe(informationType);
    expect(wrapper.vm.message).toBe(message);
    expect(wrapper.find("p").text()).toBe(informationType);
    expect(wrapper.find(".message-body").text()).toBe(message);
  });

  it("should emit onCloseAlert on close button click", async () => {
    const wrapper = createWrapper(InformationMessage);
    await wrapper.find(".delete").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("onCloseAlert")).toBeTruthy();
  });
});
