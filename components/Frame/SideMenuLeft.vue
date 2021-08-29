<template>
  <div class="">
    <v-card
      class="d-none d-sm-none d-md-block d-lg-block d-xl-block left-menu-fixed mt-6"
      color="FFFFFB"
    >
      <v-card-title class="mt-2 pa-2 ml-6 text-subtitle-1 pointer hover-blue" @click="allCatePosts">全て</v-card-title>
      <v-card-text>
        <v-row class="d-flex flex-column">
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-col @click="cateSelect(item.name)" class="pointer hover-blue">
                {{ item.name }}
              </v-col>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- タブレット以下は表示 -->
    <div class="d-block d-sm-block d-md-none d-lg-none d-xl-none">
      <div class="sm-category mt-3 mx-auto">
        <v-select :items="items" item-text="name" label="カテゴリー" solo> </v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {name:"文学・評論"},
        {name:"ノンフィクション"},
        {name:"ビジネス・経済"},
        {name:"歴史・地理"},
        {name:"政治・社会"},
        {name:"芸術・デザイン・音楽"},
        {name:"人文・思想・宗教"},
        {name:"暮らし・健康・料理"},
        {name:"サイエンス・テクノロジー"},
        {name:"学習・スキル・自己啓発"},
        {name:"スポーツ・フィットネス"},
        {name:"漫画・雑誌"},
        {name:"その他"},
      ],
    };
  },
  methods: {
    allCatePosts() {
      this.$store.dispatch('topPosts/resetPosts')
      this.$store.dispatch('topPosts/getPosts')
    },
    cateSelect(name) {
      this.$store.dispatch('topPosts/resetPosts')
      this.$store.dispatch('topPosts/catePosts', name)
    }
  },
};
</script>

<style>


</style>