<template>
  <v-row class="px-6 py-sm-8 py-3 mypage-border">
    <v-col cols="2" sm="3" class="text-center">
      <v-avatar class="avatar-size"
        ><img :src="iconURL" alt="投稿者の画像" /></v-avatar
    ></v-col>
    <v-col
      cols="10"
      sm="7"
      class="d-flex align-center flex-sm-column align-sm-start"
    >
      <p class="sp-user-name ma-0">{{ userName }}</p>
      <!-- スマホでは非表示 -->
      <v-row class="hidden-sm-and-down">
        <v-col sm="3" class="text-center d-flex align-center"
          ><v-icon color="pink darken-1" size="24">mdi-heart</v-icon></v-col
        >
        <v-col sm="6" class="text-center d-flex align-center"
          ><p class="my-0">12</p></v-col
        >
        <v-col sm="2" class="text-center d-flex align-center"
          ><a :href="twitterURL" class="twitterURL" target=”_blank”><v-icon >mdi-twitter</v-icon></a></v-col
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
          ><a :href="twitterURL" class="twitterURL" target=”_blank” ><v-icon>mdi-twitter</v-icon></a></v-col
        >
      </v-row>
    </v-col>
    <v-col cols="4" sm="2">
      <!-- 非ログイン時に表示 -->
      <!-- <nuxt-link to="/myPage/myPageEdit/$route.params.id"> -->
        <span v-if="isSelf" ><v-btn class="primary" @click="goMyPageEdit">編集する</v-btn></span>
      <!-- </nuxt-link> -->
      <!-- ログイン時に表示 -->
      <!-- フォローしている時 -->
      <span v-if="!isSelf" ><v-btn
        v-show="isFollow"
        dark
        color="#5F9EA0"
        @click="changeFollow"
      >
        フォロー中
      </v-btn></span>
      <!-- フォローしていない時 -->
      <span v-if="!isSelf" ><v-btn
        v-if="!isSelf"
        v-show="!isFollow"
        outlined
        color="#5F9EA0"
        @click="changeFollow"
      >
        フォロー
      </v-btn></span>
    </v-col>
    <v-col sm="12" class="mt-3 pb-0">
      <p class="sp-user-name">
        {{ intro }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  created() {
    //ユーザーが自分自身か判定する。
    const pageUid = this.$route.params["myPageId"]
    const seeUserUid = this.$store.getters["profile/user"].uid
    console.log(pageUid)
    console.log(seeUserUid)
    if(pageUid == seeUserUid) {
      console.log('success')
      this.isSelf = true
    } else {
      this.isSelf = false
    }
    // if(pageUid == seeUserUid) {
    //   this.isMySelf = true
    // } else {
    //   this.isMySelf = false
    // }
  },
  data() {
    return {
      isSelf: false,
      isFollow: false,
    };
  },
  methods: {
    goMyPageEdit() {
      const uid = this.$route.params["myPageId"]
      this.$router.push(`/myPage/myPageEdit/${uid}/`)
    },
    changeFollow() {
      this.isFollow = ! this.isFollow
    }
  },
  computed: {
    userName() {
      return this.$store.getters["profile/profile"].userName;
    },
    iconURL() {
      return this.$store.getters["profile/profile"].iconURL;
    },
    intro() {
      return this.$store.getters["profile/profile"].intro;
    },
    twitterURL() {
      return this.$store.getters["profile/profile"].twitterURL
    }
  },
};
</script>