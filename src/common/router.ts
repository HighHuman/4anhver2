import { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { helper } from "../utils/helper";

import Event from "../components/routes/event.vue";
import Alert from "../components/routes/alert.vue";
import Config from "../components/routes/config/config.vue";
import UserManagement from "../components/routes/user-management.vue";
import Profile from "../components/routes/profile.vue";
import OpeningPage from "../components/opening-page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "opening",
    component: OpeningPage,
  },
  {
    path: "/event",
    name: "event",
    component: Event,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/alert",
    name: "alert",
    component: Alert,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/config",
    name: "config",
    component: Config,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/usermanagement",
    name: "usermanagement",
    component: UserManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, next) => {
  if (to.meta.requiresAuth) {
    if (isLoggedIn()) {
      next();
    } else {
      next({ name: "opening" });
    }
  } else {
    next();
  }
});

const isLoggedIn = () => {
  const accessToken = helper.getAccessToken();
  if (accessToken) {
    return true;
  } else {
    return false;
  }

  // return true;
};

export default router;
