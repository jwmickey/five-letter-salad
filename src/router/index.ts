import GameBoard from "@/components/GameBoard.vue";
import GameHistoryComponent from "@/components/GameHistory.vue";
import HistoryEntry from "@/components/HistoryEntry.vue";
import MenuDrawer from "@/components/MenuDrawer.vue";
import AboutPage from "@/components/AboutPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "play",
      component: GameBoard,
    },
    {
      path: "/history/:page?",
      name: "history",
      component: GameHistoryComponent,
    },
    {
      path: "/history/game/:entry",
      name: "history_entry",
      component: HistoryEntry,
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuDrawer,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    },
  ],
});

export default router;
