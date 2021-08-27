<template>
  <v-row class="px-6 py-sm-8 py-3">
    <v-col cols="2" sm="3" class="text-center">
      <client-only>
      <v-avatar class="avatar-size"
        ><img :src="iconURL" alt="投稿者の画像" @click="goProfile" class="pointer"></v-avatar
    ></client-only></v-col>
    <v-col
      cols="10"
      sm="7"
      class="d-flex align-center flex-sm-column align-sm-start"
    >
      <p class="sp-user-name ma-0 pointer hover-blue" @click="goProfile">{{ userName }}</p>
      <!-- スマホでは非表示 -->
      <v-row class="hidden-sm-and-down">
        <v-col sm="3" class="text-center d-flex align-center"
          ><v-icon color="pink darken-1" size="24">mdi-heart</v-icon></v-col
        >
        <v-col sm="6" class="text-center d-flex align-center"
          ><p class="my-0">12</p></v-col
        >
        <v-col sm="2" class="text-center d-flex align-center"
          ><a :href="twitterURL" class="twitterURL" target="”_blank”"
            ><v-icon>mdi-twitter</v-icon></a
          ></v-col
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
          ><a :href="twitterURL" class="twitterURL" target="”_blank”"
            ><v-icon>mdi-twitter</v-icon></a
          ></v-col
        >
      </v-row>
    </v-col>
    
    <v-col cols="4" sm="2">
      <client-only>
      <!-- 非ログイン時に表示 -->
      <div v-if="matchUser"
        ><v-btn class="primary" @click="goProfile">編集する</v-btn></div
      >
      <!-- ログイン時に表示 -->
      <!-- フォローしている時 -->
      <div v-if="!matchUser"
        >
        <span v-if="isFollowPost" >
        <v-btn dark color="#5F9EA0" @click="unFollow">
          フォロー中
        </v-btn>
        </span>
        <!-- フォローしていない時 -->
        <span v-if="!isFollowPost"> 
        <v-btn outlined color="#5F9EA0" @click="follow">
          フォロー
        </v-btn>
        </span>
      </div>
      </client-only>
    </v-col>
    
    <v-col sm="12" class="mt-3 pb-0">
      <p class="sp-user-name">
        {{ intro }}
      </p>
    </v-col>
    <RequireVerify ref="child" />
    <RequireLogin  ref="requireLogin" />
  </v-row>
</template>

<script>
import firebase from "@/plugins/firebase";
export default {
  data() {
    return {
      isSelf: false,
    };
  },
  methods: {
     //フォローする
    follow() {
      const user = this.$store.getters["profile/user"];
      if (this.$store.getters["signIn/isAuth"]) {
        if (user.emailVerified == true) {
          const currentUserId = this.$store.getters["profile/user"].uid;
          const followedUserId = this.$store.getters['postsDetail/postDetail'].authorUid
          this.$store.dispatch("follow/followPost", {
            currentUserId,
            followedUserId,
          });
        } else {
          this.$refs.child.childEvent();
        }
      } else {
        this.$refs.requireLogin.requireEvent();
      }
    },
     //フォローを外す
    unFollow() {
      const currentUserId = this.$store.getters["profile/user"].uid;
      const followedUserId = this.$store.getters['postsDetail/postDetail'].authorUid
      this.$store.dispatch("follow/unFollowPost", {
        currentUserId,
        followedUserId,
      });
    },
    //プロフィールページへ
    goProfile() {
      const uid = this.$store.getters['postsDetail/postDetail'].authorUid
      this.$router.push(`/myPage/${uid}`);
    },
  },
  computed: {
    userName() {
      return this.$store.getters["postsDetail/postDetail"].userName;
    },
    iconURL() {
      return this.$store.getters["postsDetail/postDetail"].iconURL;
    },
    intro() {
      return this.$store.getters["postsDetail/postDetail"].intro;
    },
    twitterURL() {
      return this.$store.getters["postsDetail/postDetail"].twitterURL;
    },
    matchUser() {
      return this.$store.getters["postsDetail/matchUser"]
    },
    isFollowPost() {
      return this.$store.getters["follow/isFollowPost"]
    }
  },
  destroyed() {
    this.$store.dispatch('follow/destroyFollow')
  },
};
</script>