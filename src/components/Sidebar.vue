<template>
  <div v-if="isSidebarVisible" class="fixed inset-0 z-50 h-vh bg-black/30" @click.self="emit('toggle-sidebar')">
  </div>
  <aside
    class="lg:flex flex-col -translate-x-[calc(100%+17px)] lg:translate-x-0 duration-300 fixed w-72 2xl:w-92 bg-zinc-900 border-r-[1px] border-neutral-800 min-h-dvh h-svh overflow-y-scroll scrollbar z-60"
    :class="{ 'translate-x-0': isSidebarVisible }">
    <div class="flex items-center px-4 py-3.25 border-b-[1px] border-neutral-800">
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
      <GroupTree v-for="(page, index) in pages" :key="index" :group="page" :icons="pageIcons" :path="[]"
        @on-change-algorithm="(algorithm => emit('on-change-algorithm', algorithm))" class="!ml-0 mb-2" />
    </div>
  </aside>
</template>

<script setup>
import { DeveloperBoard24Regular, LockClosed24Regular, Storage24Regular, Database20Regular } from "@vicons/fluent";
import { VmdkDisk } from "@vicons/carbon";
import { LayoutSidebarLeftCollapse } from "@vicons/tabler";
import GroupTree from "./GroupTree.vue";
import { Icon } from "@vicons/utils";
import { useRouter } from "vue-router";
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  pages: Array,
  isSidebarVisible: Boolean,
});

const emit = defineEmits(['toggle-sidebar', 'on-change-algorithm']);
const router = useRouter();

const pageIcons = {
  DeveloperBoard24Regular,
  LockClosed24Regular,
  Storage24Regular,
  Database20Regular,
  VmdkDisk
};

const mediaQuery = window.matchMedia('(min-width: 1024px)');
const handleResize = () => {
  if (mediaQuery.matches && props.isSidebarVisible) {
    emit('toggle-sidebar');
  }
};
const goToHomePage = () => {
  // Update algorithm
  emit('on-change-algorithm', ['Learning Algorithms']);
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