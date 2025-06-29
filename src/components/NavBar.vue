<template>
  <nav
    class="flex items-center gap-4 px-4 py-3.25 sm:py-2 border-b-[1px] border-neutral-800 fixed bg-zinc-900 w-full lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-368px)] z-40 text-sm">
    <!-- Banner -->
    <RouterLink class="flex items-center flex-1 gap-x-2 lg:hidden" to="/">
      <img src="/logo.svg" alt="" class="w-6">
      <span class="font-medium">Learning Algorithms</span>
    </RouterLink>
    <!-- Sidebar toggle -->
    <div class="flex items-center cursor-pointer gap-x-1 lg:hidden" @click="emit('toggle-sidebar')">
      <Icon size="18px" color="oklch(87% 0 0)">
        <LayoutSidebarLeftExpand></LayoutSidebarLeftExpand>
      </Icon>
      <span>Menu</span>
    </div>
    <!-- Breadcrumbs -->
    <div class="flex-1 hidden w-full lg:flex gap-x-2">
      <div class="flex items-center gap-x-2" v-for="(crumb, index) in algorithm">
        <span class="text-zinc-500 last:!text-white">{{ crumb }}</span>
        <Icon size="18px" v-if="index != algorithm.length - 1">
          <ChevronRight></ChevronRight>
        </Icon>
      </div>
    </div>
    <!-- Buttons -->
    <div class="hidden gap-x-2 sm:flex">
      <a target="_blank" href="https://github.com/pakdad-mousavi/algorithms" class="flex items-center gap-x-2 btn">
        <Icon>
          <Github></Github>
        </Icon>
        <span>Github</span>
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ChevronRight, LayoutSidebarLeftExpand } from "@vicons/tabler";
import { Github } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import { RouterLink } from "vue-router";

defineProps({
  algorithm: {
    type: Array,
    default: () => [],
  }
});

const emit = defineEmits(['toggle-sidebar']);

</script>