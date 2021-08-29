<template>
  <div>
    <div class="mt-16 fixed d-none d-sm-none d-md-block d-lg-block d-xl-block">
      <v-row class="d-flex flex-column mt-6">
        <v-col>
          <v-row class="d-flex flex-column">
            <v-col class="py-1 text-center">
              <span v-show="isLike">
                <v-icon
                  size="36"
                  color="pink lighten-2"
                  class="pointer"
                  @click="submitDeleteLike"
                  >mdi-heart</v-icon
                >
              </span>
              <span v-show="!isLike">
                <v-icon size="36" class="pointer" @click="submitAddLike"
                  >mdi-heart-outline</v-icon
                >
              </span>
            </v-col>
            <v-col class="py-0 text-center"><p>{{ postDetail.likeCount }}</p></v-col>
          </v-row>
        </v-col>
        <v-col class="text-center"
          ><v-icon @click="shareTwitter">mdi-twitter</v-icon></v-col
        >
        <v-col class="text-center"
          ><v-icon @click="shareFacebook">mdi-facebook</v-icon></v-col
        >
        <v-col class="text-center" v-show="matchUser"
          ><v-icon @click="editArticle">mdi-pencil</v-icon></v-col
        >
        <v-col class="text-center" v-show="matchUser"
          ><v-icon @click="articleDelete">mdi-delete</v-icon></v-col
        >
      </v-row>
    </div>
    <!-- タブレット以下は表示-->
    <div class="d-block d-sm-block d-md-none d-lg-none d-xl-none white--text">
      <v-row class="d-flex justify-center">
        <v-col cols="4" sm="6">
          <v-row class="justify-center">
            <v-col cols="4" sm="2" class="text-center d-flex align-center">
              <span v-show="isLike">
                <v-icon
                  size="24"
                  color="pink lighten-2"
                  class="pointer"
                  @click="submitDeleteLike"
                  >mdi-heart</v-icon
                >
              </span>
              <span v-show="!isLike">
                <v-icon size="24" class="pointer" @click="submitAddLike"
                  >mdi-heart-outline</v-icon
                >
              </span>
            </v-col>
            <v-col cols="6" sm="4" class="text-center d-flex align-center"
              ><p class="ma-0">12</p></v-col
            >
          </v-row>
        </v-col>
        <v-col cols="2" sm="1" class="text-center d-flex align-center"
          ><v-icon dark @click="shareTwitter">mdi-twitter</v-icon></v-col
        >
        <v-col cols="2" sm="1" class="text-center d-flex align-center"
          ><v-icon dark @click="shareFacebook">mdi-facebook</v-icon></v-col
        >
        <v-col
          cols="2"
          sm="1"
          class="text-center d-flex align-center"
          v-show="matchUser"
          ><v-icon dark @click="editArticle">mdi-pencil</v-icon></v-col
        >
        <v-col
          cols="2"
          sm="1"
          class="text-center d-flex align-center"
          v-show="matchUser"
          ><v-icon dark @click="articleDelete">mdi-delete</v-icon></v-col
        >
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("like/resetLike");
    const pageUid = this.$route.params["articlesId"];
    const currentUserId = this.$store.getters["profile/user"].uid;
    
    //閲覧ユーザーがいいねを押しているか確認
    this.$store.dispatch("like/checkLike", { pageUid, currentUserId });
  },
  methods: {
    //twitterでシェア
    shareTwitter() {
      const currentURL = window.location.href;
      window.open(
        `http://twitter.com/share?url=${currentURL}&text=「share hondana」でおすすめの本を紹介しよう！&hashtags=ShareHondana`
      );
    },
    // facebookでシェア
    shareFacebook() {
      const currentURL = window.location.href;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`);
    },
    //本棚の削除
    articleDelete() {
      if (confirm("この本棚を削除してもよろしいですか。")) {
        //削除処理を記述する。
        const pageUid = this.$route.params["articlesId"];
        this.$store.dispatch("postsDetail/deletePost", pageUid);
      }
    },
    //本棚の編集
    editArticle() {
      const pageUid = this.$route.params["articlesId"];
      this.$router.push(`/articles/articlesEdit/${pageUid}`);
    },
    //いいね追加
    submitAddLike() {
      const pageUid = this.$route.params["articlesId"];
      const currentUserId = this.$store.getters["profile/user"].uid;
      this.$store.dispatch("like/addLike", { pageUid, currentUserId });
    },
    //いいね削除
    submitDeleteLike() {
      const pageUid = this.$route.params["articlesId"];
      const currentUserId = this.$store.getters["profile/user"].uid;
      this.$store.dispatch("like/deleteLike", { pageUid, currentUserId });
    },
  },
  computed: {
    matchUser() {
      return this.$store.getters["postsDetail/matchUser"];
    },
    isLike() {
      return this.$store.getters["like/isLike"];
    },
    postDetail() {
      return this.$store.getters['postsDetail/postDetail']
    }
  },
};
</script>

<style>
</style>