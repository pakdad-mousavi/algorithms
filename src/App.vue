<template>
  <header></header>
  <main>
    <div class="flex">
      <div v-if="isSidebarVisible" class="absolute inset-0 z-10 h-dvh bg-black/30"
        @click.self="isSidebarVisible = false"></div>

      <aside
        class="md:flex flex-col absolute -translate-x-[calc(100%+17px)] md:translate-x-0 duration-300 z-20 md:relative w-72 2xl:w-92 bg-neutral-900 border-r-[1px] border-neutral-800 h-[calc(100dvh-16px)] overflow-y-scroll scrollbar"
        :class="{ 'translate-x-0': isSidebarVisible }">
        <div class="flex p-4 border-b-[1px] border-neutral-800">
          <div class="flex-1">
            ALGORITHMS
          </div>
          <div>
            <div class="flex items-center md:hidden cursor-pointer" @click="isSidebarVisible = !isSidebarVisible">
              <Icon size="24px" color="oklch(87% 0 0)">
                <LayoutSidebarLeftCollapse />
              </Icon>
            </div>

          </div>
        </div>
        <div class="p-4 text-sm">
          <GroupTree v-for="(page, index) in pages" :key="index" :group="page" :icons="pageIcons" :path="[]"
            :showTreeLines="false" class="!ml-0 mb-2" />
        </div>
      </aside>

      <div class="w-full md:w-[calc(100%-288px)] 2xl:w-[calc(100%-368px)]">
        <nav class="flex items-center w-full p-4 border-b-[1px] border-neutral-800">
          <div class="flex items-center md:hidden cursor-pointer" @click="isSidebarVisible = !isSidebarVisible">
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
import GroupTree from "./components/GroupTree.vue";
import { ref } from "vue";
import { Icon } from "@vicons/utils";
import { DeveloperBoard24Regular, LockClosed24Regular, Storage24Regular, Database20Regular, ArrowCollapseAll20Filled } from '@vicons/fluent';
import { LayoutSidebarLeftCollapse, LayoutSidebarLeftExpand } from "@vicons/tabler";
import { VmdkDisk } from "@vicons/carbon";

const isSidebarVisible = ref(false);

const pageIcons = {
  DeveloperBoard24Regular,
  LockClosed24Regular,
  Storage24Regular,
  Database20Regular,
  ArrowCollapseAll20Filled,
  VmdkDisk
};

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
