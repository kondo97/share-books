<template>
    <div class="fullview">
      <div class="loading-spacer"></div>
        <no-ssr>
        <vue-loading
          type="spiningDubbles"
          color="#aaa"
          :size="{ width: '100px', height: '100px' }"
        >
        </vue-loading>
        </no-ssr>
    </div>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  name: 'Loading',
  created() {
    firebase.auth().onAuthStateChanged(user => {
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
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.loading-spacer {
  height: 40%;
}
</style>