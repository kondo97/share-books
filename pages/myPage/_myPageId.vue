<template>
  <div class="mx-auto fixed-width">
    <v-card class="my-12 mypage-width mx-auto">
      <v-toolbar color="#fff" flat prominent height="280">
        <MyPageHead />
        <template v-slot:extension>
          <v-tabs v-model="tabs" centered class="sp-tabs-width">
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
                <template v-for="(item, index) in items">
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
                      <v-img
                        :src="item.iconURL"
                        @click="goProfile(item)"
                        class="pointer"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-row class="d-flex justify-space-between">
                        <v-col cols="3">
                          <v-list-item-subtitle
                            v-html="item.userName"
                            @click="goProfile(item)"
                            class="pointer contents"
                          ></v-list-item-subtitle>
                        </v-col>
                        <v-col cols="9" class="text-right">
                          <v-list-item-subtitle
                            v-html="item.createdAt"
                          ></v-list-item-subtitle>
                        </v-col>
                      </v-row>
                      <v-list-item-title
                        v-html="item.articleTitle"
                        @click="goPost(item)"
                        class="pointer hover-blue"
                      ></v-list-item-title>
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
                              <v-icon color="pink lighten-2">mdi-heart</v-icon>
                            </v-col>
                            <v-col cols="6" class="d-flex align-center pa-0"
                              ><v-list-item-subtitle
                                v-html="item.likeCount"
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
          <p
            v-show="!noData"
            class="text-center pointer hover-blue"
            @click="showMorePosts"
          >
            ▼もっと表示する
          </p>
          <p v-show="noData" class="text-center">no more data</p>
        </v-tab-item>
        <!-- フォロー中 -->
        <v-tab-item class="mt-3">
          <v-card flat>
            <v-list class="py-6" flat>
              <v-card-text class="follow-number mx-auto">{{ followNumber }}フォロー</v-card-text>
              <v-list-item v-for="(followUser, i) in followUsers" :key="i">
                <v-card-text class="follow-border mx-sm-16">
                  <v-row class="py-3 px-sm-12">
                    <v-col cols="2" sm="1">
                      <v-avatar size="36"
                        ><img
                          :src="followUser.iconURL"
                          alt="フォローユーザーの画像"
                          @click="goProfileFollow(followUser)"
                          class="pointer"
                      /></v-avatar>
                    </v-col>
                    <v-col sm="9" class="d-flex align-center">
                      <p
                        class="ma-0 pointer hover-blue"
                        @click="goProfileFollow(followUser)"
                      >
                        {{ followUser.userName }}
                      </p>
                    </v-col>
                    <v-col sm="2" class="text-right text-sm-left">
                      <div v-if="isSelf">
                      <span v-if="isFollower">
                        <v-btn dark color="#5F9EA0" @click="unFollow(followUser.id)"
                          >フォロー中</v-btn
                        >
                      </span>
                      <span v-if="!isFollower">
                        <v-btn outlined color="#5F9EA0">
                          フォロー
                        </v-btn>
                      </span>
                      </div>
                      <div v-if="!isSelf">
                        <p style="color: #5F9EA0;">フォロー中</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-list-item>
            </v-list>
          </v-card>
          <p
            v-show="!noFollow"
            class="text-center pointer hover-blue"
            @click="showMoreFollow"
          >
            ▼もっと表示する
          </p>
          <p v-show="noFollow" class="text-center">no more data</p>
        </v-tab-item>
        <!-- フォロワー -->
        <v-tab-item class="mt-3">
          <v-card flat>
            <v-list class="py-6">
              <v-card-text class="follow-number mx-auto">{{ followedNumber }}フォロワー</v-card-text>
                <v-list-item v-for="(follower, i) in followedUsers" :key="i">
                  <v-card-text class="follow-border mx-sm-16">
                    <v-row class="py-3 mx-sm-12">
                      <v-col cols="2" sm="1">
                        <v-avatar size="36"
                          ><img
                            :src="follower.iconURL"
                            alt="フォローユーザーの画像"
                            class="pointer"
                            @click="goProfileFollow(follower)"
                        /></v-avatar>
                      </v-col>
                      <v-col cols="10" sm="9" class="d-flex align-center">
                        <p class="ma-0 pointer hover-blue" @click="goProfileFollow(follower)">
                          {{ follower.userName }}
                        </p>
                      </v-col>
                      <v-col sm="2" class="d-flex align-sm-center justify-end">
                        <p class="ma-0 follower-color">フォロワー</p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-list-item>
            </v-list>
          </v-card>
          <p
            v-show="!noFollowed"
            class="text-center pointer hover-blue"
            @click="showMoreFollowed"
          >
            ▼もっと表示する
          </p>
          <p v-show="noFollowed" class="text-center">no more data</p>
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
                      <v-img :src="like.iconURL" @click="goProfile(like)" class="pointer"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-row class="d-flex justify-space-between">
                        <v-col cols="3">
                          <v-list-item-subtitle
                            v-html="like.userName"
                            @click="goProfile(like)"
                            class="pointer contents"
                          ></v-list-item-subtitle>
                        </v-col>
                        <v-col cols="9" class="text-right">
                          <v-list-item-subtitle
                            v-html="like.subtitle"
                          ></v-list-item-subtitle>
                        </v-col>
                      </v-row>
                      <v-list-item-title
                        v-html="like.articleTitle"
                        @click="goPost(like)"
                        class="pointer hover-blue"
                      ></v-list-item-title>
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
                                v-html="like.articleCate"
                              ></v-list-item-subtitle>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="4" sm="4" md="2">
                          <v-row class="d-flex justify-center">
                            <v-col cols="6">
                              <v-icon color="pink lighten-2">mdi-heart</v-icon>
                            </v-col>
                            <v-col cols="6" class="d-flex align-center pa-0"
                              ><v-list-item-subtitle
                                v-html="like.likeCount"
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
          <p
            v-show="!noDataLike"
            class="text-center pointer hover-blue"
            @click="showMoreLikes"
          >
            ▼もっと表示する
          </p>
          <p v-show="noDataLike" class="text-center">no more data</p>
        </v-tab-item>
        <!-- コメントした記事 -->
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pt-0">
              <v-list four-line class="pa-sm-6 mx-sm-12">
                <template v-for="(item, index) in commentItems">
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
                      <v-img
                        :src="item.iconURL"
                        @click="goProfile(item)"
                        class="pointer"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-row class="d-flex justify-space-between">
                        <v-col cols="3">
                          <v-list-item-subtitle
                            v-html="item.userName"
                            @click="goProfile(item)"
                            class="pointer contents"
                          ></v-list-item-subtitle>
                        </v-col>
                        <v-col cols="9" class="text-right">
                          <v-list-item-subtitle
                            v-html="item.createdAt"
                          ></v-list-item-subtitle>
                        </v-col>
                      </v-row>
                      <v-list-item-title
                        v-html="item.articleTitle"
                        @click="goPost(item)"
                        class="pointer hover-blue"
                      ></v-list-item-title>
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
                              <v-icon color="pink lighten-2">mdi-heart</v-icon>
                            </v-col>
                            <v-col cols="6" class="d-flex align-center pa-0"
                              ><v-list-item-subtitle
                                v-html="item.likeCount"
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
          <p
            v-show="!noDataComment"
            class="text-center pointer hover-blue"
            @click="showMoreComments"
          >
            ▼もっと表示する
          </p>
          <p v-show="noDataComment" class="text-center">no more data</p>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>


