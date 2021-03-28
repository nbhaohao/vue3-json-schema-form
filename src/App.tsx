import { defineComponent, ref, Ref } from "vue";
import { createUseStyles } from "vue-jss";
import MonacoEditor from "@/components/MonacoEditor";

function toJson(data: any) {
  return JSON.stringify(data, null, 2);
}

const schema = {
  type: "string",
};

const useStyles = createUseStyles({
  editor: {
    minHeight: 400,
  },
});

export default defineComponent({
  setup() {
    const schemaRef: Ref = ref(schema);
    const handleCodeChange = (code: string) => {
      let schema: any;
      try {
        schema = JSON.parse(code);
        schemaRef.value = schema;
      } catch (e) {
        console.log(e);
      }
    };
    const classesRef = useStyles();
    return () => {
      const classes = classesRef.value;
      const code = toJson(schemaRef.value);
      return (
        <div>
          <MonacoEditor
            class={classes.editor}
            title="Schema"
            onChange={handleCodeChange}
            code={code}
          />
        </div>
      );
    };
  },
});
