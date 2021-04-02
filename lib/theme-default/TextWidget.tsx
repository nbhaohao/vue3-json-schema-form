import { defineComponent } from "vue";
import { CommonWidgetPropsDefine } from "../types";

export default defineComponent({
  name: "TextWidget",
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
        <input type="text" value={props.value as any} onInput={handleChange} />
      );
    };
  },
});
