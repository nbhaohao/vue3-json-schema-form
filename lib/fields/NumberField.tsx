import { defineComponent } from "vue";
import { CommonWidgetNames, FieldPropsDefine } from "../types";
import { useGetWidget } from "../theme";

export default defineComponent({
  name: "NumberField",
  props: {
    ...FieldPropsDefine,
  },
  setup(props) {
    const handleChange = (value: string) => {
      const num = Number(value);
      if (Number.isNaN(num)) {
        props.onChange(undefined);
        return;
      }
      props.onChange(num);
    };
    const NumberWidgetRef = useGetWidget(CommonWidgetNames.NumberWidget);
    return () => {
      const { schema, rootSchema, ...rest } = props;
      const NumberWidget = NumberWidgetRef.value;
      return <NumberWidget {...rest} onChange={handleChange} />;
    };
  },
});
