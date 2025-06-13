<template>
  <header></header>
  <main class="flex p-4">
    <nav class="flex flex-col bg-neutral-800/55 rounded-l-xl border-[1px] border-neutral-800">
      <div class="flex p-4 font-bold border-b-[1px] border-neutral-800 mb-4">
        ALGORITHMS
      </div>
      <div class="p-4 text-sm">
        <GroupTree v-for="(page, index) in pages" :key="index" :group="page" :icons="pageIcons" :path="[]"
          :showTreeLines="false" class="!ml-0 mb-2" />
      </div>
    </nav>

    <div>
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import GroupTree from "./components/GroupTree.vue";
import { DeveloperBoard24Regular, LockClosed24Regular, Storage24Regular, Database20Regular, ArrowCollapseAll20Filled } from '@vicons/fluent';
import { VmdkDisk } from "@vicons/carbon";

const pageIcons = {
  DeveloperBoard24Regular,
  LockClosed24Regular,
  Storage24Regular,
  Database20Regular,
  ArrowCollapseAll20Filled,
  VmdkDisk
};

const pages = [
  {
    name: "CPU Scheduling",
    icon: "DeveloperBoard24Regular",
    algorithms: [
      "Round Robin",
      "First Come First Serve",
      "Priority",
      "Shortest Job First",
    ],
  },
  {
    name: "Deadlock Management",
    icon: "LockClosed24Regular",
    algorithms: [
      "Banker's Algorithm",
    ]
  },
  {
    name: "Memory Management",
    icon: "Database20Regular",
    algorithms: [
      "First Fit",
      "Best Fit",
      "Worst Fit"
    ],
  },
  {
    name: "Virtual Memory Management",
    icon: "Storage24Regular",
    subgroups: null,
    algorithms: [
      "First In First Out",
      "Optimal Replacement",
      "Least Recently Used"
    ]
  },
  {
    name: "Disk Scheduling",
    icon: "VmdkDisk",
    algorithms: [
      "First Come First Serve",
      "Shortest Seek Time First",
      "SCAN",
      "CSCAN",
      "LOOK",
      "CLOOK"
    ]
  }
];
</script>
