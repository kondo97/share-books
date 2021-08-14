<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    color="app-bar"
    class="px-1 px-sm-6"
  >
    <v-container class="d-flex align-center fixed-width px-0">
      <nuxt-link to="/" tag="div">
        <p class="grey--text text--lighten-3 logo">Share Books</p>
      </nuxt-link>
      <v-spacer></v-spacer>
      <!-- 非ログイン時に表示 -->
      <nuxt-link to="/signIn/signIn" tag="div">
<v-btn elevation="2" color="success" v-if="!isAuth">ログイン</v-btn>
      </nuxt-link>
      <!-- ログイン時に表示 -->
      <!-- お知らせ -->
      <div
        v-if="isAuth"
        @click="displayNews"
        v-click-outside="clickOutsideNews"
      >
        <v-icon dark class="mr-1 mr-sm-3 bell">mdi-bell</v-icon>
        <div class="news">
          <div class="news--list" v-if="showNews">
            <NewsList @closeNews="clickOutsideNews" />
          </div>
        </div>
      </div>

      <!-- アバター -->
      <div
        v-if="isAuth"
        @click="displayMenu"
        v-click-outside="clickOutsideMenu"
      >
        <v-avatar class="mr-1 mr-sm-3 avatar">
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-avatar>
        <div class="menu" v-if="showMenu">
          <div class="menu--list">
            <MenuList @closeMenu="clickOutsideMenu" />
          </div>
        </div>
      </div>
      <!-- 非ログイン時に表示 -->
      <nuxt-link to="/signIn/signUp" tag="div">
      <v-btn elevation="2" color="primary" v-if="!isAuth" class="ml-6">新規登録</v-btn>
      </nuxt-link>
      <!-- ログイン時に表示 -->
      <nuxt-link to="/articles/articlesCreate" tag="div">
        <v-btn elevation="2" color="success" v-if="isAuth">新規投稿</v-btn>
      </nuxt-link>
    </v-container>
  </v-app-bar>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  data() {
    return {
      isAuth: true,
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
  },
  //vue-click-outsideの仕様。
  directives: {
    ClickOutside,
  },
};
</script>

<style>
.app-bar {
  /* background: linear-gradient(-135deg, #1e130c, #9a8478); */
  background: linear-gradient(-135deg, #9a8478, #1e130c);
}

.logo {
  margin-bottom: 0 !important;
  font-size: 24px;
  width: 160px !important;
  cursor: pointer;
}

.bell,
.avatar {
  cursor: pointer;
}

.menu,
.news {
  position: relative;
}

.menu--list {
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.news--list {
  position: absolute;
  top: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>