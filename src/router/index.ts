import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/guessWiki/:mode", // Define a dynamic segment for the mode parameter
    name: "GuessWiki",
    component: () => import("../views/GuessWiki.vue"),
  },
  {
    path: "/guessWord/:mode", // Define a dynamic segment for the mode parameter
    name: "GuessWord",
    component: () => import("../views/GuessWord.vue"),
  },
  {
    path: "/topwiki",
    name: "TopWiki",
    component: () => import("../views/TopWiki.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
