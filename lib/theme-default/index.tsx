import { defineComponent } from "vue";

export default defineComponent({
  name: "ThemeDefault",
  setup() {
    return () => {
      return <div>hello world</div>;
    };
  },
});
