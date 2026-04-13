import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JavaScript (including Popper.js)
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// Import your custom styles
import "./assets/main.css";

// Create a Pinia instance
const pinia = createPinia();

// Create the Vue app and use both the router and Pinia
const app = createApp(App);
app.use(router);
app.use(pinia);

// Mount the app
app.mount("#app");
