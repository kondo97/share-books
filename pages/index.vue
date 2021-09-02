<template>
  <div class="mx-auto fixed-width">
    <v-container>
      <v-row class="d-flex justify-sm-space-between">
        <v-col cols="12" sm="12" md="3" class="pb-0"><SideMenuLeft /></v-col>
        <v-col cols="12" sm="12" md="7" class="mt-md-9 py-3 bg-main-color mb-4">
          <div class="px-sm-3 pt-sm-3">
            <v-text-field
              solo
              label="検索"
              placeholder="ユーザー名、キーワードで検索。"
              class="mt-3"
              @keydown.enter="search"
              v-model="searchWords"
            >
            </v-text-field>
            <v-list four-line>
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
                    <img
                      :src="item.iconURL"
                      class="pointer"
                      @click="goProfile(item)"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-row class="d-flex justify-space-between">
                      <v-col cols="12" sm="7">
                        <v-list-item-subtitle
                          v-html="item.userName"
                          class="pointer contents"
                          @click="goProfile(item)"
                        ></v-list-item-subtitle>
                      </v-col>
                      <v-col cols="12" sm="5" class="text-sm-right pt-0 py-sm-3">
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
                      <v-col cols="8" sm="5" md="6">
                        <v-row class="d-flex justify-space-between">
                          <v-col cols="1" sm="3">
                            <v-icon> mdi-tag </v-icon>
                          </v-col>
                          <v-col
                            class="d-flex align-center pa-0"
                            cols="9"
                            sm="9"
                          >
                            <v-list-item-subtitle
                              v-html="item.articleCate"
                            ></v-list-item-subtitle>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="4" sm="4" md="3">
                        <v-row class="d-flex justify-center">
                          <v-col cols="6" sm="9" md="6" class="text-sm-right">
                            <v-icon color="pink lighten-2">mdi-heart</v-icon>
                          </v-col>
                          <v-col cols="6" sm="3" md="6" class="d-flex align-center pa-0"
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
          </div>
          <div v-show="!cateSearch && !keySearch">
            <p
              v-if="!noData"
              class="text-center pointer hover-blue mt-6 pb-9"
              @click="showMorePosts"
            >
              ▼もっと表示する
            </p>
            <p v-if="noData" class="text-center mt-6 pb-6">no more data</p>
          </div>
          <!-- カテゴリー検索用 -->
          <div v-show="cateSearch && !keySearch">
            <p
              v-if="!noDataCate"
              class="text-center pointer hover-blue mt-6 pb-9"
              @click="showMoreCatePosts"
            >
              ▼もっと表示する
            </p>
            <p v-if="noDataCate" class="text-center mt-6 pb-6">no more data</p>
          </div>
          <!-- キーワード検索用 -->
          <div v-show="keySearch && !cateSearch">
            <p
              v-if="!noMoreKey"
              class="text-center pointer hover-blue mt-6 pb-9"
              @click="showMoreKeySearch"
            >
              ▼もっと表示する
            </p>
            <p v-if="noMoreKey" class="text-center mt-6 pb-6">no more data</p>
          </div>
        </v-col>
        <v-col cols="12" sm="2" md="2"><SideMenuRight /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    SideMenuLeft: () => import("~/components/Frame/SideMenuLeft"),
    SideMenuRight: () => import("~/components/Frame/SideMenuRight"),
  },
  created() {
    this.$store.dispatch("topPosts/resetPosts");
    this.$store.dispatch("topPosts/getPosts");
  },
  data() {
    return {
      searchWords: "",
    };
  },
  methods: {
    //記事をさらに表示させる
    showMorePosts() {
      this.$store.dispatch("topPosts/getPosts");
    },
    //記事の詳細ページへ
    goPost(item) {
      this.$router.push(`/articles/${item.id}`);
    },
    //プロフィールページへ
    goProfile(item) {
      const id = item.authorUid;
      this.$router.push(`/myPage/${id}`);
    },
    //カテゴリー用のもっと表示する押下
    showMoreCatePosts() {
      const name = this.$store.getters["topPosts/cateName"];
      this.$store.dispatch("topPosts/catePosts", name);
    },
    //キーワード検索
    search() {
      this.$store.dispatch("topPosts/resetPosts");
      this.$store.dispatch("topPosts/keyWordSearch", this.searchWords);
    },
    showMoreKeySearch() {
      this.$store.dispatch("topPosts/keyWordSearch", this.searchWords);
    }
  },
  computed: {
    items() {
      return this.$store.getters["topPosts/items"];
    },
    noData() {
      return this.$store.getters["topPosts/noData"];
    },
    //「もっと表示する」をカテゴリー検索用に切り替え
    cateSearch() {
      return this.$store.getters["topPosts/cateSearch"];
    },
    noDataCate() {
      return this.$store.getters["topPosts/noDataCate"];
    },
    keySearch() {
      return this.$store.getters["topPosts/keySearch"]
    },
    noMoreKey() {
      return this.$store.getters['topPosts/noMoreKey']
    }
  },
};
</script>

<style>
</style>