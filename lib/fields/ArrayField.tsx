import { defineComponent } from "vue";
import { FieldPropsDefine } from "../types";
import useSchemaFormContext from "../hooks/useSchemaFormContext";

export default defineComponent({
  name: "ArrayField",
  props: { ...FieldPropsDefine },
  setup(props) {
    const context = useSchemaFormContext();
    return () => {
      const SchemaItem = context.SchemaItem;

      return null;
    };
  },
});
