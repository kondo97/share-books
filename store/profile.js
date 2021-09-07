import firebase from '@/plugins/firebase'

export const state = () => ({
  //userNameとiconURLは、プロフィールのデータとずれる場合あり。
  user: {
    uid: '',
    userName: '',
    iconURL: '',
    emailVerified: ''
  },
  //現在ログインしているユーザーの情報
  profile: {
    userName: '',
    iconURL: "https://github.com/share-hondana.png",
    intro : '',
    twitterUR: ''
  }
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
  async pushUser({ getters, dispatch }, isNewUser) {
    const userID = getters.user.uid
    try {
      if (isNewUser == true) {
        await db.collection(`users/${userID}/profile`).doc(userID).set({
          userName: getters.user.userName,
          iconURL: getters.user.iconURL,
        })
        dispatch('getUser')
      }else {
        dispatch('getUser')
      }
    } catch (error) {
    }
  },
  // profileコレクションからデータを取得
  async getUser({ getters, commit }) {
    const userID = getters.user.uid
    try {
      const doc = await db.collection(`users/${userID}/profile`).doc(userID).get()
      commit('getUser', doc.data())
    } catch(error) { 
    }
  },
  //マイページを編集
  async editMyPage({ getters, dispatch, commit }, { iconURL, myPage }) {
    const userID = getters.user.uid
    if(myPage.twitterURL == undefined) {
      myPage.twitterURL = ''
    }
    try {
      const ref = await db.collection(`users/${userID}/profile`).doc(userID)
      ref.update({
        userName: myPage.userName,
        iconURL: iconURL,
        intro: myPage.intro,
        twitterURL: myPage.twitterURL
      })
      const batch = await db.batch();
      const refPosts = await db.collection('posts').where("authorUid", "==", userID)
      refPosts.get().then(snapshot => {
        snapshot.forEach((doc) => {
          batch.update(doc.ref, {
            userName : myPage.userName,
            iconURL: iconURL,
            intro: myPage.intro,
            twitterURL: myPage.twitterURL
          })
        })
        batch.commit()
      })

        commit('editMyPage', { iconURL, myPage })
        commit('myPageProfile/editUser', { iconURL, myPage }, { root: true })
    } catch(error) {
      alert('更新に失敗しました。')
    }
  },
  //ログアウト時にstateの値をリセット
  logoutReset({ commit }) {
    commit('logoutReset')
  },
}

export const mutations = {
  //authのユーザー情報を取得
  setUser(state, user) {
    state.user.uid = user.uid
    state.user.userName = user.displayName,
    state.user.iconURL = user.photoURL,
    state.user.emailVerified = user.emailVerified 
  },
  //profileコレクションのユーザー情報を取得
  getUser(state, profile) {
    state.profile.userName = profile.userName,
    state.profile.iconURL = profile.iconURL
  },
  //マイページを編集
  editMyPage(state, { iconURL, myPage }) {
    state.profile.userName = myPage.userName,
    state.profile.iconURL = iconURL,
    state.profile.intro = myPage.intro,
    state.profile.twitterURL = myPage.twitterURL
  },
  logoutReset(state) {
    state.user = {
      uid: '',
      userName: '',
      iconURL: '',
      emailVerified: ''
    },
      state.profile = {
        userName: '',
        iconURL: "https://github.com/share-hondana.png",
      }
  }
}