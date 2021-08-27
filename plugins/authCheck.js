import firebase from '@/plugins/firebase'

export default function ({ route, store, redirect, $axios }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // ログイン時の処理
      // authデータの取得
      store.dispatch('profile/setUser', user)
      // isAuthの取得
      store.dispatch('signIn/authCheck') 
      //閲覧ユーザーのauth情報を取得
    } else {
      // 未ログイン時の処理
      store.dispatch("signIn/logout");
    }
  })
}