<template>
  <v-list disabled>
    <v-list-item-group>
      <v-list-item
        v-for="(comment, index) in comments"
        :key="index"
        class="comment-item"
      >
        <div class="mt-9 px-sm-6 pb-sm-6 comment-contents px-3 pb-3">
          <v-row>
            <v-col cols="2" sm="1">
              <v-avatar size="36"
                ><img :src="comment.userIcon" alt="コメント投稿者の画像"
              /></v-avatar>
            </v-col>
            <v-col cols="6" sm="8" class="d-flex align-center">
              <p class="ma-0 sp-user-name">@{{ comment.userName }}</p>
            </v-col>
            <v-col
              cols="4"
              sm="3"
              class="d-flex align-center justify-sm-end sp-time"
            >
              <p>{{ comment.commentDate }}</p>
            </v-col>
          </v-row>

          <p class="mt-6" v-if="!commentEdit">
            {{ comment.commentContent }}
          </p>
          <v-form ref="form" v-model="valid" v-if="commentEdit">
            <v-textarea
              solo
              label="コメントを入力（最大140文字）"
              autofocus
              class="mt-6 prevent-item"
              v-model="commentEditComment"
              :rules="commentRules"
            ></v-textarea>
          </v-form>
          <v-row class="mt-4 justify-space-between">
            <v-col cols="8" sm="10">
              <v-row class="ml-4">
                <v-col cols="1" sm="1"
                  ><v-icon color="pink darken-1">mdi-heart</v-icon></v-col
                >
                <v-col cols="2" sm="1">12</v-col>
              </v-row>
            </v-col>
            <v-col cols="2" sm="1" v-if="!commentEdit">
              <v-icon class="mr-4 mdi-edit" @click="editComment(index)"
                >mdi-pencil</v-icon
              >
            </v-col>
            <v-col cols="2" sm="1" class="mdi-edit" v-if="!commentEdit">
              <v-icon @click="deleteComment(index)">mdi-delete</v-icon>
            </v-col>
            <v-col>
              <v-btn
                class="primary prevent-item"
                @click="editComment"
                v-if="commentEdit"
              >
                更新
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  created() {
    this.comments = [
      {
        userIcon: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        userName: "近藤（フロントエンドエンジニアを目指す）",
        commentDate: "2021-06-07 13:00",
        commentContent:
          " この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ",
      },
    ]
  },
  data() {
    return {
      //ルール設定
      valid: false,
      commentRules: [
        (v) => !!v || "コメントを編集できます！",
        (v) => (v && v.length <= 140) || "最大140文字です。",
      ],
      comments: [],
      commentEdit: false,
    };
  },
  methods: {
    //コメント編集ボタン押下
    editComment(index) {
      this.commentEdit = !this.commentEdit;
      this.$store.dispatch('comment/changeCommit', index);
    },
    //コメント削除ボタン押下
    deleteComment(index) {
      if (confirm("このコメントを削除しますか？")) {
        console.log("sakuzyo");
      }
    },
  },
  computed: {
    commentEditComment() {
      const index = this.$store.getters["comment/index"]
      return this.comments[index].commentContent
    }
  }
};
</script>

<style>

</style>