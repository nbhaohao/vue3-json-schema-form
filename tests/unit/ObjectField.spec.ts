import { mount } from "@vue/test-utils";
import { NumberField, StringField } from "../../lib";
import TestComponent from "./utils/TestComponent";

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
    const wrapper = mount(TestComponent, {
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
    const wrapper = mount(TestComponent, {
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
