<template>
  <header></header>
  <main>
    <div class="flex">
      <Sidebar :pages="pages" :isSidebarVisible="isSidebarVisible" :minimizeAll="minimizeAll"
        :updateMinimizedAll="updateMinimizedAll" , :updateIsSidebarVisible="updateIsSidebarVisible" />
      <div class="w-full md:w-[calc(100%-288px)] 2xl:w-[calc(100%-368px)]">
        <nav class="flex items-center w-full p-4 border-b-[1px] border-neutral-800">
          <div class="flex items-center cursor-pointer md:hidden" @click="updateIsSidebarVisible">
            <Icon size="24px" color="oklch(87% 0 0)">
              <LayoutSidebarLeftExpand />
            </Icon>
          </div>
          <div>
            My nav bar
          </div>
        </nav>
        <div class="p-4">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import { Icon } from "@vicons/utils";
import { LayoutSidebarLeftExpand } from "@vicons/tabler";
import Sidebar from "./components/Sidebar.vue";

const isSidebarVisible = ref(false);
const minimizeAll = ref(false);

const updateIsSidebarVisible = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
}

const updateMinimizedAll = () => {
  minimizeAll.value = !minimizeAll.value;
}

const pages = [
  {
    name: "CPU Scheduling",
    icon: "DeveloperBoard24Regular",
    algorithms: [
      "Round Robin",
    ],
  },
];
</script>
