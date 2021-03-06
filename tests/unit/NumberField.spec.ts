import { mount } from "@vue/test-utils";
import { NumberField } from "../../lib";
import TestComponent from "./utils/TestComponent";

describe("NumberField", () => {
  it("should render correct number field", async () => {
    let value = "";
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: "number",
        },
        value: "",
        onChange: (v: any) => {
          value = v;
        },
      },
    });
    const numberField = wrapper.findComponent(NumberField);
    expect(numberField.exists()).toBeTruthy();
    const input = numberField.find("input");
    input.element.value = "123";
    await input.trigger("input");
    expect(value).toBe(123);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await input.setValue("a");
    await input.trigger("input");
    // numberField.vm.handleChange({ target: { value: undefined } });
    expect(value).toBe(0);
  });
});
