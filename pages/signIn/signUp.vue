<template>
<div>
  <v-card class="d-flex flex-column my-6 mx-auto" width="374" color="#fff">
    <v-form ref="form" v-model="valid">
      <v-card-title class="d-flex justify-center pa-0 mt-6 mb-3"
        >新規登録</v-card-title
      >
      <v-card-text class="d-flex justify-center flex-column">
        <div class="mx-9">
          <v-text-field
            label="ユーザー名"
            placeholder="50文字以内"
            outlined
            dense
            :rules="nameRules"
            v-model="userName"
          ></v-text-field>
          <v-text-field
            label="メールアドレス"
            placeholder="mail@example.com"
            outlined
            dense
            :rules="mailRules"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="パスワード"
            placeholder="半角英数字8文字以上"
            outlined
            dense
            :rules="pwRules"
            :type="show ? 'text' : 'password'"
             @click:append="show = !show"
             :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="password"
          ></v-text-field>
        </div>
        <div class="text-center">
          <v-btn class="primary" :disabled="!valid" @click="submitRegister">登録</v-btn>
        </div>
        <p class="signUp-border-top text-center mt-6 mb-0 pt-6">
          ソーシャルアカウントでログイン
        </p>
        <v-btn
          class="fill-width mt-6 text-capitalize caption mx-4"
          rounded
          color="#00ACEE"
          dark
          depressed
          height="48px"
          @click="submitTwitter"
        >
          <img
            class="button-logo-img mr-4"
            src="~/static/twitter.png"
            style="height: 20px"
          />
          twitterでログイン
        </v-btn>
        <v-btn
          class="fill-width mt-6 text-capitalize caption mx-4 mb-6"
          rounded
          height="48px"
          outlined
          style="border-color: #979797"
          @click="submitGoogle"
        >
          <img
            class="button-logo-img mr-4"
            src="https://madeby.google.com/static/images/google_g_logo.svg"
            style="height: 24px"
          />
          Googleでログイン
        </v-btn>
      </v-card-text>
    </v-form>
  </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || "user name is required",
        (v) => (v && v.length <= 50) || "最大50文字です。",
      ],
      mailRules: [
        (v) => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
      pwRules: [
        (v) => !!v || "password is required",
         v => /^[\w-]{8,72}$/.test(v) || '半角英数字8文字以上'],
      show: false,
      userName:'',
      email:'',
      password:''
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    //アカウント登録
    submitRegister () {
     this.$store.dispatch('signIn/register', {userName: this.userName, email: this.email, password: this.password})
    },
    // ツイッターログインの処理
    submitTwitter() {
      this.$store.dispatch('signIn/singInTwitter')
    },
    // グーグルログインの処理
    submitGoogle() {
      this.$store.dispatch('signIn/singInGoogle')
    },
  },
};
</script>

<style>

</style>