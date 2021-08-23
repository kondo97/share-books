<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey--text text--lighten-3 verify-title justify-center">
          メールアドレス認証のお願い
        </v-card-title>

        <v-card-text class="mt-9">
          投稿やマイページ編集、いいねなどの基本操作が可能になり、各種通知機能もご利用いただけるようになります。
        </v-card-text>
        <div class="text-center mt-4">
          <v-btn color="success" @click="sendVerify">
            認証用メールを送信
          </v-btn>
          <v-card-text class="mt-4 mb-6 pointer hover-blue" @click="twitterEmail"
            >Twitterログイン時にメールアドレス登録が完了していない方はこちら</v-card-text
          >
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> 閉じる </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      // dialog: true,
    };
  },
  methods: {
    childEvent() {
      this.dialog = true;
    },
    async sendVerify() {
      await this.$store.dispatch("signIn/sendEmail");
      this.dialog = false;
    },
    twitterEmail() {
      this.$router.push('signIn/twitterEmail')
      this.dialog = false;
    }
  },
};
</script>