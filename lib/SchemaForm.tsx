import { defineComponent, PropType, provide, Ref, watch } from "vue";
import { Schema } from "./types";
import SchemaItem from "./SchemaItem";
import { SchemaFormContextKey } from "./context";

interface ContextRef {
  doValidate: () => {
    errors: any[];
    valid: boolean;
  };
}

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
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
  },
  name: "SchemaForm",
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v);
    };
    const context = {
      SchemaItem,
    };
    provide(SchemaFormContextKey, context);
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          // eslint-disable-next-line vue/no-mutating-props
          props.contextRef.value = {
            doValidate() {
              console.log("doValidate");
              return {
                valid: true,
                errors: [],
              };
            },
          };
        }
      },
      {
        immediate: true,
      },
    );
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
