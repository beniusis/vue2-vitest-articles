import Vue from "vue";
import VueRouter from "vue-router";

import Articles from "../views/Articles.vue";
import ArticleDetails from "../views/ArticleDetails.vue";
import PageNotFound from "../views/PageNotFound.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Articles
  },
  {
    path: "/articles/:id",
    name: "article",
    props: true,
    component: ArticleDetails,
    beforeEnter: async (to, from, next) => {
      try {
        await axios.get(`http://localhost:3000/articles/${to.params.id}`);
        next();
      } catch (error) {
        next({ name: "pagenotfound" });
      }
    }
  },
  {
    path: "*",
    name: "pagenotfound",
    component: PageNotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
