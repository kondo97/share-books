<template>
  <v-card class="d-flex flex-column mx-auto my-6 flat" width="374" color="#fff">
    <v-card-title class="mx-auto mt-6"> 認証用のメールアドレスを送信 </v-card-title>
    <v-card-text class="text-center">(Twitterでログインしたユーザー様専用)</v-card-text>
    <v-form class="mx-9 mt-4" ref="form" v-model="valid">
      <v-text-field
        placeholder="メールアドレス"
        outlined
        dense
        :rules="mailRules"
        v-model="email"
      ></v-text-field>
      <v-text-field
          placeholder="パスワードを設定して下さい。"
          outlined
          dense
          :rules="pwRules"
          v-model="password"
          :type="show ? 'text' : 'password'"
        ></v-text-field>
      <v-card-text>
        <p>認証完了後、各種機能がご利用頂けます。</p>
        <p>送信後は、入力したメールアドレスに記載されているURLから認証を行って下さい。</p>
      </v-card-text>
      <div class="text-center mb-9">
          <v-btn class="primary" :disabled="!valid" @click="submitMail">送信</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      mailRules: [
        (v) => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
      pwRules: [
        (v) => !!v || "password is required",
        v => /^[\w-]{8,72}$/.test(v) || '半角英数字8文字以上'],
      show: false,
    }
  },
  methods: {
    submitMail() {
      this.$store.dispatch('signIn/submitTwitterMail', {email: this.email, password: this.password})
    }
  },
}
</script>