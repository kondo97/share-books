import firebase from '@/plugins/firebase'

export const state = () => ({
  //閲覧対象のユーザーの情報
  wachedProfile: {
    userName: '',
    iconURL: "https://github.com/share-hondana.png",
    intro: '',
    twitterURL: ''
  },
})

export const getters = {
  wachedProfile: state => state.wachedProfile
}

const db = firebase.firestore()

export const actions = {
  wachedProfile({ commit }, uid) {
    db.collection(`users/${uid}/profile`).doc(uid).get()
      .then((doc) => {
        commit('getUser', doc.data())
      })
  },
}

export const mutations = {
  getUser(state, wachedProfile) {
    console.log(wachedProfile)
    state.wachedProfile.userName = wachedProfile.userName,
    state.wachedProfile.iconURL = wachedProfile.iconURL
    state.wachedProfile.intro = wachedProfile.intro
    state.wachedProfile.twitterURL = wachedProfile.twitterURL
  },
  // マイページ更新時
  editUser(state, { iconURL, myPage }) {
    state.wachedProfile.userName = myPage.userName,
    state.wachedProfile.iconURL = iconURL,
    state.wachedProfile.intro = myPage.intro,
    state.wachedProfile.twitterURL = myPage.twitterURL
  },
  logoutReset(state) {
    state.wachedProfile =  {
      userName: '',
      iconURL: "https://github.com/share-hondana.png",
      intro: '',
      twitterURL: ''
    }
  }
}