import { CommonWidgetPropsDefine, Theme } from "../types";
import Selection from "./Selection";
import { defineComponent } from "vue";

const CommonWidget = defineComponent({
  props: {
    ...CommonWidgetPropsDefine,
  },
  setup() {
    return () => {
      return null;
    };
  },
});

const defaultTheme: Theme = {
  widgets: {
    SelectionWidget: Selection,
    TextWidget: CommonWidget,
    NumberWidget: CommonWidget,
  },
};

export default defaultTheme;
