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
        name: "Round Robin Algorithm",
      },
      component: () =>
        import("../views/algorithms/cpu-scheduling/RoundRobin.vue"),
    },
    {
      path: "/cpu-scheduling/first-come-first-serve",
      meta: {
        groupName: "CPU Scheduling",
        name: "First Come First Serve (FCFS)",
      },
      component: () =>
        import("../views/algorithms/cpu-scheduling/FirstComeFirstServe.vue"),
    },
    {
      path: "/cpu-scheduling/priority",
      meta: {
        groupName: "CPU Scheduling",
        name: "Priority Scheduling",
      },
      component: () =>
        import("../views/algorithms/cpu-scheduling/Priority.vue"),
    },
    {
      path: "/cpu-scheduling/shortest-job-first",
      meta: {
        groupName: "CPU Scheduling",
        name: "Shortest Job First Scheduling",
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
      },
      component: () =>
        import("../views/algorithms/deadlock-management/BankersAlgorithm.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Update each page title
  const title = `${to.meta.name} | Learning Algorithms`;
  document.title = title;
  next();
});

router.afterEach(() => {
  // Scroll to the top of the window
  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;
