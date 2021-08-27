<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    color="app-bar"
    class="px-1 px-sm-6"
  >
  <client-only>
    <div class="d-flex align-center fixed-width px-0 mx-auto">
      <nuxt-link to="/" class="text-decoration-none">
        <p class="grey--text text--lighten-3 logo">Share Hondana</p>
      </nuxt-link>
      <v-spacer></v-spacer>
      <!-- 非ログイン時に表示 -->
      <nuxt-link to="/signIn/signIn" class="text-decoration-none">
        <span v-if="!isAuth">
          <v-btn elevation="2" color="success">ログイン</v-btn>
        </span>
      </nuxt-link>
      <!-- ログイン時に表示 -->
      <!-- お知らせ -->
        <div v-if="isAuth">
          <v-icon
            dark
            class="mr-1 mr-sm-3 pointer"
            @click="displayNews"
            v-click-outside="clickOutsideNews"
            >mdi-bell</v-icon
          >
          <div class="news">
            <div class="news--list" v-if="showNews">
              <NewsList @closeNews="clickOutsideNews" />
            </div>
          </div>
        </div>
      <!-- アバター -->
        <div v-if="isAuth">
          <v-avatar
            class="mr-1 mr-sm-3 avatar pointer"
            @click="displayMenu"
            v-click-outside="clickOutsideMenu"
          >
            <img :src="iconURL" />
          </v-avatar>

          <div class="menu" v-if="showMenu">
            <div class="menu--list">
              <MenuList
                @closeMenu="clickOutsideMenu"
                @parent-event="parentEvent"
              />
            </div>
          </div>
        </div>
      <!-- 非ログイン時に表示 -->
      <nuxt-link to="/signIn/signUp" class="text-decoration-none">
        <span v-if="!isAuth">
          <v-btn elevation="2" color="primary" class="ml-6">新規登録</v-btn>
        </span>
      </nuxt-link>
      <!-- ログイン時に表示 -->
      <span v-if="isAuth">
        <v-btn elevation="2" color="success" @click="newPosts">新規投稿</v-btn>
      </span>
    </div>
    </client-only>
    <RequireVerify ref="child" />
  </v-app-bar>
</template>

<script>
import firebase from "@/plugins/firebase";
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      // isAuth: true,
      showMenu: false,
      showNews: false,
    };
  },
  methods: {
    //メニューを開く。
    displayMenu() {
      this.showMenu = true;
    },
    //メニューを閉じる。
    clickOutsideMenu() {
      this.showMenu = false;
    },
    displayNews() {
      this.showNews = true;
    },
    clickOutsideNews() {
      this.showNews = false;
    },
    //新規投稿ボタン押下
    newPosts() {
      const user = this.$store.getters["profile/user"];
      if (user.emailVerified == true) {
        this.$router.push("/articles/articlesCreate/articlesCreate");
      } else {
        this.$refs.child.childEvent();
      }
    },
    parentEvent() {
      this.$refs.child.childEvent();
    },
  },
  //vue-click-outsideの仕様。
  directives: {
    ClickOutside,
  },
  computed: {
    isAuth() {
      return this.$store.getters["signIn/isAuth"];
    },
    iconURL() {
      return this.$store.getters["profile/profile"].iconURL;
    },
  },
};
</script>

<style>
</style>