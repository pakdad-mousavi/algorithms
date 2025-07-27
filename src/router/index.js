import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { algorithmRoutes } from "./routes";
import { isLoading } from "@/state/loadingState";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => {
    return { top: 0, behavior: "smooth" };
  },
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
    // Algorithm routes
    ...algorithmRoutes,
  ],
});

let loadingTimeout = null;

router.beforeEach((to, from, next) => {
  clearTimeout(loadingTimeout); // clear any previous timeout

  // Delay showing loading overlay
  loadingTimeout = setTimeout(() => {
    isLoading.value = true;
  }, 50);

  // Update page title
  document.title = `${to.meta.name} | Learning Algorithms`;
  next();
});

router.afterEach(() => {
  // Hide loading overlay
  clearTimeout(loadingTimeout);
  isLoading.value = false;
});

export default router;
