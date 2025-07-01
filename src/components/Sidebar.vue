<template>
  <div v-if="isSidebarVisible" class="fixed inset-0 z-50 h-vh bg-black/30" @click.self="emit('toggle-sidebar')">
  </div>
  <aside
    class="lg:flex flex-col -translate-x-[calc(100%+17px)] lg:translate-x-0 duration-300 fixed w-72 bg-zinc-900 border-r-[1px] border-neutral-800 h-svh lg:h-[calc(100svh-52px)] overflow-y-scroll scrollbar z-60 lg:mt-13"
    :class="{ 'translate-x-0': isSidebarVisible }">
    <div class="flex items-center px-4 py-3.25 border-b-[1px] border-neutral-800 lg:hidden">
      <div class="flex-1">
        <div class="flex items-center text-sm font-medium gap-x-2 !bg-[none]" @click="goToHomePage()">
          <img src="/logo.svg" alt="" class="w-6">
          <span>Learning Algorithms</span>
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <div class="flex items-center cursor-pointer lg:hidden" @click="emit('toggle-sidebar')">
          <Icon size="18px" color="oklch(87% 0 0)">
            <LayoutSidebarLeftCollapse />
          </Icon>
        </div>
      </div>
    </div>
    <div class="p-4 text-sm">
      <GroupTree @on-change-algorithm="(algorithm => emit('on-change-algorithm', algorithm))" class="!ml-0 mb-2" />
    </div>
  </aside>
</template>

<script setup>

import { LayoutSidebarLeftCollapse } from "@vicons/tabler";
import GroupTree from "./GroupTree.vue";
import { Icon } from "@vicons/utils";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  isSidebarVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle-sidebar']);
const router = useRouter();

// Hide the sidebar if its open and the user expands the screen past breakpoint
const mediaQuery = window.matchMedia('(min-width: 1024px)');
const handleResize = () => {
  if (mediaQuery.matches && props.isSidebarVisible) {
    emit('toggle-sidebar');
  }
};

const goToHomePage = () => {
  // Send to home page
  router.push('/');
};

onMounted(() => {
  mediaQuery.addEventListener('change', handleResize);
  handleResize(); // Run once on mount
});

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleResize);
});

</script>