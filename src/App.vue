<template>
  <main class="mx-auto max-w-7xl">
    <NavBar @toggle-sidebar="isSidebarVisible = !isSidebarVisible">
    </NavBar>
    <div class="flex">
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="isSidebarVisible = !isSidebarVisible"></Sidebar>
      <div class="flex-1"></div>
      <div class="flex flex-col relative w-full lg:w-[calc(100%-288px)]">
        <main class="relative p-4 mx-auto space-y-4 mt-26 lg:mt-13 text-neutral-300 w-full sm:w-11/12">
          <RouterView v-slot="{ Component }">
            <Transition>
              <div :key="route.fullPath">
                <TabHeader v-if="route.meta.groupName !== 'Main'" @on-tab-change="(newTab) => activeTab = newTab"
                  :active-tab="activeTab"></TabHeader>
                <component :is="Component" :tab="activeTab"></component>
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
import { RouterView, useRoute, useRouter } from "vue-router";
import { ref, Transition, watch } from "vue";
import Sidebar from "./components/Sidebar.vue";
import NavBar from "./components/NavBar.vue";
import TabHeader from "./components/TabHeader.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
const router = useRouter();

// Keep track of the active tab
const activeTab = ref('How It Works');

// reset active tab
router.afterEach(() => {
  activeTab.value = 'How It Works';
});

const isSidebarVisible = ref(false);

watch(isSidebarVisible, (visible) => {
  document.body.classList.toggle('overflow-hidden', visible);
});

</script>
