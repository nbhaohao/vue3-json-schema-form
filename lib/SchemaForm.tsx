import {
  defineComponent,
  PropType,
  provide,
  Ref,
  shallowRef,
  watch,
  watchEffect,
} from "vue";
import { Schema } from "./types";
import SchemaItem from "./SchemaItem";
import { SchemaFormContextKey } from "./context";
import Ajv, { Options } from "ajv";
import { ErrorSchema, validateFormData } from "./validator";

interface ContextRef {
  doValidate: () => {
    errors: any[];
    valid: boolean;
  };
}

const DEFAULT_AJV_OPTIONS: Options = {
  allErrors: true,
};

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
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String,
      default: "zh",
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

    const validatorRef: Ref<Ajv> = shallowRef() as Ref<Ajv>;

    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({});

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...DEFAULT_AJV_OPTIONS,
        ...props.ajvOptions,
      });
    });

    provide(SchemaFormContextKey, context);
    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          // eslint-disable-next-line vue/no-mutating-props
          props.contextRef.value = {
            doValidate() {
              const result = validateFormData(
                validatorRef.value,
                props.value,
                props.schema,
                props.locale,
              );
              errorSchemaRef.value = result.errorSchema;
              return result;
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
          errorSchema={errorSchemaRef.value || {}}
          schema={props.schema}
          rootSchema={props.schema}
          value={props.value}
          onChange={handleChange}
        />
      );
    };
  },
});
