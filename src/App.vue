<script setup>
import { RouterLink, RouterView } from 'vue-router';
import lottie from 'lottie-web';
import { onMounted, ref } from 'vue';
import fireworks from '@/assets/7393-fireworks.json';
import router from './router';

const keysPressed = ref('');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById('fireworks'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: fireworks,
  });
  window.addEventListener('keyup', e => {
    if (alphabet.includes(e.key)) {
      keysPressed.value += e.key;
    }
    if (keysPressed.value.indexOf('admin') > -1) {
      router.push('/admin?admin=true');
    }
  });
});
</script>

<template>
  <main
    class="relative min-h-screen w-screen bg-slate-800 grid place-items-center"
  >
    <RouterView class="z-10" />
    <div id="fireworks" class="absolute w-screen h-screen m-auto z-0" />
  </main>
</template>
