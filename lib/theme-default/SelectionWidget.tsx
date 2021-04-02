import { defineComponent, PropType, ref, watch } from "vue";
import { CommonWidgetPropsDefine } from "../types";

export const SelectionWidgetPropsDefine = {
  options: {
    type: Array as PropType<Array<{ key: string; value: any }>>,
    required: true,
  },
} as const;

export default defineComponent({
  name: "SelectionWidget",
  props: {
    ...CommonWidgetPropsDefine,
    ...SelectionWidgetPropsDefine,
  },
  setup(props) {
    const currentValueRef = ref(props.value);
    watch(currentValueRef, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        props.onChange(newValue);
      }
    });
    watch(
      () => props.value,
      (value) => {
        if (value !== currentValueRef.value) {
          currentValueRef.value = value;
        }
      },
    );
    return () => {
      const { options } = props;
      return (
        <select multiple v-model={currentValueRef.value}>
          {options.map((option) => (
            <option value={option.value}>{option.key}</option>
          ))}
        </select>
      );
    };
  },
});
