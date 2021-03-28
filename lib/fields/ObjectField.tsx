import { DefineComponent, defineComponent, inject } from "vue";
import { FieldPropsDefine } from "../types";
import { SchemaFormContextKey } from "../context";
import { isObject } from "../utils";

type SchemaItemDefine = DefineComponent<typeof FieldPropsDefine>;

export default defineComponent({
  name: "ObjectField",
  props: { ...FieldPropsDefine },
  setup(props) {
    const context: { SchemaItem: SchemaItemDefine } | undefined = inject(
      SchemaFormContextKey,
    );
    if (!context) {
      throw Error("SchemaForm should be used");
    }
    const handleObjectFieldChange = (key: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {};
      if (v === undefined) {
        delete value[key];
      } else {
        value[key] = v;
      }
      props.onChange(value);
    };
    return () => {
      const properties = props.schema.properties || {};
      const currentValue: any = isObject(props.value) ? props.value : {};
      const { SchemaItem } = context;

      return Object.keys(properties).map((key: string, index: number) => (
        <SchemaItem
          key={`${key}-${index}`}
          value={currentValue[key]}
          onChange={(v) => handleObjectFieldChange(key, v)}
          schema={properties[key]}
          rootSchema={props.rootSchema}
        />
      ));
    };
  },
});
