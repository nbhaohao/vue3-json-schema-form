import { CommonWidgetDefine, Theme } from "../types";
import Selection from "./Selection";

const themeDefault: Theme = {
  widgets: {
    SelectionWidget: Selection,
    TextWidget: Selection as CommonWidgetDefine,
    NumberWidget: Selection as CommonWidgetDefine,
  },
};

export default themeDefault;
