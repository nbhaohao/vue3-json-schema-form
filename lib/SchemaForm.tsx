import { defineComponent, PropType } from "vue";
import { Schema, SchemaTypes } from "./types";
import SchemaItems from "./SchemaItems";

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  name: "SchemaForm",
  setup(props, { slots }) {
    const handleChange = (v: any) => {
      props.onChange(v);
    };
    return () => {
      return (
        <SchemaItems
          schema={props.schema}
          value={props.value}
          onChange={handleChange}
        />
      );
    };
  },
});
