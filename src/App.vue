<template>
  <main class="mx-auto max-w-7xl">
    <div class="flex">
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="isSidebarVisible = !isSidebarVisible"
        @on-change-algorithm="(alg) => activeAlgorithm = alg">
      </Sidebar>
      <div class="flex-1"></div>
      <div class="w-full lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-368px)]">
        <NavBar @toggle-sidebar="isSidebarVisible = !isSidebarVisible" :algorithm="activeAlgorithm"
          @on-change-algorithm="activeAlgorithm = ['Home']"></NavBar>
        <div class="relative mt-13">
          <RouterView v-slot="{ Component }">
            <Transition>
              <component :is="Component"></component>
            </Transition>
          </RouterView>
        </div>
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
