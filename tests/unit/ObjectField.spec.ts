import { mount } from "@vue/test-utils";
import SchemaForm from "../../lib/SchemaForm";
import { NumberField, StringField } from "../../lib";

describe("ObjectField", () => {
  let schema = {};
  beforeEach(() => {
    schema = {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        age: {
          type: "number",
        },
      },
    };
  });
  it("should render properties to current fields", async () => {
    let value = "";
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value: {},
        onChange: (v: any) => {
          value = v;
        },
      },
    });
    const stringField = wrapper.findComponent(StringField);
    const numberField = wrapper.findComponent(NumberField);
    expect(stringField.exists()).toBeTruthy();
    expect(numberField.exists()).toBeTruthy();
  });
  it("should change value when sub fields trigger onChange", async () => {
    let value: any = {};
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v;
        },
      },
    });
    const stringField = wrapper.findComponent(StringField);
    const numberField = wrapper.findComponent(NumberField);
    await stringField.props("onChange")("1");
    expect(value.name).toBe("1");
    await numberField.props("onChange")(1);
    expect(value.age).toEqual(1);
    await stringField.props("onChange")(undefined);
    expect(value.name).toBe(undefined);
  });
});
