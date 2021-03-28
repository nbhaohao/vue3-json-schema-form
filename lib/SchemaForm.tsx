import { defineComponent, PropType } from "vue";
import { Schema } from "./types";
import SchemaItem from "./SchemaItem";

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
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v);
    };
    return () => {
      return (
        <SchemaItem
          schema={props.schema}
          rootSchema={props.schema}
          value={props.value}
          onChange={handleChange}
        />
      );
    };
  },
});
