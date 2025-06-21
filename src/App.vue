<template>
  <header></header>
  <main>
    <div class="flex">
      <Sidebar :pages="pages" :isSidebarVisible="isSidebarVisible"
        @toggle-sidebar="isSidebarVisible = !isSidebarVisible" />
      <div class="w-full lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-368px)]">
        <nav class="flex items-center w-full p-4 border-b-[1px] border-neutral-800">
          <div class="flex items-center cursor-pointer lg:hidden" @click="isSidebarVisible = !isSidebarVisible">
            <Icon size="24px" color="oklch(87% 0 0)">
              <LayoutSidebarLeftExpand />
            </Icon>
          </div>
          <div>
            My nav bar
          </div>
        </nav>
        <div class="relative">
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
import { ref, Transition } from "vue";
import { Icon } from "@vicons/utils";
import { LayoutSidebarLeftExpand } from "@vicons/tabler";
import Sidebar from "./components/Sidebar.vue";

const isSidebarVisible = ref(false);

const pages = [
  {
    name: "CPU Scheduling",
    icon: "DeveloperBoard24Regular",
    algorithms: [
      "Round Robin",
      "First Come First Serve",
    ],
  },
];
</script>
