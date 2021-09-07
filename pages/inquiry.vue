<template>
  <div>
    
    <form
      class="p-form"
      action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfDGsEfFimzSH9tZBmSzp--GQLhMlZhz8TN3bVTR9b3CQz5eQ/formResponse"
      target="dummy"
    >
      <!-- お問い合わせ内容 セレクトボックス -->
      <div class="p-formGroup p-formGroup__select u-mb20">
        <label for="contactType">お問い合わせ内容を選択
        </label>
        <select
          name="entry.1627256183"
          id="contactType"
          class="pointer"
        >
          <option data-value="不具合の発見" value="不具合の発見">
            不具合の発見
          </option>
          <option data-value="ご意見・ご感想" value="ご意見・ご感想">ご意見・ご感想</option>
          <option data-value="不正報告" value="不正報告">不正報告</option>
          <option data-value="お困りごと" value="お困りごと">お困りごと</option>
          <option data-value="その他" value="その他">その他</option>
        </select>
      </div>
      <!--//End お問い合わせ内容 セレクトボックス -->

      <!-- お名前 テキスト入力 -->
      <div class="p-formGroup u-mb20">
        <label for="userName">お名前</label>
        <input
          type="text"
          id="userName"
          name="entry.806161169"
          required
        />
      </div>
      <!--//END お名前 テキスト入力 -->

      <!-- メールアドレス入力 -->
      <div class="p-formGroup u-mb20">
        <label for="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          name="entry.1424439844"
          required
        />
      </div>
      <!--//End メールアドレス入力 -->

      <!-- ご依頼内容 テキスト入力 -->
      <div class="p-formGroup u-mb20">
        <label for="content">お問い合わせ内容</label>
        <textarea
          id="content"
          name="entry.207084762"
          required
        ></textarea>
      </div>
      <!--//End ご依頼内容 テキスト入力 -->

      <!-- 送信 -->
      <div class="p-btn">
        <input class="primary" type="submit" value="送信する" @click="sendInquiry"/>
      </div>
      <!--//End 送信 -->
    </form>
    <iframe name="dummy" style="display:none;"></iframe>
  </div>
</template>

<script>
export default {
  methods: {
    sendInquiry() {
      if(!alert('お問い合わせを送信しました。')){
        this.$router.push('/')
      }
    }
  },
}
</script>

<style scoped>
 .p-form {
   background: #fff;
   margin: 0 auto;
   max-width: 600px;
   margin-top: 3%;
   margin-bottom: 3%;
   padding: 16px;
 }


select, input, textarea {
  border: 2px solid #ccc;
   border-radius: 3px;
}

 .p-formGroup {
   display: flex;
   flex-direction: column;
   margin-bottom: 20px;
 }

 label {
   margin-bottom: 10px;
   color: #3F6060;
 }

 select {
   padding: 10px;
 }

 input {
   padding: 6px;
 }

 textarea {
   padding: 5px;
 }

 .p-btn {
   color: #fff;
   text-align: center;
 }


</style>