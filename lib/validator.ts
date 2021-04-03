import Ajv, { ErrorObject } from "ajv";
import toPath from "lodash/toPath";

import i18n from "ajv-i18n";

import { Schema } from "./types";

interface TransformedErrorObject {
  name: string;
  property: string;
  message: string | undefined;
  params: Record<string, any>;
  schemaPath: string;
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema;
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[];
};

function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 1) {
    return {};
  }
  return errors.reduce((errorSchema, error) => {
    const { property, message } = error;
    const path = toPath(
      property && property.startsWith("/") ? property.slice(1) : property,
    );
    let parent = errorSchema;
    if (path.length > 0 && path[0] === "") {
      path.splice(0, 1);
    }
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        (parent as any)[segment] = {};
      }
      parent = parent[segment];
    }

    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || "");
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }
    return errorSchema;
  }, {} as ErrorSchema);
}

function transformErrors(
  errors: ErrorObject[] | null | undefined,
): Array<TransformedErrorObject> {
  if (errors === null || errors === undefined) {
    return [];
  }
  return errors.map(
    ({ message, instancePath, keyword, params, schemaPath }) => {
      return {
        name: keyword,
        property: `${instancePath}`,
        message,
        params,
        schemaPath,
      };
    },
  );
}

export function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale = "zh",
) {
  let validationError = null;
  try {
    validator.validate(schema, formData);
  } catch (err) {
    validationError = err;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  i18n[locale](validator.errors);
  let errors = transformErrors(validator.errors);
  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message,
      } as TransformedErrorObject,
    ];
  }
  const errorSchema = toErrorSchema(errors);

  return {
    errors,
    errorSchema,
    valid: errors.length === 0,
  };
}
