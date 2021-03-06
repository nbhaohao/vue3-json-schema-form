import { defineComponent } from "vue";
import { CommonWidgetPropsDefine } from "../types";
import { createUseStyles } from "vue-jss";

const useStyles = createUseStyles({
  container: {},
  label: {
    display: "block",
    color: "#777",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    margin: "5px 0",
    padding: 0,
    paddingLeft: 20,
  },
});
const FomItem = defineComponent({
  name: "FormItem",
  props: {
    ...CommonWidgetPropsDefine,
  },
  setup(props, { slots }) {
    const classesRef = useStyles();
    return () => {
      const { schema, errors } = props;
      const classes = classesRef.value;
      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul class={classes.errorText}>
            {errors?.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      );
    };
  },
});

export default FomItem;

export function withFormItem(Widget: any) {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: { ...CommonWidgetPropsDefine },
    setup(props, { attrs }) {
      return () => {
        return (
          <FomItem {...props}>
            <Widget {...props} {...attrs} />
          </FomItem>
        );
      };
    },
  }) as any;
}
