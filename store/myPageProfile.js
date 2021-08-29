import firebase from '@/plugins/firebase'

export const state = () => ({
  //閲覧対象のユーザーの情報
  watchedProfile: {
    userName: '',
    iconURL: "https://github.com/share-hondana.png",
    intro: '',
    twitterURL: ''
  },
})

export const getters = {
  watchedProfile: state => state.watchedProfile
}

const db = firebase.firestore()

//プロフィール情報を取得
export const actions = {
  async watchedProfile({ commit }, uid) {
    try {
      const doc = await db.collection(`users/${uid}/profile`).doc(uid).get()
      commit('getUser', doc.data())
    } catch(errro) {
    }
  },
  destroyProfile({ commit }) {
    commit('destoryProfile')
  }
}

export const mutations = {
  getUser(state, watchedProfile) {
    state.watchedProfile = watchedProfile
  },
  // マイページ更新時
  editUser(state, { iconURL, myPage }) {
    state.watchedProfile.userName = myPage.userName,
    state.watchedProfile.iconURL = iconURL,
    state.watchedProfile.intro = myPage.intro,
    state.watchedProfile.twitterURL = myPage.twitterURL
  },
  logoutReset(state) {
    state.watchedProfile =  {
      userName: '',
      iconURL: "https://github.com/share-hondana.png",
      intro: '',
      twitterURL: ''
    }
  },
  destoryProfile(state) {
    state.watchedProfile =  {
      userName: '',
      iconURL: "https://github.com/share-hondana.png",
      intro: '',
      twitterURL: ''
    }
  }
}