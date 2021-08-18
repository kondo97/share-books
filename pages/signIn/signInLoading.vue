<template>
    <div class="fullview">
      <h1>ログインしています。</h1>
      <div class="loading-spacer"></div>
        <vue-loading
          type="spiningDubbles"
          color="#aaa"
          :size="{ width: '100px', height: '100px' }"
        >
        </vue-loading>
    </div>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  name: 'Loading',
  created() {
    firebase.auth().onAuthStateChanged(user => {
    console.log(user)
    if (user) {
      this.$router.push('/')
    }else {
      return
    }
  })
  }
}
</script>

<style>
h1 {
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
}

.fullview {
  width: 100%;
  height: 100vh;
  background: #D9CEC8;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.loading-spacer {
  height: 40%;
}
</style>