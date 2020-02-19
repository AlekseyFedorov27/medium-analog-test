<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="nav"></div>
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="buttons">
            <b-button tag="router-link" to="/" type="is-info">Home</b-button>
            <b-button tag="router-link" to="/addpost" type="is-info" v-if="showButtons">Add post</b-button>
            <b-button tag="router-link" to="/about" type="is-info">About</b-button>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="!showButtons">
              <b-button tag="router-link" to="/signup" type="is-info">Sign up</b-button>
              <b-button tag="router-link" to="/login" type="is-info">Log in</b-button>
            </div>
            <div v-else>
              <b-button type="is-info" icon-left="github-circle">{{ getUser }}</b-button>
              <b-button type="is-info" @click="logOut">Log out</b-button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    showButtons() {
      return this.$store.getters.getToken;
    },
    ...mapGetters(["getUser"])
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
      this.$store.commit("setToken", false);
      this.$store.commit("setUser", null);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #167df0;
  box-shadow: 10px 10px 10px rgba($color: #7e7e7e, $alpha: 0.3);
  .router-link-exact-active {
    background-color: #7957d5 !important;
  }
}
.navbarBasicExample {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
