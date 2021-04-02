import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ComputedRef,
} from "vue";
import { CommonWidgetNames, SelectionWidgetNames, Theme } from "./types";

const THEME_PROVIDER_KEY = Symbol("themeProviderKey");

const ThemeProvider = defineComponent({
  name: "JsonSchemaFormProvider",
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme);
    provide(THEME_PROVIDER_KEY, context);
    return () => <>{slots.default && slots.default()}</>;
  },
});

export function useGetWidget(name: SelectionWidgetNames | CommonWidgetNames) {
  const context: ComputedRef<Theme> | undefined = inject(THEME_PROVIDER_KEY);
  if (!context) {
    throw new Error("schemaForm theme required");
  }

  const widgetRef = computed(() => {
    return context.value.widgets[name];
  });

  return widgetRef;
}

export default ThemeProvider;
