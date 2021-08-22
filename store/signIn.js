import firebase from '@/plugins/firebase'

export const state = () => ({
   // ログイン状態を判別する。自分自身ユーザーかは問わない。
   isAuth: false,
   //ログインユーザーかつ自分自身ユーザー
   // isMySelf: false
})

export const getters = {
   // ログイン状態を判別する。自分自身ユーザーかは問わない。
   isAuth: state => state.isAuth,
}

export const actions = {
   //アカウント登録
   async register({ dispatch }, { userName, email, password }) {
      await this.$router.push('signInLoading')
      firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(result => {
            dispatch('sendEmail')
            const isNewUser = result.additionalUserInfo.isNewUser
            result.user.updateProfile({
               displayName: userName,
               photoURL: "https://github.com/share-hondana.png"
            }).then(() => {
               dispatch('profile/setUser', result.user, { root: true })
                  .then(() => {
                     dispatch('profile/pushUser', isNewUser, { root: true })
                  })
            })
         }).catch(function (error) {
            if (error.code == "auth/email-already-in-use") {
               dispatch('errorEmail')
            } else {
               alert('ログインに失敗しました。')
            }
            console.log({ 'code': error.code, 'message': error.message })
         })
   },
   //認証メールを送信
   sendEmail({ commit }) {
      firebase.auth().currentUser.sendEmailVerification()
         .then(() => {
         })
         .catch((error) => {
         })
   },
   // エラー画面へ遷移
   errorEmail({ commit }) {
      this.$router.push('errorEmail')
   },
   //パスワード変更メールを送信
   changePw({ commit }, email) {
      firebase.auth().sendPasswordResetEmail(email)
   },
   // ツイッターでログイン
   async singInTwitter({ dispatch, commit }) {
      const provider = new firebase.auth.TwitterAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider)
      const isNewUser = result.additionalUserInfo.isNewUser
      dispatch('profile/pushUser', isNewUser, { root: true })
      this.$router.push('signInLoading')
   },
   // Googleでログイン
   async singInGoogle({ dispatch, commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider)
      const isNewUser = result.additionalUserInfo.isNewUser
      dispatch('profile/pushUser', isNewUser, { root: true })
      this.$router.push('signInLoading')
   },
   // メールアでレスでログイン
   async signIn({ dispatch, commit }, { email, password }) {
      await this.$router.push('signInLoading')
      firebase.auth().signInWithEmailAndPassword(email, password)
         .then(result => {
            dispatch('profile/setUser', result.user, { root: true })
               .then(() => {
                  dispatch('profile/getUser', null, { root: true })
               })
         }).catch((error) => {
            if (error.code == "auth/wrong-password") {
               alert('パスワードが間違っています。')
            } else if (error.code == "auth/user-not-found") {
               alert('メールアドレスが間違っています。')
            } else {
               alert('ログインできません。')
               dispatch('logout')
            }
         });
   },
   // ログアウト処理
   logout({ commit }) {
      firebase.auth().signOut().then(function (result) {
      })
      commit('authCheckLogout')
      commit('profile/logoutReset', null, { root: true })
      this.$router.push('/')
   },

   // ログイン状態にする
   authCheck({ commit }) {
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

   },
}