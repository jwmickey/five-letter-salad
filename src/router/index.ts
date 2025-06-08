import GameBoard from "@/components/GameBoard.vue";
import GameHistoryComponent from "@/components/GameHistory.vue";
import GameStats from "@/components/GameStats.vue";
import HistoryEntry from "@/components/HistoryEntry.vue";
import MenuDrawer from "@/components/MenuDrawer.vue";
import AboutPage from "@/components/AboutPage.vue";
import HistoryManage from "@/components/HistoryManage.vue";
import PreferencesPage from "@/components/PreferencesPage.vue";
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
      path: "/stats",
      name: "stats",
      component: GameStats,
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
      path: "/history/manage",
      name: "history_manage",
      component: HistoryManage,
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
    {
      path: "/preferences",
      name: "preferences",
      component: PreferencesPage,
    },
  ],
});

export default router;
