import { defineComponent } from "vue";
import { FieldPropsDefine } from "../types";

export default defineComponent({
  name: "NumberField",
  props: {
    ...FieldPropsDefine,
  },
  setup(props) {
    const handleChange = (e: Event) => {
      const input = (e.target as HTMLInputElement).value;
      const num = Number(input);
      if (Number.isNaN(num)) {
        props.onChange(undefined);
        return;
      }
      props.onChange(num);
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
});