<script>
export default {
  comments: {
    MyPageHead: () => import("~/components/MyPageHead"),
  },
  created() {
    const uid = this.$route.params["myPageId"];
    const seeUserUid = this.$store.getters["profile/user"].uid;
    this.$store.dispatch("getPosts/resetPosts");
    this.$store.dispatch("follow/resetFollow");
    //自分の投稿記事を取得
    this.$store.dispatch("getPosts/getMyPosts", uid);
    //コメントした記事を取得
    this.$store.dispatch("getPosts/getCommentId", uid);
    //フォロー中のユーザーを取得
    this.$store.dispatch("follow/getFollowUser", uid);
    //フォロワーを取得
    this.$store.dispatch('follow/getFollowedUser', uid)
    //閲覧ユーザーとプロフィールユーザーが一致するか
    if(uid == seeUserUid) {
      this.isSelf = true;
    } else {
      this.isSelf = false;
    }
    //いいね記事のデータをリセット
    this.$store.dispatch('like/resetLikePost')
    //いいねした記事の一覧を取得
    this.$store.dispatch('like/getLikePosts', uid)
  },
  data() {
    return {
      //閲覧ユーザーとプロフィールユーザーが一致するか
      isSelf: false,
      isFollower: true,
      tabs: null,
      tops: [
        { name: "マイ本棚" },
        { name: "フォロー中" },
        { name: "フォロワー" },
        { name: "いいね" },
        { name: "コメント記事" },
      ],
    };
  },
  methods: {
    changeFollow() {
      this.isFollow = !this.isFollow;
    },
    //記事の詳細ページへ
    goPost(item) {
      this.$router.push(`/articles/${item.id}`);
    },
    //マイページへ
    goProfile(item) {
      const id = item.authorUid;
      this.$router.push(`/myPage/${id}`);
    },
    goProfileFollow(followUser) {
      const id = followUser.id;
      this.$router.push(`/myPage/${id}`);
    },
    //マイ本棚の記事をさらに表示させる
    showMorePosts() {
      const uid = this.$route.params["myPageId"];
      this.$store.dispatch("getPosts/getMyPosts", uid);
    },
    //コメント記事を更に表示させる
    showMoreComments() {
      const uid = this.$route.params["myPageId"];
      this.$store.dispatch("getPosts/getCommentId", uid);
    },
    //フォロー中ユーザーをもっと表示させる。
    showMoreFollow() {
      const uid = this.$route.params["myPageId"];
      this.$store.dispatch("follow/getFollowUser", uid);
    },
    //フォロー中ユーザーを解除する
    unFollow(id) {
      const currentUserId = this.$store.getters["profile/user"].uid;
      const followedUserId = id;
      this.$store.dispatch("follow/unFollowPost", {
        currentUserId,
        followedUserId,
      });
      this.isFollow = false
    },
    //フォロワーをもっと表示させる
    showMoreFollowed(){
     const uid = this.$store.getters["profile/user"].uid;
     this.$store.dispatch('follow/getFollowedUser', uid)
    },
    //いいねした記事をもっと表示させる
    showMoreLikes() {
      const uid = this.$store.getters["profile/user"].uid;
      this.$store.dispatch('like/getLikePosts', uid)
    }
  },
  computed: {
    items() {
      return this.$store.getters["getPosts/items"];
    },
    noData() {
      return this.$store.getters["getPosts/noData"];
    },
    commentItems() {
      return this.$store.getters["getPosts/commentItems"];
    },
    noDataComment() {
      return this.$store.getters["getPosts/noDataComment"];
    },
    followUsers() {
      return this.$store.getters["follow/followUsers"];
    },
    noFollow() {
      return this.$store.getters["follow/noFollow"];
    },
    followedUsers() {
      return this.$store.getters['follow/followedUsers']
    },
    noFollowed() {
      return this.$store.getters['follow/noFollowed']
    },
    followNumber() {
      const followNumber = this.$store.getters["follow/followUsers"]
      return followNumber.length
    },
    followedNumber() {
      const followedNumber = this.$store.getters['follow/followedUsers']
      return followedNumber.length
    },
    likes() {
      return this.$store.getters['like/likes']
    },
    noDataLike() {
      return this.$store.getters['like/noDataLike']
    }
  },
  destroyed() {
    this.$store.dispatch("follow/destroyFollow");
  },
};
</script>

<style>
</style>