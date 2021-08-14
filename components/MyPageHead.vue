<template>
  <v-row class="px-6 py-sm-8 py-3 mypage-border">
    <v-col cols="2" sm="3" class="text-center">
      <v-avatar class="avatar-size"
        ><img
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
          alt="投稿者の画像" /></v-avatar
    ></v-col>
    <v-col
      cols="10"
      sm="7"
      class="d-flex align-center flex-sm-column align-sm-start"
    >
      <p class="sp-user-name ma-0">近藤（フロントエンドエンジニアを目指す）</p>
      <!-- スマホでは非表示 -->
      <v-row class="hidden-sm-and-down">
        <v-col sm="3" class="text-center d-flex align-center"
          ><v-icon color="pink darken-1" size="24">mdi-heart</v-icon></v-col
        >
        <v-col sm="6" class="text-center d-flex align-center"
          ><p class="my-0">12</p></v-col
        >
        <v-col sm="2" class="text-center d-flex align-center"
          ><v-icon>mdi-twitter</v-icon></v-col
        >
      </v-row>
    </v-col>
    <!-- スマホで表示 -->
    <v-col cols="8" class="d-sm-none d-flex align-center">
      <v-row class="ml-3">
        <v-col cols="2" class="text-center d-flex align-center"
          ><v-icon color="pink darken-1" size="24">mdi-heart</v-icon></v-col
        >
        <v-col cols="4" class="text-center d-flex align-center"
          ><p class="my-0">12</p></v-col
        >
        <v-col cols="2" class="text-center d-flex align-center"
          ><v-icon>mdi-twitter</v-icon></v-col
        >
      </v-row>
    </v-col>
    <v-col cols="4" sm="2">
      <!-- 非ログイン時に表示 -->
      <nuxt-link to="/myPage/myPageEdit/params.id">
        <v-btn v-if="isAuth" class="primary">編集する</v-btn>
      </nuxt-link>
      <!-- ログイン時に表示 -->
      <!-- フォローしている時 -->
      <v-btn
        v-if="!isAuth"
        v-show="isFollow"
        dark
        color="#5F9EA0"
        @click="changeFollow"
      >
        フォロー中
      </v-btn>
      <!-- フォローしていない時 -->
      <v-btn
        v-if="!isAuth"
        v-show="!isFollow"
        outlined
        color="#5F9EA0"
        @click="changeFollow"
      >
        フォロー
      </v-btn>
    </v-col>
    <v-col sm="12" class="mt-3 pb-0">
      <p class="sp-user-name">
        この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
      </p>
    </v-col>
  </v-row>
</template>