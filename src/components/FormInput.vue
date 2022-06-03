<script setup>
defineProps({
  modelValue: String | Number,
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
});
defineEmits(['update:modelValue', 'blur']);
</script>

<template>
  <label>
    {{ label }}: <span v-if="required" class="text-red-400">*</span>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      class="w-full text-sm border-0 border-b border-teal-700 bg-transparent focus:outline-none"
    />
  </label>
</template>
