import { defineComponent, PropType } from "vue";
import { createUseStyles } from "vue-jss";
import { FieldPropsDefine, Schema } from "../types";
import useSchemaFormContext from "../hooks/useSchemaFormContext";

const useStyles = createUseStyles({
  container: {
    border: "1px solid #eee",
  },
  actions: {
    background: "#eee",
    padding: 10,
    textAlign: "right",
  },
  action: {
    "& + &": {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
});

const ArrayItemWrapper = defineComponent({
  name: "ArrayItemWrapper",
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classRef = useStyles();
    const handleAdd = () => props.onAdd(props.index);
    const handleDown = () => props.onDown(props.index);
    const handleUp = () => props.onUp(props.index);
    const handleDelete = () => props.onDelete(props.index);
    return () => {
      const classes = classRef.value;
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});

export default defineComponent({
  name: "ArrayField",
  props: { ...FieldPropsDefine },
  setup(props) {
    const context = useSchemaFormContext();
    const SchemaItem = context.SchemaItem;
    const getValue = () => {
      const { value } = props;
      return Array.isArray(value) ? value : [];
    };
    const handleArrayItemChange = (v: any, index: number) => {
      const value = getValue();
      value[index] = v;
      props.onChange(value);
    };
    const handleAdd = (index: number) => {
      const value = getValue();
      value.splice(index + 1, 0, undefined);
      props.onChange(value);
    };
    const handleDelete = (index: number) => {
      const value = getValue();
      value.splice(index, 1);
      props.onChange(value);
    };
    const handleUp = (index: number) => {
      if (index === 0) {
        return;
      }
      const value = getValue();
      const [moveItem] = value.splice(index, 1);
      value.splice(index - 1, 0, moveItem);
      props.onChange(value);
    };
    const handleDown = (index: number) => {
      const value = getValue();
      if (index === value.length - 1) {
        return;
      }
      const [moveItem] = value.splice(index, 1);
      value.splice(index + 1, 0, moveItem);
      props.onChange(value);
    };
    return () => {
      const { schema, value, rootSchema } = props;
      const schemaItems = schema.items;
      const isMultiType = Array.isArray(schemaItems);
      const isSelect = schemaItems && (schemaItems as any).enum;
      if (isMultiType) {
        const arr = Array.isArray(value) ? value : [];
        return (
          <>
            {(schemaItems as Schema[]).map((s: Schema, index: number) => {
              return (
                <SchemaItem
                  schema={s}
                  key={index}
                  rootSchema={rootSchema}
                  value={arr[index]}
                  onChange={(v) => handleArrayItemChange(v, index)}
                />
              );
            })}
          </>
        );
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : [];
        return (
          <>
            {arr.map((v: any, index: number) => {
              return (
                <ArrayItemWrapper
                  index={index}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  onUp={handleUp}
                  onDown={handleDown}
                >
                  <SchemaItem
                    schema={schemaItems as Schema}
                    value={v}
                    rootSchema={rootSchema}
                    onChange={(v) => handleArrayItemChange(v, index)}
                  />
                </ArrayItemWrapper>
              );
            })}
          </>
        );
      }
      return null;
    };
  },
});
