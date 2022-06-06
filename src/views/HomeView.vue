<script setup>
import { onMounted, ref } from 'vue';

const welcomeText = ref('');

const welcomeTextArray = [
  "You're invited",
  'To an indepedence day',
  'Celebration!',
  'Saturday, July 2nd 2022, 5PM',
  'at the McBroom Household',
];

const delays = [
  'delay-[100ms]',
  'delay-[700ms]',
  'delay-[1200ms]',
  'delay-[1700ms]',
  'delay-[2200ms]',
  'delay-[2700ms]',
  'delay-[3200ms]',
];

onMounted(() => {
  const welcomeTextChildren = welcomeText.value.children;
  setTimeout(() => {
    [...welcomeTextChildren].forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-full');
      el.classList.add('opacity-100', 'translate-y-0');
    });
  }, 1000);
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen gap-2 capitalize font-serif"
    ref="welcomeText"
  >
    <div
      v-for="(text, index) in welcomeTextArray"
      :key="index"
      class="transition-all duration-1000 ease-in-out text-center font-bold opacity-0 translate-y-full"
      :class="`${delays[index]} ${index === 4 ? 'text-xl' : 'text-3xl'}`"
    >
      {{ text }}
    </div>

    <a
      class="transition-all duration-1000 ease-in-out text-center text-lg text-teal-300 font-bold underline font-sans opacity-0 translate-y-full"
      :class="delays[5]"
      href="https://www.google.com/maps/place/4015+Marsol+Ave,+Grove+City,+OH+43123/@39.8873554,-83.1114932,17z/data=!4m5!3m4!1s0x88389b104ec01a83:0x1cd3d603f6f71ad0!8m2!3d39.8874213!4d-83.1095406"
      target="_blank"
    >
      4015 Marsol Ave, Grove City, OH 43123
    </a>
    <button
      class="transition-all duration-1000 ease-in-out text-center text-lg text-zinc-50 bg-teal-300 px-3 py-1 mt-4 rounded font-sans opacity-0 translate-y-full"
      :class="delays[6]"
      @click="$router.push('/rsvp')"
    >
      RSVP
    </button>
  </div>
</template>
