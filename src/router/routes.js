export const algorithmRoutes = [
  {
    path: "/cpu-scheduling/round-robin",
    meta: {
      groupName: "CPU Scheduling",
      name: "Round Robin Algorithm",
    },
    component: () => import("@/views/algorithms/cpu-scheduling/RoundRobin.vue"),
  },
  {
    path: "/cpu-scheduling/first-come-first-serve",
    meta: {
      groupName: "CPU Scheduling",
      name: "First Come First Serve (FCFS)",
    },
    component: () => import("@/views/algorithms/cpu-scheduling/FirstComeFirstServe.vue"),
  },
  {
    path: "/cpu-scheduling/priority",
    meta: {
      groupName: "CPU Scheduling",
      name: "Priority Scheduling",
    },
    component: () => import("@/views/algorithms/cpu-scheduling/Priority.vue"),
  },
  {
    path: "/cpu-scheduling/shortest-job-first",
    meta: {
      groupName: "CPU Scheduling",
      name: "Shortest Job First Scheduling",
    },
    component: () => import("@/views/algorithms/cpu-scheduling/ShortestJobFirst.vue"),
  },
  {
    path: "/deadlock-management/banker's-algorithm",
    meta: {
      groupName: "Deadlock Management",
      name: "Banker's Algorithm",
    },
    component: () => import("@/views/algorithms/deadlock-management/BankersAlgorithm.vue"),
  },
  {
    path: "/memory-management/first-fit",
    meta: {
      groupName: "Memory Management",
      name: "First Fit Algorithm",
    },
    component: () => import("@/views/algorithms/memory-management/FirstFit.vue"),
  },
  {
    path: "/memory-management/best-fit",
    meta: {
      groupName: "Memory Management",
      name: "Best Fit Algorithm",
    },
    component: () => import("@/views/algorithms/memory-management/BestFit.vue"),
  },
  {
    path: "/memory-management/worst-fit",
    meta: {
      groupName: "Memory Management",
      name: "Worst Fit Algorithm",
    },
    component: () => import("@/views/algorithms/memory-management/WorstFit.vue"),
  },
  {
    path: "/virtual-memory-management/first-in-first-out",
    component: () => import("@/views/algorithms/virtual-memory-management/FirstInFirstOut.vue"),
    meta: {
      groupName: "Virtual Memory Management",
      name: "First In First Out (FIFO)",
    },
  },
  {
    path: "/virtual-memory-management/least-recently-used",
    component: () => import("@/views/algorithms/virtual-memory-management/LeastRecentlyUsed.vue"),
    meta: {
      groupName: "Virtual Memory Management",
      name: "Least Recently Used (LRU)",
    },
  },
  {
    path: "/virtual-memory-management/optimal",
    component: () => import("@/views/algorithms/virtual-memory-management/Optimal.vue"),
    meta: {
      groupName: "Virtual Memory Management",
      name: "Optimal (MIN)",
    },
  },
  {
    path: "/disk-scheduling/first-come-first-serve",
    component: () => import("@/views/algorithms/disk-scheduling/FirstComeFirstServe.vue"),
    meta: {
      groupName: "Disk Scheduling",
      name: "First Come First Serve (FCFS)",
    },
  },
  {
    path: "/disk-scheduling/shortest-seek-time-first",
    component: () => import("@/views/algorithms/disk-scheduling/ShortestSeekTimeFirst.vue"),
    meta: {
      groupName: "Disk Scheduling",
      name: "Shortest Seek Time First (SSTF)",
    },
  },
];
