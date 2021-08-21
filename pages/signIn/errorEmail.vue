<template>
  <v-card class="d-flex flex-column mx-auto my-6 flat" width="374" color="#fff">
    <v-card-title class="mx-auto mt-6"
      >このメールアドレスは既に使われています。</v-card-title
    >
    <v-card-text class="my-6">
      <p @click="forgetPw" class="text-center hover-blue pointer">
        パスワードをお忘れの方
      </p>
      <p class="text-center hover-blue mt-6 pointer" @click="cancelPw">
        ログイン画面へ移動
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    forgetPw() {
      this.$router.push("/signIn/forgetPw");
    },
    cancelPw() {
      this.$router.push("/signIn/signUp");
    },
  },
};
</script>