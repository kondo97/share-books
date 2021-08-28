<template>
  <v-list disabled>
    <v-list-item
      v-for="(comment, index) in comments"
      :key="index"
      class="comment-item"
    >
      <div
        class="
          mt-9
          px-sm-6
          pb-sm-6
          comment-contents
          px-3
          pb-3
          comment-edit-wrap
        "
      >
        <v-row>
          <v-col cols="2" sm="1">
            <v-avatar size="36"
              ><img :src="comment.iconURL" alt="コメント投稿者の画像"
            /></v-avatar>
          </v-col>
          <v-col cols="7" sm="8" class="d-flex align-center">
            <p class="ma-0 sp-user-name">@{{ comment.userName }}</p>
          </v-col>
          <v-col
            cols="3"
            sm="3"
            class="d-flex align-center justify-sm-end sp-time"
          >
            <p>{{ comment.createdAt | day}}</p>
          </v-col>
        </v-row>
        <p class="mt-6" v-if="!commentEdit">
          {{ comment.comment }}
        </p>

        <v-form ref="form" v-model="valid" v-if="commentEdit">
          <v-textarea
            solo
            label="コメントを編集（最大140文字）"
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
            <v-icon
              class="prevent-item mr-4"
              @click="editComment(index, comment)"
              v-show="comment.displayIcon"
              >mdi-pencil</v-icon
            >
          </v-col>
          <v-col cols="2" sm="1" class="prevent-item" v-if="!commentEdit">
            <v-icon
              @click="submitDelete(index, comment)"
              v-show="comment.displayIcon"
              >mdi-delete</v-icon
            >
          </v-col>
          <v-col>
            <div class="text-right">
              <v-btn
                class="primary prevent-item"
                @click="submitComment"
                v-if="commentEdit"
              >
                更新
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
import dayjs from 'dayjs'
export default {
  created() {
    this.$store.dispatch("comment/resetComments");
    const pageUid = this.$route.params["articlesId"];
    const nowUser = this.$store.getters["profile/user"].uid;
    this.$store.dispatch("comment/getCommnets", { nowUser, pageUid });
  },
  data() {
    return {
      items: [
        {
          icon: "mdi-home",
          text: "HOME",
          to: "/",
          action: "closeMenu",
        },
      ],
      //ルール設定
      valid: false,
      commentRules: [
        (v) => !!v || "コメントを編集できます！",
        (v) => (v && v.length <= 140) || "最大140文字です。",
      ],
      commentEdit: false,
      commentEditComment: "",
      commentDots: false,
    };
  },
  methods: {
    //コメント編集ボタン押下
    editComment(index, comment) {
      this.commentEditComment =
        this.$store.getters["comment/comments"][index].comment;
      this.commentEdit = !this.commentEdit;
      const pageUid = this.$route.params["articlesId"];
      this.$store.dispatch("comment/changeComment", {
        pageUid: pageUid,
        id: comment.id,
        index: index,
      });
    },
    //更新ボタン押下
    submitComment() {
      this.$store.dispatch("comment/updateComment", this.commentEditComment);
      this.commentEdit = !this.commentEdit;
    },
    //コメント削除ボタン押下
    submitDelete(index, comment) {
      if (confirm("このコメントを削除しますか？")) {
        const pageUid = this.$route.params["articlesId"];
        this.$store.dispatch("comment/deleteComment", {
          pageUid: pageUid,
          id: comment.id,
          index: index,
        });
      }
    },
  },
  computed: {
    comments() {
      return this.$store.getters["comment/Orderdcomments"];
    },
  },
  filters: {
    day(value) {
      return dayjs(value * 1000).format('YYYY年MM月DD日') 
    }
  }
};
</script>

<style>
</style>