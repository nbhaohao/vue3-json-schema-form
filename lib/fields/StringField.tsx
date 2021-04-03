import { defineComponent } from "vue";
import { CommonWidgetNames, FieldPropsDefine } from "../types";
import { useGetWidget } from "../theme";

export default defineComponent({
  name: "StringField",
  props: {
    ...FieldPropsDefine,
  },
  setup(props) {
    const TextWidgetRef = useGetWidget(CommonWidgetNames.TextWidget);
    const handleChange = (value: string) => {
      props.onChange(value);
    };
    return () => {
      const { rootSchema, errorSchema, ...rest } = props;
      const TextWidget = TextWidgetRef.value;
      return (
        <TextWidget
          {...rest}
          errors={errorSchema.__errors}
          onChange={handleChange}
        />
      );
    };
  },
});
