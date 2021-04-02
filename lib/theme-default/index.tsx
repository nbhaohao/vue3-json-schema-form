import { CommonWidgetPropsDefine, Theme } from "../types";
import SelectionWidget from "./SelectionWidget";
import TextWidget from "./TextWidget";
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
    SelectionWidget,
    TextWidget,
    NumberWidget: CommonWidget,
  },
};

export default defaultTheme;
