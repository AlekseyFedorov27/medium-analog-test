<template>
  <div class="cardlist">
    <div v-for="item in getPosts" :key="item.id">
      <Card :post="item" class="cadrs" />
    </div>
    <b-button
      type="is-primary"
      class="btm-loadmore"
      :loading="getLoading"
      @click="loadMore"
    >Load more...</b-button>
  </div>
</template>

<script>
import Card from "./Card";
import { mapGetters } from "vuex";
export default {
  name: "Cardlist",
  components: { Card },
  data: () => ({
    quantityPost: 10
  }),
  created() {
    this.$store.dispatch("loadposts", this.quantityPost);
  },
  computed: {
    ...mapGetters(["getPosts", "getLoading"])
  },
  methods: {
    loadMore() {
      this.quantityPost += 10;
      this.$store.dispatch("loadposts", this.quantityPost);
    }
  }
};
</script>

<style lang="scss" scoped>
.cardlist {
  justify-content: center;
  margin: 0 auto;
  .btm-loadmore {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .cadrs {
    display: flex;
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
