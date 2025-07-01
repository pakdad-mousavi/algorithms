<template>
  <main class="mx-auto max-w-7xl">
    <NavBar @toggle-sidebar="isSidebarVisible = !isSidebarVisible" :algorithm="activeAlgorithm"
      @on-change-algorithm="activeAlgorithm = ['Home']"></NavBar>
    <div class="flex">
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="isSidebarVisible = !isSidebarVisible"
        @on-change-algorithm="(alg) => activeAlgorithm = alg">
      </Sidebar>
      <div class="flex-1"></div>
      <div class="w-full lg:w-[calc(100%-288px)]">
        <main class="relative p-4 mx-auto space-y-4 mt-26 lg:mt-13 text-neutral-300 sm:w-11/12">
          <RouterView v-slot="{ Component }">
            <Transition>
              <component :is="Component"></component>
            </Transition>
          </RouterView>
        </main>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref, Transition, watch } from "vue";
import Sidebar from "./components/Sidebar.vue";
import NavBar from "./components/NavBar.vue";

const isSidebarVisible = ref(false);
const activeAlgorithm = ref(["Home"]);

watch(isSidebarVisible, (visible) => {
  document.body.classList.toggle('overflow-hidden', visible);
});

</script>
