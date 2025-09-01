export const algorithmRoutes = [
  {
    path: "/searching-algorithms/linear-search",
    component: () => import("@/views/algorithms/searching-algorithms/LinearSearch.vue"),
    meta: {
      groupName: "Searching Algorithms",
      name: "Linear Search",
    },
  },
  {
    path: "/searching-algorithms/binary-search",
    component: () => import("@/views/algorithms/searching-algorithms/BinarySearch.vue"),
    meta: {
      groupName: "Searching Algorithms",
      name: "Binary Search",
    },
  },
  {
    path: "/sorting-numbers/bubble-sort",
    component: () => import("@/views/algorithms/sorting-numbers/BubbleSort.vue"),
    meta: {
      groupName: "Sorting Numbers",
      name: "Bubble Sort",
    },
  },
  {
    path: "/sorting-numbers/selection-sort",
    component: () => import("@/views/algorithms/sorting-numbers/SelectionSort.vue"),
    meta: {
      groupName: "Sorting Numbers",
      name: "Selection Sort",
    },
  },
  {
    path: "/sorting-numbers/insertion-sort",
    component: () => import("@/views/algorithms/sorting-numbers/InsertionSort.vue"),
    meta: {
      groupName: "Sorting Numbers",
      name: "Insertion Sort",
    },
  },
  {
    path: "/sorting-numbers/merge-sort",
    component: () => import("@/views/algorithms/sorting-numbers/MergeSort.vue"),
    meta: {
      groupName: "Sorting Numbers",
      name: "Merge Sort",
    },
  },
  {
    path: "/sorting-numbers/quick-sort",
    component: () => import("@/views/algorithms/sorting-numbers/QuickSort.vue"),
    meta: {
      groupName: "Sorting Numbers",
      name: "Quick Sort",
    },
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
  {
    path: "/disk-scheduling/scan",
    component: () => import("@/views/algorithms/disk-scheduling/Scan.vue"),
    meta: {
      groupName: "Disk Scheduling",
      name: "SCAN",
    },
  },
  {
    path: "/disk-scheduling/look",
    component: () => import("@/views/algorithms/disk-scheduling/Look.vue"),
    meta: {
      groupName: "Disk Scheduling",
      name: "LOOK",
    },
  },
  {
    path: "/disk-scheduling/c-scan",
    component: () => import("@/views/algorithms/disk-scheduling/CScan.vue"),
    meta: {
      groupName: "Disk Scheduling",
      name: "C-SCAN (Circular SCAN)",
    },
  },
  {
    path: "/disk-scheduling/c-look",
    component: () => import("@/views/algorithms/disk-scheduling/CLook.vue"),
    meta: {
      groupName: "Disk Scheduling",
      name: "C-LOOK (Circular LOOK)",
    },
  },
];
