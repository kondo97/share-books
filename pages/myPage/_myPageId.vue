<template>
  <div class="mx-auto fixed-width">
  <v-card class="my-12 mypage-width mx-auto">
    <v-toolbar color="#fff" flat prominent height="280">
      <MyPageHead />
      <template v-slot:extension>
        <v-tabs v-model="tabs" centered>
          <v-tab v-for="(top, index) in tops" :key="index" class="sp-tab">
            {{ top.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    
    <v-tabs-items v-model="tabs">
      <!-- マイ本棚 -->
      <v-tab-item>
        <v-card flat>
          <v-card-text class="pt-0">
            <v-list four-line class="pa-sm-6 mx-sm-12">
              <template v-for="(item, index) in items" >
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
                    <v-img :src="item.iconURL"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-row class="d-flex justify-space-between">
                      <v-col cols="3">
                        <v-list-item-subtitle
                          v-html="item.userName"
                        ></v-list-item-subtitle>
                      </v-col>
                      <v-col cols="9" class="text-right">
                        <v-list-item-subtitle
                          v-html="item.createAt"
                        ></v-list-item-subtitle>
                      </v-col>
                    </v-row>
                    <v-list-item-title v-html="item.articleTitle" @click="goPost(item)" class="pointer hover-blue"></v-list-item-title>
                    <v-row class="d-flex justify-space-between mt-1">
                      <v-col cols="8" sm="3" md="6">
                        <v-row class="d-flex justify-space-between">
                          <v-col cols="1" md="3">
                            <v-icon> mdi-tag </v-icon>
                          </v-col>
                          <v-col
                            class="d-flex align-center pa-0"
                            cols="9"
                            md="9"
                          >
                            <v-list-item-subtitle
                              v-html="item.articleCate"
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
          </v-card-text>
        </v-card>
        <!-- <div class="text-center"><v-btn color="primary" @click="showMorePosts">さらに表示</v-btn></div> -->
        <p v-if="!noData" class="text-center pointer hover-blue" @click="showMorePosts">▼もっと表示する</p>
        <p v-if="noData" class="text-center">no more data</p>
      </v-tab-item>
      <!-- フォロー中 -->
      <v-tab-item class="mt-3">
        <v-card flat>
          <v-list class="py-6">
            <v-list-item-group>
              <v-list-item v-for="(follow, i) in follows" :key="i">
                <v-card-text class="follow-border mx-sm-16">
                  <v-row class="py-3 px-sm-12">
                    <v-col cols="2" sm="1">
                      <v-avatar size="36"
                        ><img :src="follow.avatar" alt="フォローユーザーの画像"
                      /></v-avatar>
                    </v-col>
                    <v-col cols="10" sm="9" class="d-flex align-center">
                      <p class="ma-0">
                        {{ follow.name }}
                      </p>
                    </v-col>
                    <v-col sm="2" class="text-right text-sm-left">
                      <v-btn>フォロー中</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-tab-item>
      <!-- フォロワー -->
      <v-tab-item class="mt-3">
        <v-card flat>
          <v-list class="py-6">
            <v-list-item-group>
              <v-list-item v-for="(follower, i) in followers" :key="i">
                <v-card-text class="follow-border mx-sm-16">
                  <v-row class="py-3 mx-sm-12">
                    <v-col cols="2" sm="1">
                      <v-avatar size="36"
                        ><img
                          :src="follower.avatar"
                          alt="フォローユーザーの画像"
                      /></v-avatar>
                    </v-col>
                    <v-col cols="10" sm="9" class="d-flex align-center">
                      <p class="ma-0">
                        {{ follower.name }}
                      </p>
                    </v-col>
                    <v-col sm="2" class="d-flex align-sm-center justify-end">
                      <p class="ma-0 follower-color">フォロワー</p>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-tab-item>
      <!-- スキした記事 -->
      <v-tab-item>
        <v-card flat>
          <v-card-text class="pt-0">
            <v-list four-line class="pa-sm-6 mx-sm-12">
              <template v-for="(like, index) in likes">
                <v-subheader
                  v-if="like.header"
                  :key="like.header"
                  v-text="like.header"
                ></v-subheader>

                <v-divider
                  v-else-if="like.divider"
                  :key="index"
                  :inset="like.inset"
                ></v-divider>

                <v-list-item v-else :key="index">
                  <v-list-item-avatar>
                    <v-img :src="like.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-row class="d-flex justify-space-between">
                      <v-col cols="3">
                        <v-list-item-subtitle
                          v-html="like.author"
                        ></v-list-item-subtitle>
                      </v-col>
                      <v-col cols="9" class="text-right">
                        <v-list-item-subtitle
                          v-html="like.subtitle"
                        ></v-list-item-subtitle>
                      </v-col>
                    </v-row>
                    <v-list-item-title v-html="like.title"></v-list-item-title>
                    <v-row class="d-flex justify-space-between mt-1">
                      <v-col cols="8" sm="3" md="6">
                        <v-row class="d-flex justify-space-between">
                          <v-col cols="1" md="3">
                            <v-icon> mdi-tag </v-icon>
                          </v-col>
                          <v-col
                            class="d-flex align-center pa-0"
                            cols="9"
                            md="9"
                          >
                            <v-list-item-subtitle
                              v-html="like.category"
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
                              v-html="like.good"
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
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  </div>
</template>


<script>
export default {
  comments: {
    MyPageHead: () => import("~/components/MyPageHead")
  },
  created() {
    const uid = this.$route.params["myPageId"]
    this.$store.dispatch('getPosts/resetPosts')
    this.$store.dispatch('getPosts/getMyPosts', uid)
  },
  data() {
    return {
      tabs: null,
      tops: [
        { name: "マイ本棚" },
        { name: "フォロー中" },
        { name: "フォロワー" },
        { name: "スキ" },
      ],
      follows: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "近藤（フロントエンドエンジニアを目指す）",
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "近藤（フロントエンドエンジニアを目指す）",
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "近藤（フロントエンドエンジニアを目指す）",
        },
      ],
      followers: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "近藤（フロントエンドエンジニアを目指す）",
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "近藤（フロントエンドエンジニアを目指す）",
        },

        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "近藤（フロントエンドエンジニアを目指す）",
        },
      ],
      likes: [
        { header: "スキした本棚" },
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
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
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
          title: "英語学習におすすめの本を紹介",
          category: "学習・趣味・自己啓発",
          good: "12",
        },
        { divider: true, inset: true },
      ],
    };
  },
  methods: {
    changeFollow() {
      this.isFollow = !this.isFollow;
    },
    //記事の詳細ページへ
    goPost(item) {
      this.$router.push(`/articles/${item.id}`)
    },
    //記事をさらに表示させる
    showMorePosts(){
      const uid = this.$route.params["myPageId"]
      this.$store.dispatch('getPosts/getMyPosts', uid)
    }
  },
  computed: {
    items() {
      return this.$store.getters['getPosts/items']
    },
    noData() {
      return this.$store.getters['getPosts/noData']
    }
  }
};
</script>

<style>

</style>