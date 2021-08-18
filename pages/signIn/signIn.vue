<template>
  <v-card class="d-flex flex-column mx-auto my-6 flat" width="374" color="#fff">
    <v-card-title class="d-flex justify-center pa-0 mt-6"
      >ログイン</v-card-title
    >
    <v-card-text class="d-flex justify-center flex-column">
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
      <p class="text-center pt-3 mt-3 text-subtitle-1 siginIn-border-top">
        メールアドレスでログイン
      </p>
      <v-form class="mx-9" ref="form" v-model="valid">
        <v-text-field
          placeholder="メールアドレス"
          outlined
          dense
          :rules="mailRules"
          v-model="email"
        ></v-text-field>
        <v-text-field
          placeholder="パスワード"
          outlined
          dense
          :rules="pwRules"
          v-model="password"
        ></v-text-field>
        <p class="pointer" @click="forgetPw">パスワードを忘れた方</p>
        <div class="text-center">
          <v-btn class="primary" :disabled="!valid" @click="submitSignIn">ログイン</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      mailRules: [
        (v) => !!v || "mail is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
      pwRules: [(v) => !!v || "password is required"],
      email: '',
      password: '',
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    // ツイッターログイン
    submitTwitter() {
      this.$store.dispatch('signIn/singInTwitter')
    },
    // グーグルログインの処理
    submitGoogle() {
      this.$store.dispatch('signIn/singInGoogle')
    },
    // メールアドレスでログイン
    submitSignIn() {
      this.$store.dispatch('signIn/signIn',{email: this.email, password: this.password})
    },
    // パスワードを忘れた時の処理
    forgetPw() {
      console.log('test')
    },
  },
};
</script>

<style>

</style>
