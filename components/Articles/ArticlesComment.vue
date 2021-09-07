<template>
  <v-list disabled>
    <v-list-item
      v-for="(comment, index) in comments"
      :key="index"
      class="comment-item"
    >
      <div
        class="
          mt-3
          mt-sm-9
          px-sm-6
          pb-sm-6
          comment-contents
          px-3
          pb-3
          comment-edit-wrap
        "
      >
        <v-row>
          <v-col
            cols="12"
            class="text-right sp-time d-md-none pb-0 pt-3"
          >
            <p>{{ comment.createdAt | day}}</p>
          </v-col>
          <v-col cols="2" sm="2" md="1" class="pt-0 d-md-flex align-center">
            <v-avatar size="36"
              ><img :src="comment.iconURL" alt="コメント投稿者の画像"
            /></v-avatar>
          </v-col>
          <v-col cols="8" sm="10"  md="7" class="d-flex align-center pt-0">
            <p class="ma-0 sp-user-name">@{{ comment.userName }}</p>
          </v-col>
          <v-col
            md="4"
            class="d-md-flex align-center justify-md-end sp-time d-none d-md-block"
          >
            <p>{{ comment.createdAt | day}}</p>
          </v-col>
        </v-row>
        <p class="mt-6">
          {{ comment.comment }}
        </p>
        <v-row class="mt-4 justify-end" v-show="comment.displayIcon">
          <v-col cols="2" sm="1">
            <v-icon
              class="prevent-item mr-4"
              @click="editComment(index, comment)"
              >mdi-pencil</v-icon
            >
          </v-col>
          <v-col cols="2" sm="1" class="prevent-item">
            <v-icon
              @click="submitDelete(index, comment)"
              
              >mdi-delete</v-icon
            >
          </v-col>
        </v-row>
      </div>
    </v-list-item>
    <CommentEdit ref="child" />
  </v-list>
</template>

<script>
import dayjs from 'dayjs'
export default {
  components: {
    CommentEdit: () => import("~/components/Articles/CommentEdit")
  },
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
    };
  },
  methods: {
    //コメント編集ボタン押下
    editComment(index, comment) {
      const commentText = comment.comment
      this.$refs.child.editCommentEvent(commentText);
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