<template>
  <div v-if="isSidebarVisible" class="absolute inset-0 z-10 h-dvh bg-black/30" @click.self="updateIsSidebarVisible">
  </div>

  <aside
    class="md:flex flex-col absolute -translate-x-[calc(100%+17px)] md:translate-x-0 duration-300 z-20 md:relative w-72 2xl:w-92 bg-neutral-900 border-r-[1px] border-neutral-800 h-[calc(100dvh-16px)] overflow-y-scroll scrollbar"
    :class="{ 'translate-x-0': isSidebarVisible }">
    <div class="flex items-center p-4 border-b-[1px] border-neutral-800">
      <div class="flex-1">
        ALGORITHMS
      </div>
      <div class="flex items-center gap-x-2">
        <div class="flex items-center cursor-pointer" @click="updateMinimizedAll">
          <Icon size="24px" color="oklch(87% 0 0)" class="duration-300" :class="{ 'rotate-180': minimizeAll }">
            <ArrowCollapseAll20Filled />
          </Icon>
        </div>
        <div class="flex items-center cursor-pointer md:hidden" @click="updateIsSidebarVisible">
          <Icon size="24px" color="oklch(87% 0 0)">
            <LayoutSidebarLeftCollapse />
          </Icon>
        </div>
      </div>
    </div>
    <div class="p-4 text-sm">
      <GroupTree v-for="(page, index) in pages" :key="index" :group="page" :icons="pageIcons" :path="[]"
        :showTreeLines="false" :minimizeAll="minimizeAll" :updateMinimizedAll="updateMinimizedAll" class="!ml-0 mb-2" />
    </div>
  </aside>
</template>

<script setup>
import { DeveloperBoard24Regular, LockClosed24Regular, Storage24Regular, Database20Regular, ArrowCollapseAll20Filled } from "@vicons/fluent";
import { VmdkDisk } from "@vicons/carbon";
import { LayoutSidebarLeftCollapse } from "@vicons/tabler";
import GroupTree from "./GroupTree.vue";
import { Icon } from "@vicons/utils";

const props = defineProps({
  pages: Array,
  isSidebarVisible: Boolean,
  minimizeAll: Boolean,
  updateIsSidebarVisible: {
    type: Function,
    default: () => { },
  },
  updateMinimizedAll: {
    type: Function,
    default: () => { },
  },
});

const pageIcons = {
  DeveloperBoard24Regular,
  LockClosed24Regular,
  Storage24Regular,
  Database20Regular,
  VmdkDisk
};

</script>