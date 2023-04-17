import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import requests from "./data/requests";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faMagnifyingGlass);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$http = axios;

Vue.use(requests);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
