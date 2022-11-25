import { createApp } from "vue";
import { GameManager } from "./utils/GameManager";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
app.provide<GameManager>("gm", new GameManager(window));

app.use(router);

app.mount("#app");
