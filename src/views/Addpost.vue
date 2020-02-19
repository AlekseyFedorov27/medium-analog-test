<template>
  <div>
    <div class="card edit-post">
      <div class="title">Add post</div>
      <section>
        <b-field label="Title">
          <b-input v-model="title"></b-input>
        </b-field>

        <b-field label="Description">
          <b-input maxlength="200" type="textarea" v-model="description"></b-input>
        </b-field>
        <div class="buttons">
          <b-button type="is-success card-edit-btn" @click="edit">Add post</b-button>
          <b-button type="is-success card-edit-btn" @click="goToHome">Cancel</b-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["postId"],
  data: () => ({
    title: "",
    description: ""
  }),
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    edit() {
      this.$store.dispatch("addpost", {
        // id: this.editPost.id,
        title: this.title,
        description: this.description,
        claps: 0,
        createdAt: new Date(),
        updateAt: new Date(),
        userId: this.getUser
      });
      this.goToHome();
    },
    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-post {
  padding: 4rem;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
.card-edit-btn {
  width: 120px;
}
</style>
