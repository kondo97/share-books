import firebase from '@/plugins/firebase'

export const state = () => ({
  //userNameとiconURLは、プロフィールのデータとずれる場合あり。
  user: {
    uid: '',
    userName: '',
    iconURL: '',
  },
  profile: {
    userName: '',
    iconURL: "https://github.com/share-hondana.png",
    intro: '',
    twitterURL: ''
  }
})

export const getters = {
  user: state => state.user,
  profile: state => state.profile
}

const db = firebase.firestore()

export const actions = {
  //authのユーザー情報をstateに格納する。
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  //stateのユーザーデータをfirestoreのprofileコレクションに格納する。
  pushUser({ getters, dispatch }, isNewUser) {
    console.log(isNewUser)
    const userID = getters.user.uid
    if(isNewUser == true) {
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
    db.collection(`users/${userID}/profile`).doc(userID).get()
      .then((doc) => {
        commit('getUser', doc.data())
      })
  },
  //マイページを編集
  editMyPage({ getters, dispatch ,commit }, myPage) {
    const userID = getters.user.uid
    db.collection(`users/${userID}/profile`).doc(userID).update({
      userName: myPage.userName,
      iconURL: myPage.iconURL,
      intro: myPage.intro,
      twitterURL: myPage.twitterURL
    })
    commit('editMyPage', myPage)
  },
  logoutReset({ commit }) {
    commit('logoutReset')
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
    state.profile.intro =  profile.intro
    state.profile.twitterURL = profile.twitterURL
  },
  //マイページを編集
  editMyPage(state, myPage) {
    state.profile = myPage
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
        intro: '',
        twitterURL: ''
      }
  }
}