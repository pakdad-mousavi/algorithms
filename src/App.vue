<template>
  <main class="mx-auto max-w-7xl">
    <div class="flex">
      <Sidebar :pages="pages" :isSidebarVisible="isSidebarVisible"
        @toggle-sidebar="isSidebarVisible = !isSidebarVisible" @on-change-algorithm="(alg) => activeAlgorithm = alg">
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

const emit = defineEmits(['on-change-algorithm']);

const pages = [
  {
    name: "CPU Scheduling",
    icon: "DeveloperBoard24Regular",
    algorithms: [
      "Round Robin",
      "First Come First Serve",
      "Priority",
      "Shortest Job First",
    ],
  },
  {
    name: "Deadlock Management",
    icon: "LockClosed24Regular",
    algorithms: [
      "Banker's Algorithm",
    ]
  },
];

console.log(pages[0]);
</script>
