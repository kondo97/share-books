<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title
          class="text-h5 grey--text text--lighten-3 verify-title justify-center"
        >
          コメントを編集
        </v-card-title>
        <v-form ref="form" v-model="valid" class="ma-4">
          <v-textarea
            solo
            label="コメントを編集（最大140文字）"
            autofocus
            class="mt-6 prevent-item"
            v-model="commentEditComment"
            :rules="commentRules"
          ></v-textarea>
        </v-form>
        <div class="text-center pb-6">
          <v-btn @click="cancelEdit" class="mr-3"> キャンセル </v-btn>
          <v-btn class="primary ml-3" @click="submitComment"> 更新 </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      //ルール設定
      valid: false,
      commentRules: [
        (v) => !!v || "コメントを編集できます！",
        (v) => (v && v.length <= 140) || "最大140文字です。",
      ],
      commentEditComment: "",
    };
  },
  methods: {
    editCommentEvent(commentText) {
      this.dialog = true;
      this.commentEditComment = commentText;
    },
    //更新ボタン押下
    submitComment() {
      this.$store.dispatch("comment/updateComment", this.commentEditComment);
      this.dialog = false;
    },
    cancelEdit() {
      this.dialog = false;
    },
  },
};
</script>