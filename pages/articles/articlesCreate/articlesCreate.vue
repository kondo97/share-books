<template>
  <v-row class="justify-center ma-3">
    <!-- 左側入力欄 -->
    <v-col cols="12" sm="6" class="px-sm-3 px-md-12 left-create pb-12">
      <div class="">
        <v-row>
          <v-col>
            <p class="text-h5 mt-3">本棚を作成</p>
          </v-col>
          <v-col class="justify-end align-end d-flex">
            <div>
            <v-btn
              elevation="2"
              color="primary"
              class="delete-btn"
              @click="deletePosts"
              >破棄する</v-btn
            >
            </div>
          </v-col>
        </v-row>
        <nuxt-link to="/" class="how-to-create">
          <p class="mt-3">作成方法はこちらから</p>
        </nuxt-link>
        <v-form ref="form" v-model="valid">
          <v-text-field
            label="本棚タイトル"
            placeholder="（例）英語学習におすすめの本を紹介"
            solo
            dense
            v-model="articleTitle"
            :rules="titleRules"
          ></v-text-field>
          <v-textarea
            solo
            label="本棚の説明"
            placeholder="（例）TOEIC900点取得までに使用した教材をご紹介します。"
            height="100"
            v-model="articleDescript"
            :rules="descriptRules"
          ></v-textarea>
          <v-select
            :items="items"
            label="カテゴリー"
            solo
            dense
            v-model="articleCate"
            :rules="cateRules"
          >
          </v-select>
        </v-form>
      </div>
      <v-card color="#C8D7D0" class="create-card">
        <v-form ref="form" v-model="validCreate">
          <div class="py-3">
            <p class="text-h6 create-field-small">タイトルを入力</p>
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
                color="success"
                @click="nextBook"
                :disabled="!validCreate"
                v-if="!overBooks"
                >反映する</v-btn
              >
              <p
                class="red--text text--darken-2"
                @click="nextBook"
                v-if="overBooks"
                >最大5冊までの投稿が可能です。</p
              >
            </div>
          </div>
        </v-form>
      </v-card>
    </v-col>
    <!-- 右側表示欄 -->
    <v-col cols="12" sm="6" class="px-sm-3 px-md-12 create-border right-create">
      <p class="text-h5 mt-3">プレビュー</p>
      <div class="pa-6 mt-3" :class="{ bgMainColor: articleTitle }">
        <h1 class="mt-6" :class="{ articleTitle: articleTitle }">
          {{ articleTitle }}
        </h1>
        <p class="mt-6">
          {{ articleDescript }}
        </p>
        <v-row class="mt-3">
          <v-col cols="2" sm="1">
            <v-icon v-show="articleCate">mdi-tag</v-icon>
          </v-col>
          <v-col cols="9" sm="6">
            <p>{{ articleCate }}</p>
          </v-col>
        </v-row>
        <v-list class="bgMainColor pa-0">
          <v-list-item-group>
            <v-list-item
              v-for="(content, index) in contents"
              :key="index"
              disabled
            >
              <div class="d-flex flex-column mx-auto book-width">
                <h2 class="mt-9">{{ index + 1 }}冊目</h2>
                <v-card class="my-2 px-sm-6 pa-6 pb-0" elevation="3">
                  <div class="text-right">
                    <v-icon @click="editCreateBook(index)" class="prevent-item"
                      >mdi-pencil</v-icon
                    >
                    <v-icon @click="deleteContent(index)" class="prevent-item"
                      >mdi-delete</v-icon
                    >
                  </div>
                  <h2 class="mt-4 text-sm-h5 text-h6">
                    タイトル：{{ content.title }}
                  </h2>
                  <p class="mt-3" v-if="content.author">
                    著者名：{{ content.author }}
                  </p>
                  <p class="mt-3">
                    {{ content.descript }}
                  </p>
                  <div class="logo mt-6 mx-auto">
                    <a :href="content.url">
                      <img
                        src="~/static/amazon.png"
                        alt="amazonのロゴ"
                        class="logo--amazon"
                      />
                    </a>
                  </div>
                </v-card>
              </div>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-col>
    <v-btn
      elevation="2"
      color="primary"
      class="public-btn"
      :disabled="!valid"
      @click="publicPosts"
      >公開する</v-btn
    >
  </v-row>
</template>

<script>
export default {
  created() {
    this.articleTitle = this.$store.getters['posts/articleTitle']
    this.articleDescript= this.$store.getters['posts/articleDescript']
    this.articleCate = this.$store.getters['posts/articleCate']
  },
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
      //カテゴリー
      items: [
        "文学・評論",
        "ノンフィクション",
        "ビジネス・経済",
        "歴史・地理",
        "政治・社会",
        "芸術・エンターテイメント",
        "アート・建築・デザイン",
        "人文・思想・宗教",
        "暮らし・健康・料理",
        "サイエンス・テクノロジー",
        "学習・趣味・自己啓発",
        "スポーツ・アウトドア",
        "辞典・年間・本・言葉",
        "音楽",
        "旅行・紀行",
        "絵本・児童書",
        "コミックス",
        "その他",
      ],
      // 本棚のタイトル
      articleTitle: "",
      //本棚の説明
      articleDescript: "",
      // 本棚のカテゴリー
      articleCate: "",
      // 本のデータがここに格納される
      // contents: [],
      // 本の入力データ
      create: {
        title: "",
        author: "",
        descript: "",
        url: "",
      },
    };
  },
  methods: {
    nextBook() {
      // this.contents.push(this.create);
      this.$store.dispatch("posts/pushBook", this.create);
      this.create = {
        title: "",
        author: "",
        descript: "",
        url: "",
      };
    },
    //本の編集。フロントデータのみ変更。
    editCreateBook(index) {
      const content = this.contents[index];
      this.$store.dispatch("posts/editCreate", { content, index });
      this.$router.push("/articles/articlesCreate/articlesCreateEdit/");
    },
    //本の削除
    deleteContent(index) {
      if (confirm("削除しますか？")) {
        this.$store.dispatch("posts/deleteBook", index);
      }
    },
    //記事そのものを削除
    deletePosts() {
      if(confirm('記事を破棄しますか？(注意)復元は出来ません。')) {
        this.articleTitle = '',
        this.articleDescript = '',
        this.articleCate = ''
        this.$router.push('/')
        this.$store.dispatch("posts/deletePosts");
      }
    },
    //公開ボタン押下
    publicPosts() {
      this.$store.dispatch("posts/pushCreatePosts", {
        articleTitle: this.articleTitle, 
        articleDescript: this.articleDescript,
        articleCate: this.articleCate,
        contents: this.contents,
        userUid: this.$store.getters['profile/user'].uid
      }).then(() =>{
        this.articleTitle = '',
        this.articleDescript = '',
        this.articleCate = ''
      })
    },
  },
  computed: {
    contents() {
      return this.$store.getters["posts/contents"];
    },
    overBooks() {
      return this.$store.getters['posts/overBooks']
    }
  },
  destroyed() {
    this.$store.dispatch('posts/savePosts', {
      articleTitle: this.articleTitle, 
      articleDescript: this.articleDescript,
      articleCate: this.articleCate,
    })
  },
 
};
</script>

<style>
</style>