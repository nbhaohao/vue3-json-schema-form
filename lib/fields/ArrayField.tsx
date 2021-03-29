import { defineComponent } from "vue";
import { FieldPropsDefine, Schema } from "../types";
import useSchemaFormContext from "../hooks/useSchemaFormContext";

export default defineComponent({
  name: "ArrayField",
  props: { ...FieldPropsDefine },
  setup(props) {
    const context = useSchemaFormContext();
    const SchemaItem = context.SchemaItem;
    const handleMultipleTypeChange = (v: any, index: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];

      arr[index] = v;
      props.onChange(arr);
    };
    return () => {
      const { schema, value, rootSchema } = props;
      const schemaItems = schema.items;
      const isMultiType = Array.isArray(schemaItems);
      if (isMultiType) {
        const arr = Array.isArray(value) ? value : [];
        return (
          <>
            {(schemaItems as Schema[]).map((s: Schema, index: number) => {
              return (
                <SchemaItem
                  schema={s}
                  key={index}
                  rootSchema={rootSchema}
                  value={arr[index]}
                  onChange={(v) => handleMultipleTypeChange(v, index)}
                />
              );
            })}
          </>
        );
      }
      return null;
    };
  },
});
