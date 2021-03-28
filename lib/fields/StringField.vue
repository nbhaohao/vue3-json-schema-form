<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { FieldPropsDefine } from "../types";

// console.log("FieldPropsDefine", FieldPropsDefine);
// const props = defineProps(FieldPropsDefine);

const props = defineProps({ ...FieldPropsDefine });

const handleChange = (e: InputEvent) => {
  const input = (e.target as HTMLInputElement).value;
  props.onChange(input);
};
</script>
