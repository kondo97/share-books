<template>
  <v-card class="mx-auto" width="300">
    <v-list three-line class="py-0">
        <v-list-item
          v-for="(item, i) in news"
          :key="i"
          :to="item.to"
          @click="goNews(item)"
          class="news-border "
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
    <p class="my-1 text-center pointer hover-blue" @click="showAllNews">通知一覧を見る</p>
  </v-card>
</template>

<script>
export default {
  created() {
    const userId = this.$store.getters['profile/user'].uid
    //通知ベルを開いた時点で、全て既読にする。
    this.$store.dispatch('news/readNews', userId)
  },
  data: () => ({
  
  }),
  methods: {
    goNews(item) {
      //メニューを閉じる。AppBarのメソッドを呼び出す。
      this.$emit('CloseMenu')
      const id = item.id
      this.$router.push(`/articles/${id}`)
    },
    showAllNews() {
      const id = this.$store.getters['profile/user'].uid
      this.$router.push(`/news/${id}`)
    }
  },
  computed: {
    news() {
      return this.$store.getters['news/news']
    }
  }
};
</script>

<style>

</style>