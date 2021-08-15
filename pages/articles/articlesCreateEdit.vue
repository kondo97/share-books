<template>
  <v-card color="#C8D7D0" class="create-card mx-auto my-12" max-width="600">
        <v-form ref="form" v-model="validCreate">
          <div class="py-3">
            <h2 class="text-h6 create-field-small">タイトルを入力</h2>
            <v-text-field
              label="必須"
              placeholder="（例）TOEICパーフェクト単語集"
              solo
              dense
              class="create-field-small"
              v-model="create.title"
              :rules="titleCreateRules"
            ></v-text-field>
            <p class="ma-0 create-field-small">著者名を入力</p>
            <v-text-field
              label="任意"
              placeholder="（例）名無しの権兵衛"
              solo
              dense
              class="create-field-small"
              v-model="create.author"
              :rules="authorCreateRules"
            ></v-text-field>
            <p class="ma-0 create-field-small">本の紹介</p>
            <v-textarea
              label="必須（最大140文字）"
              solo
              placeholder="（例）TOEICに頻出の単語が全て網羅された単語集です。"
              height="100"
              class="create-field-small"
              v-model="create.descript"
              :rules="descriptCreateRules"
            ></v-textarea>
            <p class="ma-0 create-field-small">amazonのURLを貼付</p>
            <v-text-field
              label="必須"
              placeholder=""
              solo
              dense
              class="create-field-small"
              v-model="create.url"
              :rules="urlCreateRules"
            ></v-text-field>
            <div class="text-center">
              <v-btn
                elevation="2"
                color="grey lighten-2"
                @click="cancelCreateEdit"
                class="mr-3"
                >キャンセル</v-btn
              >
              <v-btn
                elevation="2"
                color="success"
                @click="updateCreateEdit"
                :disabled="!validCreate"
                class="ml-3"
                >更新する</v-btn
              >
            </div>
          </div>
        </v-form>
      </v-card>
</template>

<script>
export default {
  data() {
    return {
      // ルール設定
      valid: false,
      titleRules: [
        (v) => !!v || "必須項目です。",
        (v) => (v && v.length <= 30) || "最大30文字です。",
      ],
      descriptRules: [
        (v) => !!v || "必須項目です。",
        (v) => (v && v.length <= 140) || "最大140文字です。",
      ],
      cateRules: [(v) => !!v || "必須項目です。"],
      validCreate: false,
      titleCreateRules: [
        (v) => !!v || "必須項目です。",
        (v) => (v && v.length <= 50) || "最大50文字です。",
      ],
      authorCreateRules: [(v) => v.length <= 20 || "最大20文字です。"],
      descriptCreateRules: [
        (v) => !!v || "必須項目です。",
        (v) => (v && v.length <= 140) || "最大140文字です。",
      ],
      urlCreateRules: [(v) => !!v || "必須項目です。"],
      // 本の入力データ
      create: {
        title: this.$store.getters["articlesCreate/content"].title,
        author: this.$store.getters["articlesCreate/content"].author,
        descript: this.$store.getters["articlesCreate/content"].descript,
        url: this.$store.getters["articlesCreate/content"].url,
      },
    };
  },
  methods: {
    // キャンセルボタン押下
    cancelCreateEdit() {
      this.$router.push('/articles/articlesCreate/')
    },
    // 更新ボタン押下
    updateCreateEdit() {
      this.$store.dispatch('articlesCreate/updateCreate', this.create)
      this.$router.push('/articles/articlesCreate/')
    }
  },
}
</script>