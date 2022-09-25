import GameBoard from "@/components/GameBoard.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Game",
      component: GameBoard,
    },
  ],
});

export default router;
