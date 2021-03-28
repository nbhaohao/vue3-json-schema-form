<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { FieldPropsDefine } from "../types";

const props = defineProps({ ...FieldPropsDefine });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleChange = (e: InputEvent) => {
  const input = (e.target as HTMLInputElement).value;
  const num = Number(input);
  if (Number.isNaN(num)) {
    props.onChange(undefined);
    return;
  }
  props.onChange(num);
};
</script>
