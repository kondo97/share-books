<template>
  <div class="mx-auto fixed-width">
    <v-container>
      <v-row>
        <v-col sm="2" class="d-flex justify-center"><div class="hidden-sm-and-down"><ArticlesLeft /></div></v-col>
        <v-col cols="12" sm="8" class="px-0">
          <div class="bg-main-color mt-sm-9 py-9 px-9">
            <v-container class="px-sm-6 pt-sm-3 text-subtitle-2">
              <v-row>
                <v-col cols="9" sm="10" class="d-flex align-center px-0">
                  <p class="ma-0">{{ postDetail.createAt }}</p>
                </v-col>
                <v-col cols="3" sm="2" class="d-flex align-center px-0">
                  <p class="ma-0">1,000views</p>
                </v-col>
                <v-col cols="2" sm="1" class="px-0">
                  <v-avatar size="40"
                    ><img
                      :src="postDetail.iconURL"
                      alt="投稿者の画像"
                       @click="goProfile"
                       class="pointer"
                  /></v-avatar>
                </v-col>
                <v-col cols="10" sm="8" class="d-flex align-center ml-sm-3 px-0 ">
                  <p class="ma-0 sp-user-name pointer hover-blue" @click="goProfile">@{{ postDetail.userName }}</p>
                </v-col>
              </v-row>
            </v-container>
            <h1 class="mt-sm-12 mt-6 article-title">{{ postDetail.articleTitle }}</h1>
            <p class="mt-9">
              {{ postDetail.articleDescript }}
            </p>
            <v-row class="mt-3">
              <v-col cols="2" sm="1">
                <v-icon>mdi-tag</v-icon>
              </v-col>
              <v-col cols="9" sm="6">
                <p>{{ postDetail.articleCate }}</p>
              </v-col>
            </v-row>
            <ArticlesBook />
          </div>
          <div class="bg-main-color my-9">
            <CurrentUser />
          </div>
          <div class="bg-main-color my-9 pt-6">
            <h2 class="comment-title px-6 pb-1">コメント</h2>
            <!-- コメント -->
            <ArticlesComment />
            <!-- コメントレイアウト -->
            <div class="mt-sm-9 mt-6 px-sm-6 px-3 pb-6 mb-16 mb-md-0 comment-contents" v-show="isAuth">
              <v-row>
                <v-col cols="2" sm="1">
                  <v-avatar size="36"
                    ><img
                      :src="currentUser.iconURL"
                      alt="コメント投稿者の画像"
                      @click="goCurrentUser"
                       class="pointer"
                  /></v-avatar>
                </v-col>
                <v-col cols="9" sm="8" class="d-flex align-center">
                  <p class="ma-0 sp-user-name pointer hover-blue" @click="goCurrentUser">@{{ currentUser.userName }}</p>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="valid">
              <v-textarea solo label="コメントを入力（最大140文字）" class="mt-6" :rules="commentRules"></v-textarea>
              </v-form>
              <div class="text-right">
                <v-btn color="success" :disabled="!valid"> 投稿 </v-btn>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="2" class="d-none d-sm-none d-md-block d-lg-block d-xl-block">
          <SideMenuRight />
        </v-col>
        <v-col class="mb-12 d-block d-sm-block d-md-none d-lg-none d-xl-none sp-articles-left-fixed">
          <div class=""><ArticlesLeft /></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
export default {
  components: {
    SideMenuRight: () => import("~/components/Frame/SideMenuRight"),
    ArticlesBook: () => import("~/components/Articles/ArticlesBook"),
    ArticlesComment: () => import("~/components/Articles/ArticlesComment"),
    ArticlesLeft: () => import("~/components/Articles/ArticlesLeft"),
    CurrentUser: () => import("~/components/CurrentUser")
  },
  created() {
    const pageUid = this.$route.params["articlesId"];
    this.$store.dispatch('postsDetail/getPostDetail', pageUid)
  },
  data() {
    return {
      // ルール設定
      valid: false,
      commentRules: [
        (v) => !!v || "コメントを投稿してみましょう！",
        (v) => (v && v.length <= 140) || "最大140文字です。",
      ]
    };
  },
  methods: {
    goProfile() {
      const uid = this.$store.getters['postsDetail/postDetail'].authorUid
      this.$router.push(`/myPage/${uid}`);
    },
    //自分のマイページへ移動
    goCurrentUser() {
      const user = firebase.auth().currentUser;
      if (user.emailVerified == true) {
        const uid = user.uid;
        this.$router.push(`/myPage/${uid}`);
      }
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters["postsDetail/isAuth"];
    },
    postDetail() {
      return this.$store.getters['postsDetail/postDetail']
    },
    currentUser() {
      return this.$store.getters['postsDetail/currentUser']
    },
  },
  destroyed() {
    this.$store.dispatch('postsDetail/destoryData')
  }
};
</script>

<style>





</style>