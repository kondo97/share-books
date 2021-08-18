import firebase from '@/plugins/firebase'

export default function ({ route, store, redirect, $axios }) {
  firebase.auth().onAuthStateChanged(user => {
    console.log(user)
    if (user) {
      // ログイン時の処理
      // ログイン状態を判別する
      store.dispatch('signIn/authCheck') 
    } else {
      // 未ログイン時の処理
      store.dispatch("signIn/logout");
    }
  })
}