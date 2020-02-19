import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Editpost from "../views/Editpost.vue";
import Addpost from "../views/Addpost.vue";
import Signup from "../views/Signup.vue";

const ifAuthenticated = (to, from, next) => {
  if (store.getters.getToken) {
    next();
    return;
  }
  next("/login");
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/editpost/:postId",
    name: "Editpost",
    component: Editpost,
    beforeEnter: ifAuthenticated,
    props: true
  },
  {
    path: "/addpost",
    name: "Addpost",
    component: Addpost,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "*", //'/index.html',
    beforeEnter: (to, from, next) => {
      next("/");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
