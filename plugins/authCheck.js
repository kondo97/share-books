import firebase from '@/plugins/firebase'

export default function ({ route, store, redirect, $axios }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // ログイン時の処理
      // ログイン状態を判別する
      store.dispatch('profile/setUser', user)
      store.dispatch('signIn/authCheck') 
      // store.dispatch('profile/pushUser')
    } else {
      // 未ログイン時の処理
      store.dispatch("signIn/logout");
    }
  })
}