<template>
  <div class="ml-3">
    <div v-for="([groupName, routes], groupIndex) in Object.entries(groupedRoutes)" :key="groupIndex" class="mb-1"
      :class="{ 'hidden': groupName === 'Main' }">
      <div
        class="flex items-center hover:bg-neutral-800 py-1.5 duration-100 px-1 rounded-md border-neutral-700 cursor-pointer"
        @click="isMinimized[groupIndex] = !isMinimized[groupIndex]"
        :class="{ 'is-minimized': isMinimized[groupIndex] }">
        <div class="flex flex-1 font-medium">
          <Icon size="20px" class="mr-1">
            <component :is="groupIcons[groupIndex]"></component>
          </Icon>
          <div>{{ groupName }}</div>
        </div>
        <Icon size="16px" class="duration-300 rotate-90 chevron">
          <ChevronRight24Filled />
        </Icon>
      </div>

      <ul class="ml-3 border-l-[1px] border-neutral-700 space-y-1 mb-6">
        <li v-for="(route, routeIndex) in routes" :key="routeIndex"
          class="duration-100 cursor-pointer hover:bg-neutral-800 rounded-r-md first:mt-1"
          :data-is-active-link="route.path === $route.fullPath" ref="links">
          <RouterLink :to="route.path" class="block w-full h-full p-2 py-2 rounded-r-md">
            {{ route.meta.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Icon } from '@vicons/utils';
import {
  ChevronRight24Filled,
  DeveloperBoard24Regular,
  LockClosed24Regular,
  Storage24Regular,
  Database20Regular
} from "@vicons/fluent";
import { VmdkDisk } from "@vicons/carbon";

const groupIcons = [
  DeveloperBoard24Regular,
  LockClosed24Regular,
  Storage24Regular,
  Database20Regular,
  VmdkDisk
];

const links = ref(null);

// Use to render algorithms based on their groups
const route = useRoute();
const router = useRouter();
const routes = router.getRoutes();
const groupedRoutes = Object.groupBy(routes, ({ meta }) => meta.groupName);

// Keep track of which groups are minimized / expanded
const isMinimized = reactive(new Array(Object.keys(groupedRoutes).length - 1).fill(false));

const emit = defineEmits(['on-change-algorithm']);

// Emit an event whenever the route is changed with the active link element
const handleRouteChange = async () => {
  await nextTick(() => {
    const activeLink = links.value.find((link) => link.dataset.isActiveLink === 'true');
    emit('on-change-algorithm', activeLink);
  });
};

watch(() => route.fullPath, async () => {
  await handleRouteChange();
});
</script>