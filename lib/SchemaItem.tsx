import { defineComponent, computed } from "vue";
import { FieldPropsDefine, SchemaTypes } from "./types";
import StringField from "./fields/StringField.vue";
import NumberField from "./fields/NumberField.vue";

import { retrieveSchema } from "./utils";
import ObjectField from "./fields/ObjectField";

export default defineComponent({
  name: "SchemaItem",
  props: { ...FieldPropsDefine },
  setup(props) {
    const retrievedSchemaRef = computed(() =>
      retrieveSchema(props.schema, props.rootSchema, props.value),
    );
    return () => {
      // TODO: 如果 type 没有指定，我们需要猜测这个 type

      const { type } = props.schema;
      let Component: any;
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField;
          break;
        case SchemaTypes.NUMBER:
          Component = NumberField;
          break;
        case SchemaTypes.OBJECT:
          Component = ObjectField;
          break;
        default:
          Component = null;
          console.warn(`${type} is not supported`);
      }
      return <Component {...props} schema={retrievedSchemaRef.value} />;
    };
  },
});
