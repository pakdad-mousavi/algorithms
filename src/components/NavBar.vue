<template>
  <nav class="border-b-[1px] border-neutral-800 fixed bg-zinc-900 w-full z-40 text-sm max-w-7xl">
    <div class="flex items-center gap-4 px-4 py-2 border-b border-neutral-800 lg:border-0">
      <!-- Banner -->
      <div class="flex items-center mr-auto cursor-pointer gap-x-2" @click="goToHomePage()">
        <Logo class="w-6 h-6"></Logo>
        <span class="font-medium">Learning Algorithms</span>
      </div>
      <div class="hidden sm:block">
        <SearchBar @toggle-search="toggleSearch" v-if="!isMobile"></SearchBar>
      </div>
      <!-- Buttons -->
      <div class="flex gap-x-2">
        <a target="_blank" href="https://github.com/pakdad-mousavi/algorithms" class="flex items-center gap-x-2 btn">
          <Icon>
            <Github></Github>
          </Icon>
          <span>GitHub</span>
        </a>
      </div>
    </div>
    <div class="flex items-center gap-4 px-4 py-2 sm:py-3.75 lg:hidden">
      <!-- Sidebar toggle -->
      <div class="flex items-center flex-1 cursor-pointer gap-x-1" @click="emit('toggle-sidebar')">
        <Icon size="18px" color="oklch(87% 0 0)">
          <LayoutSidebarLeftExpand></LayoutSidebarLeftExpand>
        </Icon>
        <span>Algorithms</span>
      </div>
      <SearchBar @toggle-search="toggleSearch" v-if="isMobile"></SearchBar>
    </div>
  </nav>
</template>

<script setup>
import { LayoutSidebarLeftExpand } from "@vicons/tabler";
import { Github } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import { useRouter } from "vue-router";
import Logo from "./Logo.vue";
import SearchBar from "./search/SearchBar.vue";
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits(['toggle-sidebar', 'toggle-search']);
const isMobile = ref(false);
const router = useRouter();

const goToHomePage = () => {
  // Send to home page
  router.push('/');
};

const toggleSearch = () => {
  emit('toggle-search');
};

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>