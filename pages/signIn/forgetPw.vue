<template>
  <div>
    <v-card
      class="d-flex flex-column mx-auto my-9 flat"
      width="374"
      color="#fff"
      v-if="!sended"
    >
      <v-card-title class="mx-auto mt-6"> パスワード再設定 </v-card-title>
      <v-form class="mx-9 my-6" ref="form" v-model="valid">
        <v-text-field
          placeholder="メールアドレス"
          outlined
          dense
          :rules="mailRules"
          v-model="email"
        ></v-text-field>
      </v-form>
      <div class="text-center mb-6">
        <v-btn color="grey lighten-2 mr-2" @click="cancelPw">キャンセル</v-btn>
        <v-btn class="primary ml-2" :disabled="!valid" @click="submitSignIn(); changeSended()"
          >送信</v-btn
        >
      </div>
    </v-card>
    <v-card
      class="d-flex flex-column mx-auto my-9 flat"
      width="374"
      color="#fff"
      v-if="sended"
    >
      <v-card-title class="mx-auto mt-6"> メールを送信しました。 </v-card-title>
      <p class="mx-6 my-6">メールが届かない場合は、もう一度送信して下さい。
      </p>
      <p class="hover-blue pointer text-center mb-9" @click="changeSended">再送信はこちらから</p>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sended: false,
      valid: false,
      mailRules: [
        (v) => !!v || "mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      email: "",
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    cancelPw() {
      this.$router.push("signIn");
    },
    changeSended() {
     this.sended = ! this.sended
    },
    // パスワードの再設定メールを送信
    submitSignIn() {
      this.$store.dispatch('signIn/changePw', this.email)
    }
  },
};
</script>