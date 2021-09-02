<template>
  <div>
    <p class="mx-auto news-width mt-sm-12">通知一覧</p>
    <client-only>
    <v-list three-line class="mx-auto bgMainColor mt-sm-6 news-width py-0">
      <v-list-item
        v-for="(item, i) in news"
        :key="i"
        :to="item.to"
        @click="goNews(item)"
        class="news-border"
      >
        <v-list-item-avatar>
          <v-img :src="item.iconURL"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <p v-text="item.text" class="text-subtitle-1"></p>
          <p class="ma-0">{{ item.createdAt }}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p v-if="!noDataNews" class="text-center pointer hover-blue mt-6 pb-9" @click="showMoreNews">▼もっと表示する</p>
    <p v-if="noDataNews" class="text-center mt-6 pb-6">no more data</p>
    </client-only>
  </div>
</template>

<script>
export default {
  created() {
    // this.$store.dispatch("news/resetNews");
    // const currentUid = this.$route.params["news"];
    // this.$store.dispatch("news/getNews", currentUid);
  },
  data: () => ({}),
  methods: {
    goNews(item) {
      //メニューを閉じる。AppBarのメソッドを呼び出す。
      this.$emit("CloseMenu");
      const id = item.id;
      this.$router.push(`/articles/${id}`);
    },
    showMoreNews() {
      const currentUid = this.$route.params["news"];
      this.$store.dispatch("news/getNews", currentUid);
    }
  },
  computed: {
    news() {
      return this.$store.getters["news/news"];
    },
    noDataNews() {
      return this.$store.getters['news/noDataNews']
    }
  },
};
</script>