import { defineComponent } from "vue";

export default defineComponent({
  setup(p, { slots }) {
    return () => {
      return <div>this is form</div>;
    };
  },
});
