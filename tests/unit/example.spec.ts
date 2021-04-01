import { mount } from "@vue/test-utils";
import SchemaForm from "../../lib/SchemaForm";
import { NumberField } from "../../lib";

describe("SchemaForm", () => {
  it("should render correct number field", async () => {
    let value = "";
    const wrapper = mount(SchemaForm, {
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
  });
});
