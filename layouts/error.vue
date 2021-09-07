<template>
  <div class="error-wrap">
    <h1 class="error-title">{{error.statusCode}}</h1>
    <p  v-if="error.statusCode === 404">ページが見つかりません</p>
    <p>エラーが発生しました</p>
    <nuxt-link class="how-to-create" to="/">ホーム</nuxt-link>
  </div>
</template>
<script>
  export default {
    props: ['error'], 
  }; 
</script>
<style>
 .error-wrap {
   text-align: center;
   padding: 20px;
 }
</style>
