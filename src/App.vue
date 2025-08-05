<template>
  <main class="mx-auto max-w-7xl main-container">
    <Transition name="loading-fade">
      <SearchPopup v-if="isSearchVisible" @toggle-search="toggleSearch"></SearchPopup>
    </Transition>
    <NavBar @toggle-sidebar="isSidebarVisible = !isSidebarVisible" @toggle-search="toggleSearch">
    </NavBar>
    <div class="flex">
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="isSidebarVisible = !isSidebarVisible"></Sidebar>
      <div class="flex-1"></div>
      <div class="flex flex-col relative w-full lg:w-[calc(100%-288px)]">
        <Transition name="loading-fade">
          <div class="absolute inset-0 z-50 w-full h-full backdrop-blur-sm bg-zinc-900/50" v-if="isLoading"></div>
        </Transition>
        <main class="relative w-full p-4 mx-auto space-y-4 mt-26 lg:mt-13 text-neutral-300 sm:w-11/12">
          <RouterView v-slot="{ Component }">
            <Transition>
              <div :key="$route.path" class="relative w-full">
                <TabHeader v-if="$route.meta.groupName !== 'Main'"></TabHeader>
                <component :is="Component"></component>
                <TabFooter v-if="$route.meta.groupName !== 'Main'"></TabFooter>
              </div>
            </Transition>
          </RouterView>
        </main>
        <Footer></Footer>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { defineAsyncComponent, ref, Transition, watch } from "vue";
import Sidebar from "./components/Sidebar.vue";
import NavBar from "./components/NavBar.vue";
import TabHeader from "./components/TabHeader.vue";
import Footer from "./components/Footer.vue";
import { isLoading } from "./state/loadingState";
import TabFooter from "./components/TabFooter.vue";

const SearchPopup = defineAsyncComponent(() => import("./components/search/SearchPopup.vue"));

const isSidebarVisible = ref(false);
const isSearchVisible = ref(false);

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

watch(isSidebarVisible, (visible) => {
  document.body.classList.toggle('overflow-hidden', visible);
});
</script>
