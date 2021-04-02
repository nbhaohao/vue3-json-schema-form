import { defineComponent } from "vue";
import { FieldPropsDefine } from "../types";

export default defineComponent({
  name: "StringField",
  props: {
    ...FieldPropsDefine,
  },
  setup(props) {
    const handleChange = (e: Event) => {
      const input = (e.target as HTMLInputElement).value;
      props.onChange(input);
    };
    return () => {
      return (
        <input type="text" value={props.value as any} onInput={handleChange} />
      );
    };
  },
});
