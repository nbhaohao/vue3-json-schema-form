import { defineComponent, PropType } from "vue";
import { Schema, SchemaTypes } from "./types";
import StringField from "./fields/StringField";
import NumberField from "./fields/NumberField";

export default defineComponent({
  name: "SchemaItems",
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
  setup(props) {
    return () => {
      const { schema } = props;

      // TODO: 如果 type 没有指定，我们需要猜测这个 type

      const type = schema.type;
      let Component: any;
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField;
          break;
        case SchemaTypes.NUMBER:
          Component = NumberField;
          break;
        default:
          Component = null;
          console.warn(`${type} is not supported`);
      }
      return <Component {...props} />;
    };
  },
});
