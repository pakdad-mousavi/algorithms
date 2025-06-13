import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home route
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // CPU scheduling algorithms
    {
      path: "/cpu-scheduling/round-robin",
      component: () =>
        import("../views/algorithms/cpu-scheduling/RoundRobin.vue"),
    },
  ],
});

export default router;
