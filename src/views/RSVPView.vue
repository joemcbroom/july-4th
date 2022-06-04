<script setup>
import FormInput from '@/components/FormInput.vue';
import { useRsvpStore } from '@/stores/rsvp';
import { supabase } from '@/supabase';
import { computed, ref } from 'vue';

const rsvpFormData = useRsvpStore();

const dishes = ref([]);
const showDishes = ref(false);
const hasSubmission = ref(false);
const showSuccessMessage = ref(false);

const handleDishes = async () => {
  try {
    const { data: rsvps, error } = await supabase.from('rsvps').select('dish');

    if (error) throw error;

    dishes.value = rsvps.map(rsvp => rsvp.dish);
    showDishes.value = true;
  } catch (error) {
    console.log(error);
  }
};

const checkForSubmission = async () => {
  try {
    const { data: rsvps, error } = await supabase
      .from('rsvps')
      .select('*')
      .match({
        email: rsvpFormData.email,
      });

    if (error) throw error;

    if (rsvps.length) {
      hasSubmission.value = true;
      rsvpFormData.$patch(rsvps[0]);
    } else {
      hasSubmission.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const validateRsvpForm = computed(() => {
  const { email, name, numberOfAdults } = rsvpFormData;
  return email && name && numberOfAdults;
});

const submitRsvp = async () => {
  try {
    const {
      email,
      name,
      phone,
      numberOfAdults,
      numberOfChildren,
      attending,
      dish,
    } = rsvpFormData;
    const updates = {
      email,
      name,
      phone,
      numberOfAdults,
      numberOfChildren,
      attending,
      dish,
    };

    let error;
    if (hasSubmission.value) {
      const { error } = await supabase.from('rsvps').update(updates).match({
        email,
      });
      if (error) throw error;
    } else {
      const { error } = await supabase.from('rsvps').insert(updates);
      if (error) throw error;
    }

    showSuccessMessage.value = true;
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="bg-slate-700 bg-opacity-75 p-8">
    <h1 class="text-xl font-bold text-center my-2">RSVP</h1>
    <form class="flex flex-col gap-3" prevent v-if="!showSuccessMessage">
      <form-input
        v-model="rsvpFormData.email"
        label="Email"
        placeholder="smithfamily@gmail.com"
        required
        @blur="checkForSubmission"
      />
      <form-input
        v-model="rsvpFormData.name"
        :label="'Name'"
        placeholder="The Smith Family"
        required
      />
      <form-input
        v-model="rsvpFormData.phone"
        label="Phone"
        placeholder="(555) 555-5555"
      />
      <label class="w-full flex items-center justify-between accent-teal-600">
        Attending?
        <input
          type="checkbox"
          class="transform scale-110"
          v-model="rsvpFormData.attending"
        />
      </label>
      <form-input
        v-model="rsvpFormData.numberOfAdults"
        label="Adults"
        type="number"
        placeholder="0"
        required
      />
      <form-input
        v-model="rsvpFormData.numberOfChildren"
        label="Children"
        type="number"
        placeholder="0"
      />
      <form-input
        v-model="rsvpFormData.dish"
        label="Dish (optional)"
        placeholder="Chips, Cupcakes, Beer, etc."
      />
      <div class="text-xs select-none">
        Click
        <span @click="handleDishes" class="text-teal-500 underline font-bold">
          here
        </span>
        to see what dishes other people are bringing
      </div>
      <div v-if="showDishes" class="text-xs bg-zinc-700 border p-3 relative">
        <div v-for="dish in dishes">
          {{ dish }}
        </div>
        <div
          class="absolute bottom-1 right-1 text-teal-500 underline"
          @click="showDishes = false"
        >
          Close
        </div>
      </div>
      <button
        @click.prevent="submitRsvp"
        class="w-full bg-teal-700 px-3 py-1 mt-4 rounded font-sans"
        :class="
          validateRsvpForm
            ? 'pointer-events-auto'
            : 'pointer-events-none opacity-50'
        "
      >
        Submit
      </button>
    </form>
    <div
      class="text-lg flex flex-col items-center gap-4 mt-4 text-center"
      v-else
    >
      <div>Your RSVP has been submitted successfully!</div>
      <div>We look forward to seeing you there!</div>
      <a
        class="text-center text-lg text-teal-300 font-bold underline font-sans"
        href="https://www.google.com/maps/place/4015+Marsol+Ave,+Grove+City,+OH+43123/@39.8873554,-83.1114932,17z/data=!4m5!3m4!1s0x88389b104ec01a83:0x1cd3d603f6f71ad0!8m2!3d39.8874213!4d-83.1095406"
        target="_blank"
      >
        4015 Marsol Ave, Grove City, OH 43123
      </a>
      <button
        class="w-full bg-teal-700 px-3 py-1 mt-4 rounded font-sans"
        @click="showSuccessMessage = false"
      >
        Edit RSVP
      </button>
    </div>
  </div>
</template>
