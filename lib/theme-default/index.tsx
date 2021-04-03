import { Theme } from "../types";
import SelectionWidget from "./SelectionWidget";
import TextWidget from "./TextWidget";
import NumberWidget from "./NumberWidget";

const defaultTheme: Theme = {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget,
  },
};

export default defaultTheme;
