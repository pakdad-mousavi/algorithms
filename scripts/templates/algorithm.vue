<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <!-- Explanation for "__ALGORITHM_NAME__" goes here -->
        <p>The __ALGORITHM_NAME__ is used to...</p>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <!-- Visualizer goes here -->
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <p>so thats how the algorithm works!</p>
      </div>
    </template>
  </TabSwitcher>
</template>

<script setup>
import TabSwitcher from '@/components/TabSwitcher.vue';
import { tabs } from '@/state/tabState';
</script>