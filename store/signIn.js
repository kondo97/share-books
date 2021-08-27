import firebase from '@/plugins/firebase'

export const state = () => ({
   // ログイン状態を判別する。自分自身ユーザーかは問わない。
   isAuth: false,
})

export const getters = {
   // ログイン状態を判別する。自分自身ユーザーかは問わない。
   isAuth: state => state.isAuth,
}

const db = firebase.firestore()
const auth = firebase.auth()

export const actions = {
   //アカウント登録
   async register({ dispatch }, { userName, email, password }) {
      //ローディン画面へ画面遷移
      this.$router.push('signInLoading')
      try {
         //アカウント作成
         const result = await auth.createUserWithEmailAndPassword(email, password)
         //メールを送る
         dispatch('sendEmail')
         //初めてのユーザーであることを確認？
         // const isNewUser = await result.additionalUserInfo.isNewUser
         // console.log(isNewUser)
         //初期情報をauthのユーザーデータに格納する。
         result.user.updateProfile({
            displayName: userName,
            photoURL: "https://github.com/share-hondana.png"
         }).then(() => {
            // dispatch('profile/setUser', result.user, { root: true })
               // .then(() => {
                  //ユーザーデータをprofileコレクションに格納する。
                  dispatch('profile/pushUser', true, { root: true })
               // })
         })
      } catch (error) {
         if (error.code == "auth/email-already-in-use") {
            dispatch('errorEmail')
         } else {
            alert('ログインに失敗しました。')
         }
         console.log({ 'code': error.code, 'message': error.message })
      }
   },
   //認証メールを送信
   sendEmail({ commit }) {
      firebase.auth().currentUser.sendEmailVerification()
   },
   // エラー画面へ遷移
   errorEmail({ commit }) {
      this.$router.push('errorEmail')
   },
   //パスワード変更メールを送信
   changePw({ commit }, email) {
      auth.sendPasswordResetEmail(email)
   },
   // ツイッターでログイン
   async singInTwitter({ dispatch, commit }) {
      const provider = new firebase.auth.TwitterAuthProvider();
      try {
         const result = await auth.signInWithPopup(provider)
         //初回ログインならisNewUserはtrueとなり、profileコレクションを作成
         const isNewUser = result.additionalUserInfo.isNewUser
         dispatch('profile/pushUser', isNewUser, { root: true })
         //メール認証が完了していなければ、メールを送る。
         const emailVerified = result.user.emailVerified
         if (emailVerified == false) {
            this.$router.push('twitterEmail')
         } else {
            this.$router.push('signInLoading')
         }
      } catch (error) {
         alert('ログインに失敗しました。')
      }
   },
   //ツイッターログイン時は、別途メール認証が必要。
   async submitTwitterMail({ commit }, { email, password }) {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      try {
         const usercred = await auth.currentUser.linkWithCredential(credential)
         const user = usercred.user;
         auth.currentUser.sendEmailVerification()
         this.$router.push('/')
      } catch (error) {
         console.log({ 'code': error.code, 'message': error.message })
         if (error.code == "auth/provider-already-linked") {
            alert('既にメールアドレスは登録されています。')
            this.$router.push('/')
         } else if (error.code == "auth/email-already-in-use") {
            alert('このメールアドレスは既に使われています。')
         } else {
            alert('メールの送信に失敗しました。')
         }
      }
   },
   // Googleでログイン
   async singInGoogle({ dispatch, commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
         const result = await auth.signInWithPopup(provider)
         const isNewUser = result.additionalUserInfo.isNewUser
         dispatch('profile/pushUser', isNewUser, { root: true })
         this.$router.push('signInLoading')
      } catch (error) {
         alert('ログインに失敗しました。')
      }

   },
   // メールアでレスでログイン
   async signIn({ dispatch, commit }, { email, password }) {
      this.$router.push('signInLoading')
      try {
         const result = await auth.signInWithEmailAndPassword(email, password)
         // dispatch('profile/setUser', result.user, { root: true })
         dispatch('profile/getUser', null, { root: true })

      } catch (error) {
         if (error.code == "auth/wrong-password") {
            alert('パスワードが間違っています。')
         } else if (error.code == "auth/user-not-found") {
            alert('メールアドレスが間違っています。')
         } else {
            alert('ログインできません。')
            dispatch('logout')
         }
         
      }
   },
   // ログアウト処理
   logout({ commit }) {
      auth.signOut().then(function (result) {
      })
      commit('authCheckLogout')
      commit('profile/logoutReset', null, { root: true })
      commit('posts/logoutReset', null, { root: true })
      commit('getPosts/logoutReset', null, { root: true })
      commit('myPageProfile/logoutReset', null, { root: true })
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