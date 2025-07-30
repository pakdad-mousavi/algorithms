<template>
  <div class="fixed w-full mx-auto duration-300 -translate-x-1/2 opacity-0 left-1/2 -bottom-10 z-[99]"
    :class="{ '!opacity-100 !bottom-10': isTabFooterRevealed }">
    <div class="flex items-center justify-end px-4 mx-auto sm:w-11/12">
      <div class="flex items-center justify-end w-full mx-auto overflow-x-hidden rounded-r-full max-w-7xl">
        <div class="relative group" @click="toggleTabFooter">
          <div
            class="absolute z-10 -translate-y-1/2 top-1/2 group-hover:-translate-x-[calc(100%-48px)] h-10 flex items-center pl-1.5 pr-12 rounded-full bg-main duration-300 border-neutral-700 text-neutral-700 text-sm font-medium"
            :class="{ '-translate-x-[calc(100%-48px)]': isTabFooterOpen }">
            <ul class="flex overflow-hidden border rounded-full">
              <li class="px-2 py-1 duration-75 cursor-pointer whitespace-nowrap" @click="selectTab(tab.id)"
                :class="{ 'text-gray-300 bg-zinc-700': activeTab === tab.id }" v-for="tab in tabList">
                {{ tab.label }}
              </li>
            </ul>
          </div>
          <div class="relative z-20">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-main text-neutral-700 shadow-zinc-800 shadow-[10px_0_20px_3px] group-hover:shadow-none duration-300"
              :class="{ 'shadow-none': isTabFooterOpen }">
              <Icon size="24" class="duration-300 group-hover:rotate-180" :class="{ 'rotate-180': isTabFooterOpen }">
                <Menu2></Menu2>
              </Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Menu2 } from '@vicons/tabler';
import { Icon } from '@vicons/utils';

import { tabList, defaultTab } from '@/state/tabState';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isTabFooterOpen = ref(false);
const isTabFooterRevealed = ref(false);

const activeTab = computed(() => {
  const tabIds = tabList.map((tab) => tab.id);
  const currentHash = route.hash.replace('#', '');
  const doesTabExist = tabIds.includes(currentHash);
  return route.hash && doesTabExist ? currentHash : defaultTab;
});

const selectTab = (newTabId) => {
  const hash = `#${newTabId}`;
  if (route.hash !== hash) {
    router.push(route.path + hash);
  }
}

// Open and close the tab footer for phones
const toggleTabFooter = () => {
  const mediaQuery = window.matchMedia('(min-width: 640px)'); // sm
  if (!mediaQuery.matches) {
    isTabFooterOpen.value = !isTabFooterOpen.value;
  }
};

// Close tab footer if screen is not a phone screen
const closeFooterOnDesktop = () => {
  const mediaQuery = window.matchMedia('(min-width: 640px)'); // sm
  if (mediaQuery.matches) {
    isTabFooterOpen.value = false;
  }
};

// Reveal the footer after the user has scrolled 100px
const revealFooterOnScroll = () => {
  const threshold = 100;
  if (window.scrollY > threshold) {
    isTabFooterRevealed.value = true;
  } else {
    isTabFooterRevealed.value = false;
  }
}

onMounted(() => {
  window.addEventListener('resize', closeFooterOnDesktop);
  window.addEventListener('scroll', revealFooterOnScroll);
});

onUnmounted(() => {
  window.removeEventListener('resize', closeFooterOnDesktop);
  window.removeEventListener('scroll', revealFooterOnScroll);
});

</script>
