<template>
  <div>
    <div class="card edit-post">
      <div class="title">Edit post</div>
      <section>
        <b-field label="Title">
          <b-input v-model="title"></b-input>
        </b-field>

        <b-field label="Description">
          <b-input maxlength="200" type="textarea" v-model="description"></b-input>
        </b-field>
        <div class="buttons">
          <b-button type="is-success card-edit-btn" @click="edit">Edit</b-button>
          <b-button type="is-success card-edit-btn" @click="goToHome">Cancel</b-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["postId"],
  data: () => ({
    title: "",
    description: "",
    editPost: {}
  }),
  created() {
    axios
      .get(`https://myblog2020-feeab.firebaseio.com/posts/${this.postId}.json`)
      .then(res => {
        this.title = res.data.title;
        this.description = res.data.description;
        this.editPost = res.data;
      })
      .catch(e => console.log(e));
  },
  methods: {
    edit() {
      let data = {
        id: this.postId,
        title: this.title,
        description: this.description,
        claps: this.editPost.claps,
        createdAt: this.editPost.createdAt,
        updateAt: new Date(),
        userId: this.editPost.userId
      };
      axios
        .put(
          `https://myblog2020-feeab.firebaseio.com/posts/${this.postId}.json`,
          data
        )
        .then(res => {
          this.$store.commit("setEditPost", res.data);
        })
        .catch(e => console.log(e));
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
