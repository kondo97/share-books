import firebase from '@/plugins/firebase'

export const state = () => ({
  //userNameとiconURLは、プロフィールのデータとずれる場合あり。
  user: {
    uid: '',
    userName: '',
    iconURL: '',
  },
  //現在ログインしているユーザーの情報
  profile: {
    userName: '',
    iconURL: "https://github.com/share-hondana.png",
  },
})

export const getters = {
  user: state => state.user,
  profile: state => state.profile,
}

const db = firebase.firestore()

export const actions = {
  //authのユーザー情報をstateに格納する。
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  //stateのユーザーデータをfirestoreのprofileコレクションに格納する。
  pushUser({ getters, dispatch }, isNewUser) {
    const userID = getters.user.uid
    if (isNewUser == true) {
      db.collection(`users/${userID}/profile`).doc(userID).set({
        userName: getters.user.userName,
        iconURL: getters.user.iconURL,
      })
        .then(() => {
          dispatch('getUser')
        })
    } else {
      dispatch('getUser')
    }
  },
  // profileコレクションからデータを取得
  getUser({ getters, commit }) {
    const userID = getters.user.uid
    console.log(userID)
    db.collection(`users/${userID}/profile`).doc(userID).get()
      .then((doc) => {
        commit('getUser', doc.data())
      })
  },
  //マイページを編集
  editMyPage({ getters, dispatch, commit }, { iconURL, myPage }) {
    const userID = getters.user.uid
    db.collection(`users/${userID}/profile`).doc(userID).update({
      userName: myPage.userName,
      iconURL: iconURL,
      intro: myPage.intro,
      twitterURL: myPage.twitterURL
    }).then(() => {
      commit('editMyPage', { iconURL, myPage })
      commit('myPageProfile/editUser', { iconURL, myPage }, { root: true })
    })
  },//ログアウト時にstateの値をリセット
  logoutReset({ commit }) {
    commit('logoutReset')
  },
  //firestoreから投稿記事データを取得
  getPosts({ commit }) {
    console.log('test')
  }
}

export const mutations = {
  //authのユーザー情報を取得
  setUser(state, user) {
    state.user.uid = user.uid
    state.user.userName = user.displayName,
    state.user.iconURL = user.photoURL
  },
  //profileコレクションのユーザー情報を取得
  getUser(state, profile) {
    state.profile.userName = profile.userName,
      state.profile.iconURL = profile.iconURL
  },
  //マイページを編集
  editMyPage(state, { iconURL, myPage }) {
    state.profile.userName = myPage.userName,
    state.profile.iconURL = iconURL
  },
  logoutReset(state) {
    state.user = {
      uid: '',
      userName: '',
      iconURL: ''
    },
      state.profile = {
        userName: '',
        iconURL: "https://github.com/share-hondana.png",
      }
  }
}