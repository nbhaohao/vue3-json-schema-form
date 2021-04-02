import { mount } from "@vue/test-utils";
import SchemaForm from "../../lib/SchemaForm";
import { ArrayField, NumberField, StringField, Selection } from "../../lib";

describe("ArrayField", () => {
  it("should render multi type", () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: "array",
          items: [
            {
              type: "string",
            },
            {
              type: "number",
            },
          ],
        },
        value: [],
        onChange: () => {
          //
        },
      },
    });
    const arrayField = wrapper.findComponent(ArrayField);
    const stringField = arrayField.findComponent(StringField);
    const numberField = arrayField.findComponent(NumberField);
    expect(arrayField.exists()).toBeTruthy();
    expect(stringField.exists()).toBeTruthy();
    expect(numberField.exists()).toBeTruthy();
  });
  it("should render single type", () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: "array",
          items: {
            type: "string",
          },
        },
        value: ["1", "2"],
        onChange: () => {
          //
        },
      },
    });
    const arrayField = wrapper.findComponent(ArrayField);
    const stringFields = arrayField.findAllComponents(StringField);
    expect(arrayField.exists()).toBeTruthy();
    expect(stringFields.length).toBe(2);
    expect(stringFields[0].props("value")).toBe("1");
    expect(stringFields[1].props("value")).toBe("2");
  });
  it("should render multiSelect type", () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: "array",
          items: {
            type: "string",
            enum: ["1", "2", "3"],
          },
        },
        value: [],
        onChange: () => {
          //
        },
      },
    });
    const arrayField = wrapper.findComponent(ArrayField);
    const selectionWidget = arrayField.findComponent(Selection);
    expect(arrayField.exists()).toBeTruthy();
    expect(selectionWidget.exists()).toBeTruthy();
  });
});
