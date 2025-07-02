<template>
  <main class="mx-auto max-w-7xl">
    <NavBar @toggle-sidebar="isSidebarVisible = !isSidebarVisible">
    </NavBar>
    <div class="flex">
      <Sidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="isSidebarVisible = !isSidebarVisible"></Sidebar>
      <div class="flex-1"></div>
      <div class="flex flex-col relative w-full lg:w-[calc(100%-288px)]">
        <main class="relative p-4 mx-auto space-y-4 mt-26 lg:mt-13 text-neutral-300 sm:w-11/12">
          <RouterView v-slot="{ Component }">
            <Transition>
              <component :is="Component"></component>
            </Transition>
          </RouterView>
        </main>
        <footer class="w-full py-4 text-sm border-t border-neutral-800">
          <div class="flex flex-col items-center justify-center w-full h-full text-zinc-500">
            <p class="flex items-center gap-x-2">
              Built with
              <Icon>
                <Heart></Heart>
              </Icon>
              by Pakdad Mousavi.
            </p>
            <p>
              All figures made using <a href="http://app.napkin.ai" target="_blank">Napkin AI</a>.
            </p>
          </div>
        </footer>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref, Transition, watch } from "vue";
import Sidebar from "./components/Sidebar.vue";
import NavBar from "./components/NavBar.vue";
import { Heart } from "@vicons/tabler";
import { Icon } from "@vicons/utils";

const isSidebarVisible = ref(false);

watch(isSidebarVisible, (visible) => {
  document.body.classList.toggle('overflow-hidden', visible);
});

</script>
