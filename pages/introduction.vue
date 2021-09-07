<template>
  <div>
    <div class="bg-main-color ma-sm-16 pa-4 pa-sm-9">
      <h1>「Share Hondana」の作成目的・開発理念</h1>
      <h2 class="border-green">メインテーマ</h2>
      <h3>
        「Share Hondana」は、<span class="color-green"
          >”本の購入の楽しみ方を広げたい”</span
        >をメインテーマに定め、開発に取り組んでいます。
      </h3>
      <p>
        Amazon等のインターネット販売は、本の購入に新たな楽しみ方を提示しました。
      </p>
      <p>
        「あなたへのおすすめ（レコメンド機能）」や「購入者のレビュー」は、リアル店舗である本屋では提供していなかった機能です。
      </p>
      <p>
        一方で本屋にも、ふらっと立ち寄るだけで、最新のトレンドや全く新しいジャンルが目に入ってくるといった、本屋ならではの良いところ・楽しみ方もあります。
      </p>
      <p>
        <span class="color-green">
          「Share
          Hondana」では、インターネット販売や本屋が提供している楽しみ方を参考にして、”購入の楽しみ”をより一層広げるために何かできないか、そんな考えから開発がスタートしています。</span
        >
      </p>
      <h2 class="border-green">ユーザー別の楽しみ方</h2>
      <h3>閲覧ユーザー</h3>
      <p>
        「何か面白い本はないかな」、「これまで縁がなかった新しいジャンルを知りたい」
      </p>
      <p>「Share Hondana」はこれらのニーズに応えます。</p>
      <p>
        目当てのジャンルがあれば、キワード検索が活用できます。そしてカテゴリー検索は、気軽に"様々な出会い"をユーザーに提供します。
      </p>
      <p>
        また、いいね、コメント、フォローといった機能を用いて、他ユーザーとの交流も可能です。
      </p>
      <h3>投稿ユーザー</h3>
      <p>
        現代には様々な情報発信の手段がありますが、消費者個人が”おすすめの何か”を発信する手段は意外にも限られています。
      </p>
      <p>
        レビュー機能は匿名であり、"個人"が存在しません。また個人ブログで紹介するというのはハードルが高く、投稿者が限られます。<span
          class="color-green"
          >個人が存在した上で、かつ手軽におすすめの本をシェアできるという、いわば”本特化のSNS”のような立ち位置を「Share
          Hondana」は意識しています。</span
        >
      </p>
      <p>
        投稿機能は、フォーマットや文字数に大きく制限をすることによって、ブログサイトよりもずっと手軽に投稿できるように設計しています。
      </p>
      <p>
        各ページにシェアボタンを設け、投稿記事をTwitterでシェアすることで、より多くの人へ発信することが可能です。
      </p>
      <p>
        「Share
        Hondana」は、<span class="color-green">これまでにユーザー自身が読んできた書籍を手軽に多くの人へシェアするという楽しみを提供します。</span>
      </p>
      <h4>最後に</h4>
      <p>
        「Share
        Hondana」は"投稿型プラットフォーム"という位置づけであり、より多くのユーザーに参加していただくことで、その楽しみが広がっていきます。
      </p>
      <p>
        より多くのユーザーに楽しんでいただけるように、順次アップデートしていきます。
      </p>
      <p>
        本サイトの開発者である近藤はプログラミング初心者のため、使用上何かと不具合が発生する場合があるかと思います。
      </p>
      <p>
        不具合、またご意見・ご感想がございましたら、お気軽に開発者宛にご連絡下さい。
      </p>
      <p>お手数ですが、ご連絡はTwitterのDMまでお願いたします。</p>
      <a target="_brank" href="https://twitter.com/NdXZizhmlwdJRWF" class="dm">近藤のTwitter</a>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
p {
  margin-bottom: 2% !important;
}

h1 {
  text-align: center;
}

h2 {
  margin-top: 4%;
  margin-bottom: 1%;
}

h3 {
  margin-top: 3%;
  margin-bottom: 2%;
}

h4 {
  margin-top: 3%;
  margin-bottom: 2%;
}

.border-green {
  text-align: center;
  border: 3px solid #b3cab8;
  padding: 5px;
}

.color-green {
  font-weight: 700;
  color: #6e907f;
}

.dm {
  text-decoration: none;
}

.sp-br {
  display: none;
}

@media screen and (max-width: 480px) {
  .sp-br {
    display: block;
  }

  p {
    margin-bottom: 10% !important;
  }

  h1 {
    text-align: center;
  }

  h2 {
    margin-top: 8%;
    margin-bottom: 2%;
  }

  h3 {
    margin-top: 6%;
    margin-bottom: 4%;
  }

  h4 {
    margin-top: 6%;
    margin-bottom: 4%;
  }

  .border-green {
    text-align: center;
    border: 3px solid #b3cab8;
    padding: 2%;
  }
}

</style>