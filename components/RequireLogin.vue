<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey--text text--lighten-3 verify-title justify-center">
          ログイン/新規登録のお願い
        </v-card-title>

        <v-card-text class="mt-9">
          投稿やマイページ編集、いいねなどの基本操作が可能になり、各種通知機能もご利用いただけるようになります。
        </v-card-text>
        <div class="text-center mt-4 mb-6">
          <nuxt-link to="/signIn/signIn" class="text-decoration-none">
          <v-btn class="success mr-2">
            ログイン
          </v-btn>
          </nuxt-link>
          <nuxt-link to="/signIn/signUp" class="text-decoration-none">
          <v-btn color="primary ml-2" @click="sendVerify">
            新規登録
          </v-btn>
          </nuxt-link>
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
    };
  },
  methods: {
    requireEvent() {
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