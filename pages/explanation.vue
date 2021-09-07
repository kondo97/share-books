<template>
  <div>
    <div class="bg-main-color ma-sm-16 pa-2 pa-sm-4">
      <h1>「Share Hondana」<br class="sp-br" />の主な機能をご紹介</h1>
      <h2 class="border-green">閲覧する</h2>
      <p>
        目当てのジャンルがあれば、「キワード検索」や「カテゴリー検索」を利用しましょう。
      </p>
      <p>
        また新しいジャンルと出会いたい場合は、「カテゴリー検索」で様々なジャンルの本を探すことができます。
      </p>
      <h2 class="border-green">交流する</h2>
      <p>
        いいね、コメント、フォローといった機能を活用して、ほかユーザーとの交流も楽しみましょう。
      </p>
      <p id="post">
        マイページを充実させて、自分についての情報を発信できます。
      </p>
      <h2 class="border-green">投稿する</h2>
      <p>
        「Share
        Hondana」では、ユーザーの投稿へのハードルを下げるために、フォーマットや文字数に制限を加えています。
      </p>
      <h3>投稿制限</h3>
      <h4>文字数</h4>
      <p>
        投稿タイトルは最大30文字。本のタイトルは最大50文字。投稿や本の説明は最大140文字です。
      </p>
      <h4>必須項目</h4>
      <p>
        投稿のタイトル、説明、カテゴリーは必須です。また、本の著者入力は任意ですが、AmazonのURLは必須項目です。
      </p>
      <h4>本の最大数</h4>
      <p>
        一つの投稿に掲載できる本は最大5冊です。それ以上の本をシェアしたい場合、お手数ですが、投稿を2回以上に分けてください。
      </p>
      <p>
        （例）「前編 お気に入りの本をご紹介！」「後編
        お気に入りの本をご紹介！」← このように2つ以上に分けて投稿して下さい。
      </p>
      <h2 class="border-green">シェアする</h2>
      <p>
        SNSボタンを活用して、TwitterやFacebookと連携し、より多くの人へ発信していきましょう。
      </p>
      <h3>最後に</h3>
      <p>
        本サイトの開発者である近藤はプログラミング初心者のため、使用上何かと不具合が発生する場合があるかと思います。
      </p>
      <p>
        不具合、またご意見・ご感想がございましたら、お気軽に開発者宛にご連絡下さい。
      </p>
      <p>お手数ですが、ご連絡はTwitterのDMまでお願いたします。</p>
      <a target="_blank" class="dm" href="https://twitter.com/NdXZizhmlwdJRWF"
        >近藤のTwitter</a
      >
    </div>
  </div>
</template>

<script>
export default {};
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
  padding: 1%;
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