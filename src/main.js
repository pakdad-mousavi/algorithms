import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vFocus from "./directives/v-focus";

const app = createApp(App);

app.use(router);
app.directive('focus', vFocus);
app.mount("#app");
