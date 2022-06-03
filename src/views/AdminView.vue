<script setup>
import { ref } from 'vue';
import FormInput from '@/components/FormInput.vue';
import RsvpList from '@/components/RsvpList.vue';

const correctPassword = 'McBroom10';
const showPasswordInput = ref(true);
const password = ref('');

const submitPassword = () => {
  if (password.value === correctPassword) {
    showPasswordInput.value = false;
  }
};
</script>

<template>
  <div v-if="showPasswordInput">
    <form-input
      v-model="password"
      label="Password"
      type="password"
      @keyup="submitPassword"
    />
  </div>
  <rsvp-list v-else />
</template>
