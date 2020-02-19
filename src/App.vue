<template>
  <div class="app">
    <Navbar />
    <div class="message">
      <b-message
        auto-close
        title="Info"
        type="is-success"
        has-icon
        size="is-small"
        :active.sync="showMessage"
        aria-close-label="Close message"
      >Вы вошли в систему</b-message>
    </div>
    <div class="container">
      <transition name="fade">
        <router-view class="content" />
      </transition>
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  computed: {
    showMessage: {
      get: function() {
        return this.$store.getters.getToken;
      },
      set: function() {
        return;
      }
    }
  }
};
</script>
<style lang="scss">
.app {
  background-color: rgb(235, 235, 235);
  min-height: 100vh;
  padding-bottom: 100px;
  position: relative;
}
.container {
  max-width: 1120px;
  margin: 0 auto;
}
.content {
  padding-top: 50px;
}
.message {
  width: 300px;
  top: 30px;
  right: 0px;
  z-index: 90;
  margin-left: auto;
  position: absolute;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}
.fade-enter {
  transition: all opacity 0.8s;
}
</style>
