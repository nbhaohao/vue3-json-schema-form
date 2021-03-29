import { defineComponent } from "vue";
import { FieldPropsDefine } from "../types";
import { isObject } from "../utils";
import useSchemaFormContext from "../hooks/useSchemaFormContext";

export default defineComponent({
  name: "ObjectField",
  props: { ...FieldPropsDefine },
  setup(props) {
    const context = useSchemaFormContext();
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
