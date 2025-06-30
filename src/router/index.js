import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home route
    {
      path: "/",
      name: "Home",
      meta: {
        groupName: "Main",
        name: "Learning Algorithms - A Visual Guide to Understanding Algorithms",
      },
      component: HomeView,
    },
    // CPU scheduling algorithms
    {
      path: "/cpu-scheduling/round-robin",
      meta: {
        groupName: "CPU Scheduling",
        name: "Round Robin",
        icon: "",
      },
      component: () =>
        import("../views/algorithms/cpu-scheduling/RoundRobin.vue"),
    },
    {
      path: "/cpu-scheduling/first-come-first-serve",
      meta: {
        groupName: "CPU Scheduling",
        name: "First Come First Serve",
        icon: "",
      },
      component: () =>
        import("../views/algorithms/cpu-scheduling/FirstComeFirstServe.vue"),
    },
    {
      path: "/cpu-scheduling/priority",
      meta: {
        groupName: "CPU Scheduling",
        name: "Priority",
        icon: "",
      },
      component: () =>
        import("../views/algorithms/cpu-scheduling/Priority.vue"),
    },
    {
      path: "/cpu-scheduling/shortest-job-first",
      meta: {
        groupName: "CPU Scheduling",
        name: "Shortest Job First",
        icon: "",
      },
      component: () =>
        import("../views/algorithms/cpu-scheduling/ShortestJobFirst.vue"),
    },
    // Deadlock management
    {
      path: "/deadlock-management/banker's-algorithm",
      meta: {
        groupName: "Deadlock Management",
        name: "Banker's Algorithm",
        icon: "",
      },
      component: () =>
        import("../views/algorithms/deadlock-management/BankersAlgorithm.vue"),
    },
  ],
});

// Update each page title
router.beforeEach((to, from, next) => {
  const title = `${to.meta.name} | Learning Algorithms`;
  document.title = title;
  next();
});

export default router;
