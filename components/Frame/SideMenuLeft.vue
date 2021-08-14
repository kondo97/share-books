<template>
  <div class="left-menu sm-top">
    <v-card
      class="mt-12 d-none d-sm-none d-md-block d-lg-block d-xl-block mx-sm-auto"
      max-width="180"
      color="#F4F1EF"
      elevation="6"
    >
      <v-card-title class="my-3">カテゴリー</v-card-title>
      <v-card-text>
        <v-row class="d-flex flex-column">
          <v-col>文学・評論</v-col>
          <v-col>ノンフィクション</v-col>
          <v-col>ビジネス・経済</v-col>
          <v-col>歴史・地理</v-col>
          <v-col>政治・社会</v-col>
          <v-col>芸術・エンターテイメント</v-col>
          <v-col>アート・建築・デザイン</v-col>
          <v-col>人文・思想・宗教</v-col>
          <v-col>暮らし・健康・料理</v-col>
          <v-col>サイエンス・テクノロジー</v-col>
          <v-col>学習・趣味・自己啓発</v-col>
          <v-col>スポーツ・アウトドア</v-col>
          <v-col>辞典・年間・本・言葉</v-col>
          <v-col>音楽</v-col>
          <v-col>旅行・紀行</v-col>
          <v-col>絵本・児童書</v-col>
          <v-col>コミックス</v-col>
          <v-col>その他</v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- タブレット以下は表示 -->
    <div class="d-block d-sm-block d-md-none d-lg-none d-xl-none">
      <div class="sm-category mt-3 mx-auto">
        <v-select :items="items" label="カテゴリー" solo> </v-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>

<style>
.left-menu {
  width: 180px;
}

.sm-top {
  width: 100%;
}

.sm-twitter {
  text-align: right;
}

.sm-category {
  width: 60%;
}

</style>