import { defineComponent } from "vue";
import { CommonWidgetPropsDefine, CommonWidgetType } from "../types";

export default defineComponent({
  name: "NumberWidget",
  props: {
    ...CommonWidgetPropsDefine,
  },
  setup(props) {
    const handleChange = (e: Event) => {
      const input = (e.target as HTMLInputElement).value;
      // hack 在 Vue 中实现受控组件
      (e.target as HTMLInputElement).value = props.value as any;
      props.onChange(input);
    };
    return () => {
      return (
        <input
          type="number"
          value={props.value as any}
          onInput={handleChange}
        />
      );
    };
  },
}) as CommonWidgetType;
