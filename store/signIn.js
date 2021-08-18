import firebase from '@/plugins/firebase'

export const state = () => ({
   // ログイン状態を判別する。認証ユーザーかは問わない。
   isAuth: false
})

export const getters = {
   // ログイン状態を判別する。認証ユーザーかは問わない。
   isAuth: state => state.isAuth,
}

export const actions = {
   // ツイッターでログイン
   singInTwitter({ commit }) {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithRedirect(provider)
      this.$router.push('signInLoading')
   },
   // Googleでログイン
   singInGoogle({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider)
      this.$router.push('signInLoading')
   },
   // メールアでレスでログイン
   signIn({ commit }, { email, password }) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
         this.$router.push('signInLoading')
       }).catch((error) => {
          alert(eroor)
       });
   },
   // ログアウト処理
   async logout({ commit }) {
      firebase.auth().signOut().then(function (result) {
         console.log('logout')
      })
      await commit('authCheckLogout')
   },

   // ログイン状態にする
   authCheck({ commit }) {
      console.log('authcheck')
      commit('authCheck')
   }
}

export const mutations = {
   // ログイン時
   authCheck(state) {
      state.isAuth = true
   },
   // ログアウト時
   authCheckLogout(state) {
      state.isAuth = false
   }
}