<script setup>
defineProps({
  rsvps: {
    type: Array,
    default: () => [],
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full text-sm">
    <div
      v-for="rsvp in rsvps"
      :key="rsvp.id"
      class="flex justify-between items-center h-12"
      :class="rsvp.attending ? 'bg-transparent' : 'bg-red-400'"
    >
      <div>
        Name: <span>{{ rsvp.name }}</span>
      </div>
    </div>
  </div>
</template>
