import { CommonFieldType } from "../types";
import { inject } from "vue";
import { SchemaFormContextKey } from "../context";

export default () => {
  const context: { SchemaItem: CommonFieldType } | undefined = inject(
    SchemaFormContextKey,
  );
  if (!context) {
    throw Error("SchemaForm should be used");
  }
  return context;
};
