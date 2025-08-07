<template>
  <div class="mb-14">
    <div class="my-8">
      <div class="relative flex justify-center">
        <div
          class="absolute top-0 bottom-0 bg-emerald-400/50 aspect-square -z-10 blur-3xl opacity-30 animate-[pulse_5s_3s_infinite]">
        </div>
        <Logo :animated="true"></Logo>
      </div>
      <div class="mt-6 space-y-2 text-center">
        <h1 class="text-4xl font-bold opacity-0 title">Learning Algorithms</h1>
        <p class="text-lg opacity-0 subtitle">A Visual Guide to Understanding <span class="text-main">Algorithms</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center opacity-0 gap-y-4 content">
      <p class="text-center lg:w-4/5">
        A minimalist platform for learning algorithms visually with step-by-step explanations, clean interfaces, and
        intuitive breakdowns to help you truly understand how algorithms work.
      </p>
      <div>
        <div class="btn" @click="router.push(firstRoute.path)">Start Learning</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const firstRoute = router.getRoutes()[0];
</script>

<style scoped></style>