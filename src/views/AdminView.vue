<script setup>
import { onMounted, ref } from 'vue';
import FormInput from '@/components/FormInput.vue';
import RsvpList from '@/components/RsvpList.vue';
import { useRoute } from 'vue-router';

const isDevEnvOrAdmin = ref(false);

const correctPassword = 'McBroom10';
const showPasswordInput = ref(true);
const password = ref('');

const route = useRoute();

const submitPassword = () => {
  if (password.value === correctPassword) {
    showPasswordInput.value = false;
  }
};

onMounted(() => {
  isDevEnvOrAdmin.value = import.meta.env.DEV || route.query.admin;
});
</script>

<template>
  <div v-if="showPasswordInput && !isDevEnvOrAdmin">
    <form-input
      v-model="password"
      label="Password"
      type="password"
      @keyup="submitPassword"
    />
  </div>
  <rsvp-list v-else />
</template>
