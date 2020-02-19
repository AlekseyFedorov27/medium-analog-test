<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title title-size">{{ post.title }}</p>
      </header>
      <div class="card-content">
        <b-button type="is-success" size="is-small" class="autor">Autor: {{ post.userId }}</b-button>
        <div class="content">{{ post.description }}</div>
      </div>
      <footer class="card-footer">
        <time datetime="post.createdAt" :time-parser="post.createdAt">{{ getTimeFromNow(timePost) }}</time>
        <div class="buttons btn-card">
          <b-button
            size="is-medium color"
            class="card-btn"
            v-if="getUser"
            @click="addFavorite(post)"
          >
            <i class="fas fa-sign-language color"></i>
            {{ quantityLikes }}
          </b-button>
          <div v-if="post.userId === getUser">
            <b-button size="is-medium" class="card-btnsmall" @click="goToEditPost(post.id)">
              <i class="fas fa-edit color"></i>
            </b-button>
            <b-button size="is-medium" class="card-btnsmall" @click="confirmCustom(post)">
              <i class="fas fa-trash-alt color"></i>
            </b-button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "Card",
  props: ["post"],
  computed: {
    timePost() {
      if (this.post.createdAt == this.post.updateAt) {
        return this.post.createdAt;
      } else {
        return this.post.updateAt;
      }
    },
    ...mapGetters(["getUser"]),
    quantityLikes() {
      if (this.post.claps) {
        return this.post.claps.length;
      } else if (this.post.claps == 0) {
        return 0;
      } else {
        return 0;
      }
    }
  },
  methods: {
    getTimeFromNow(time) {
      return moment(new Date(time)).fromNow();
    },
    goToEditPost(id) {
      this.$router.push(`/editpost/${id}`);
    },
    confirmCustom() {
      this.$buefy.dialog.confirm({
        title: "Delete the post?",
        message: `${this.post.title}`,
        cancelText: "Disagree",
        confirmText: "Agree",
        type: "is-success",
        onConfirm: () => {
          this.$buefy.toast.open("Post delited");
          this.$store.dispatch("deletepost", this.post);
        }
      });
    },
    addFavorite(post) {
      let el;
      if (!post.claps) {
        post.claps = [];
      }
      el = post.claps.some(item => item === this.getUser);
      if (!el) {
        let item = {
          ...post
        };
        item.claps.push(this.getUser);
        this.$store.dispatch("editpost", item);
      } else {
        let index = post.claps.indexOf(this.getUser);
        let item = {
          ...post
        };
        item.claps.splice(index, 1);
        this.$store.dispatch("editpost", item);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  margin-bottom: 2rem;
  border-radius: 5px;
  .card-btn {
    width: 100px;
  }
  .color {
    color: rgb(12, 106, 168);
  }
  .autor {
    background-color: rgb(40, 161, 56) !important;
  }
  .card-btnsmall {
    width: 60px;
  }
  .button {
    background-color: #eff0eb;
  }
  .button:hover {
    background-color: #dddddd;
  }
  .button:active {
    background-color: #a3a3a3;
  }
  .btn-card {
    margin-left: auto;
  }
  .card-footer {
    height: 5rem;
    padding: 1rem;
  }
  .title-size {
    font-size: 1.5rem;
    color: rgb(167, 167, 167);
  }
}
</style>
