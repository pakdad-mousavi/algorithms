<template>
  <TransitionGroup>
    <div v-for="tab in tabList" :key="tab.id + route.hash" v-show="activeTab === tab.id">
      <slot :name="tab.id"></slot>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { defaultTab, tabList } from '@/state/tabState';
import { computed, TransitionGroup } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const activeTab = computed(() => {
  const tabIds = tabList.map((tab) => tab.id);
  const currentHash = route.hash.replace('#', '');
  const doesTabExist = tabIds.includes(currentHash);
  return route.hash && doesTabExist ? currentHash : defaultTab;
});

</script>