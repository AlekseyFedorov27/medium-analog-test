import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("idToken") || false,
    user: localStorage.getItem("user") || null,
    posts: [],
    loading: false
  },
  getters: {
    getPosts: state => state.posts,
    getPostById: state => id => {
      return state.posts.find(item => item.id === id);
    },
    getToken: state => !!state.token,
    getUser: state => state.user,
    getLoading: state => state.loading
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setEditPost(state, post) {
      let item = state.posts.find(item => item.id == post.id);
      item.title = post.title;
      item.description = post.description;
      item.updateAt = post.updateAt;
      item.claps = post.claps;
    },
    setDeletePost(state, post) {
      let index = state.posts.indexOf(post);
      state.posts.splice(index, 1);
    },
    setAddPost(state, post) {
      state.posts.push(post);
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLoadPosts(state, posts) {
      const arr = [];
      for (let key in posts) {
        arr.push({
          ...posts[key],
          id: key
        });
      }
      state.posts = arr;
    }
  },
  actions: {
    editpost({ commit }, post) {
      return axios
        .put(
          `https://myblog2020-feeab.firebaseio.com/posts/${post.id}.json`,
          post
        )
        .then(res => {
          res;
          commit("setEditPost", post);
        })
        .catch(e => console.log(e));
    },
    deletepost({ commit }, post) {
      return axios
        .delete(`https://myblog2020-feeab.firebaseio.com/posts/${post.id}.json`)
        .then(res => {
          res.data;
          commit("setDeletePost", post);
        })
        .catch(e => console.log(e));
    },
    addpost({ commit }, post) {
      return axios
        .post("https://myblog2020-feeab.firebaseio.com/posts.json", post)
        .then(res => {
          commit("setAddPost", { ...post, id: res.data.name });
        })
        .catch(e => console.log(e));
    },
    reguser({ commit }, user) {
      commit("setLoading", true);
      const key = "AIzaSyC57l3B4wv5CpxNuuBZ3vRUVw8WmY2mn28";
      let data = user;
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      return axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
          data,
          config
        )
        .then(res => {
          localStorage.setItem("idToken", res.data.idToken);
          localStorage.setItem("user", res.data.email);
          commit("setUser", res.data.email);
          commit("setToken", res.data.idToken);
          commit("setLoading", false);
          router.push("/");
        })
        .catch(e => console.log(e));
    },
    loginuser({ commit }, user) {
      commit("setLoading", true);
      const key = "AIzaSyC57l3B4wv5CpxNuuBZ3vRUVw8WmY2mn28";
      let data = user;
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      return axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
          data,
          config
        )
        .then(res => {
          localStorage.setItem("idToken", res.data.idToken);
          localStorage.setItem("user", res.data.email);
          commit("setUser", res.data.email);
          commit("setToken", res.data.idToken);
          commit("setLoading", false);
          router.push("/");
        })
        .catch(e => console.log(e));
    },
    loadposts({ commit }, quantityPost) {
      commit("setLoading", true);
      return axios
        .get(
          `https://myblog2020-feeab.firebaseio.com/posts.json?orderBy="$key"&startAt="9"&limitToFirst=${quantityPost}`
        )
        .then(res => {
          commit("setLoadPosts", res.data);
          commit("setLoading", false);
        })
        .catch(e => console.log(e));
    }
  },
  modules: {}
});
