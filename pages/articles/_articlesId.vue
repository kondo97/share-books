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
                  <p class="ma-0">2021年06月06日に投稿</p>
                </v-col>
                <v-col cols="3" sm="2" class="d-flex align-center px-0">
                  <p class="ma-0">1,000views</p>
                </v-col>
                <v-col cols="2" sm="1" class="px-0">
                  <v-avatar size="36"
                    ><img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="投稿者の画像"
                  /></v-avatar>
                </v-col>
                <v-col cols="10" sm="8" class="d-flex align-center ml-sm-3 px-0 ">
                  <p class="ma-0 sp-user-name">@近藤（フロントエンドエンジニアを目指す）</p>
                </v-col>
              </v-row>
            </v-container>
            <h1 class="mt-sm-12 mt-6 article-title">英語学習にお勧めの本を紹介</h1>
            <p class="mt-9">
              この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
            </p>
            <v-row class="mt-3 mb-sm-9 mb-3">
              <v-col cols="2" sm="1">
                <v-icon>mdi-tag</v-icon>
              </v-col>
              <v-col cols="9" sm="6">
                <p>芸術・エンターテイメント</p>
              </v-col>
            </v-row>
            <ArticlesBook />
          </div>
          <div class="bg-main-color my-9">
            <MyPageHead />
          </div>
          <div class="bg-main-color my-9 pt-6">
            <h2 class="comment-title px-6 pb-1">コメント</h2>
            <!-- コメント -->
            <ArticlesComment />
            <!-- 投稿レイアウト -->
            <div class="mt-sm-9 mt-6 px-sm-6 px-3 pb-6 mb-16 mb-md-0 comment-contents">
              <v-row>
                <v-col cols="2" sm="1">
                  <v-avatar size="36"
                    ><img
                      src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                      alt="コメント投稿者の画像"
                  /></v-avatar>
                </v-col>
                <v-col cols="9" sm="8" class="d-flex align-center">
                  <p class="ma-0 sp-user-name">@近藤（フロントエンドエンジニアを目指す）</p>
                </v-col>
              </v-row>
              <v-form ref="form" v-model="valid">
              <v-textarea solo label="コメントを入力（最大140文字）" class="mt-6" autofocus :rules="commentRules"></v-textarea>
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
export default {
  components: {
    SideMenuRight: () => import("~/components/Frame/SideMenuRight"),
    ArticlesBook: () => import("~/components/Articles/ArticlesBook"),
    ArticlesComment: () => import("~/components/Articles/ArticlesComment"),
    ArticlesLeft: () => import("~/components/Articles/ArticlesLeft"),
    MyPageHead: () => import("~/components/MyPageHead")
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
};
</script>

<style>





</style>