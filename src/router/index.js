import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { algorithmRoutes } from "./routes";

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

router.beforeEach((to, from, next) => {
  // Update each page title
  const title = `${to.meta.name} | Learning Algorithms`;
  document.title = title;
  next();
});

export default router;
