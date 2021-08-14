<template>
  <div class="">
    <div class="create-title mx-auto">
      <h1 class="text-sm-h4 text-h5 mt-9">本棚を作成</h1>
      <nuxt-link to="/" class="how-to-create">
        <p class="text-right">作成方法はこちらから</p>
      </nuxt-link>

      <v-text-field
        label="本棚タイトル"
        placeholder="（例）英語学習におすすめの本を紹介"
        solo
        class="mt-9"
        height="10"
      ></v-text-field>
      <v-textarea
        solo
        label="本棚の説明"
        placeholder="（例）TOEIC900点取得までに使用した教材をご紹介します。"
        height="120"
      ></v-textarea>
    </div>
    <v-card color="#C8D7D0" class="create-card mx-auto px-9 pt-9">
      <div class="">
        <h2 class="text-sm-h5 text-h6">作品名を入力</h2>
        <v-text-field
          label="必須"
          placeholder="（例）TOEICパーフェクト単語集"
          solo
          height="10"
        ></v-text-field>
        <p>著者名を入力</p>
        <v-text-field
          label="任意"
          placeholder="（例）名無しの権兵衛"
          solo
          height="10"
        ></v-text-field>
        <p>本の紹介</p>
        <v-textarea
          label="必須（最大140文字）"
          solo
          placeholder="（例）TOEICに頻出の単語が全て網羅された単語集です。"
          height="120"
        ></v-textarea>
        <p>amazonのURLを貼付</p>
        <v-text-field label="必須" placeholder="" solo height="10"></v-text-field>
      </div>
    </v-card>
    <v-row class="my-9 d-flex justify-center">
      <v-col sm="3" class="text-center"
        ><v-btn elevation="2" color="success">本を追加</v-btn></v-col
      >
      <v-col sm="3" class="text-center"
        ><v-btn elevation="2" color="primary">更新する</v-btn></v-col
      >
    </v-row>
  </div>
</template>

<style>
.how-to-create {
  text-decoration: none;
}

.create-title {
  width: 60%;
}

.create-card {
  width: 60%;
}

@media screen and (max-width: 480px) {
  .create-title {
    width: 100%;
  }

  .create-card {
    width: 100%;
  }
}
</style>