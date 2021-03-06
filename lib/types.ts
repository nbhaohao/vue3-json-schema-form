import { DefineComponent, PropType } from "vue";
import { SelectionWidgetPropsDefine } from "./widgets/Selection";
import { ErrorSchema } from "./validator";

export enum SchemaTypes {
  "NUMBER" = "number",
  "INTEGER" = "integer",
  "STRING" = "string",
  "OBJECT" = "object",
  "ARRAY" = "array",
  "BOOLEAN" = "boolean",
}

type SchemaRef = { $ref: string };

export interface Schema {
  type?: SchemaTypes | string;
  const?: any;
  format?: string;

  title?: string;
  default?: any;

  properties?: {
    [key: string]: Schema;
  };
  items?: Schema | Schema[] | SchemaRef;
  uniqueItems?: any;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  anyOf?: Schema[];
  allOf?: Schema[];
  // TODO: uiSchema
  // vjsf?: VueJsonSchemaConfig
  required?: string[];
  enum?: any[];
  enumNames?: any[];
  enumKeyValue?: any[];
  additionalProperties?: any;
  additionalItems?: Schema;

  minLength?: number;
  maxLength?: number;
  minimun?: number;
  maximum?: number;
  multipleOf?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    required: true,
  },
} as const;

export const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<Array<string>>,
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
} as const;

export type CommonFieldType = DefineComponent<typeof FieldPropsDefine>;
export type CommonWidgetType = DefineComponent<typeof CommonWidgetPropsDefine>;

export type SelectionWidgetType = DefineComponent<
  typeof SelectionWidgetPropsDefine & typeof CommonWidgetPropsDefine
>;

export enum SelectionWidgetNames {
  SelectionWidget = "SelectionWidget",
}

export enum CommonWidgetNames {
  TextWidget = "TextWidget",
  NumberWidget = "NumberWidget",
}

export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionWidgetType;
    [CommonWidgetNames.TextWidget]: CommonWidgetType;
    [CommonWidgetNames.NumberWidget]: CommonWidgetType;
  };
}
