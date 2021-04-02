import { CommonFieldType, Theme } from "../types";
import { inject } from "vue";
import { SchemaFormContextKey } from "../context";

export default () => {
  const context:
    | { SchemaItem: CommonFieldType; theme: Theme }
    | undefined = inject(SchemaFormContextKey);
  if (!context) {
    throw Error("SchemaForm should be used");
  }
  return context;
};
