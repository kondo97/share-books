<template>
  <div class="mx-auto fixed-width">
    <v-container>
      <v-row class="d-flex justify-sm-space-between">
        <v-col cols="12" sm="12" md="3" 
          ><SideMenuLeft
        /></v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          class="mt-sm-9 py-3 bg-main-color mb-12"
        >
          <div class="px-sm-3 pt-sm-3">
            <v-text-field
              solo
              label="検索"
              placeholder="ユーザー名、キーワードで検索。"
              class="mt-3"
            >
            </v-text-field>
            <v-list four-line>
              <template v-for="(item, index) in scrollItems">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                ></v-subheader>

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                ></v-divider>

                <v-list-item v-else :key="index">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-row class="d-flex justify-space-between">
                      <v-col cols="3">
                        <v-list-item-subtitle
                          v-html="item.author"
                        ></v-list-item-subtitle>
                      </v-col>
                      <v-col cols="9" class="text-right">
                        <v-list-item-subtitle
                          v-html="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-col>
                    </v-row>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-row class="d-flex justify-space-between mt-1">
                      <v-col cols="8" sm="5" md="6">
                        <v-row class="d-flex justify-space-between">
                          <v-col cols="1" sm="4">
                            <v-icon> mdi-tag </v-icon>
                          </v-col>
                          <v-col
                            class="d-flex align-center pa-0"
                            cols="9"
                            sm="8"
                          >
                            <v-list-item-subtitle
                              v-html="item.category"
                            ></v-list-item-subtitle>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4" sm="4" md="2">
                        <v-row class="d-flex justify-center">
                          <v-col cols="6">
                            <v-icon color="pink darken-1">mdi-heart</v-icon>
                          </v-col>
                          <v-col cols="6" class="d-flex align-center pa-0"
                            ><v-list-item-subtitle
                              v-html="item.good"
                              class="text-subtitle-1"
                            ></v-list-item-subtitle
                          ></v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
            <no-ssr>
              <infinite-loading
                ref="infiniteLoading"
                spinner="spiral"
                @infinite="infiniteHandler"
              >
                <span slot="no-results" />
              </infinite-loading>
            </no-ssr>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="3"><SideMenuRight /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "InfiniteScroll",
  components: {
    SideMenuLeft: () => import("~/components/Frame/SideMenuLeft"),
    SideMenuRight: () => import("~/components/Frame/SideMenuRight"),
  },
  data() {
    return {
      //無限スクロール用
      items: [
        { header: "本棚一覧" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習にお",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習に",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を紹",
          category: "芸術・エンターテイメント",
          good: "12",
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          author: "@" + "田中",
          subtitle: "2021年06月06日に投稿",
          title: "英語学習におすすめの本を",
          category: "文学・評論",
          good: "12",
        },
        { divider: true, inset: true },
      ],
      scrollItems: [],
    };
  },
  methods: {
    infiniteHandler() {
      setTimeout(() => {
        if (this.scrollItems.length < this.items.length) {
          for (let i = 0; i < this.items.length; i++) {
            this.scrollItems.push(this.items[i]);
          }
          this.$refs.infiniteLoading.stateChanger.loaded();
        } else {
          this.$refs.infiniteLoading.stateChanger.complete();
        }
      }, 100);
    },
  },
};
</script>

<style>
</style>