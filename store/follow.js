import firebase from '@/plugins/firebase'

export const state = () => ({
  isFollow: false,
  isFollowPost: false,
  followUsers: [],
  noFollow: false
})

export const getters = {
  isFollow: state => state.isFollow,
  isFollowPost: state => state.isFollowPost,
  followUsers: state => state.followUsers,
  noFollow: state => state.noFollow
}

const db = firebase.firestore()
const auth = firebase.auth()

let followVisible = ''

export const actions = {
  resetFollow({ commit }) {
    commit('resetFollow') 
    followVisible = ''
  },
  //フォロー状態を確認する(マイページ)
  async checkFollow({ commit }, {pageUid, seeUserUid}) {
    try {
      const ref = await db.collection(`users/${seeUserUid}/follow`).doc(pageUid).get()
      if(ref.exists) {
        commit('follow')
      } else {
        commit('unFollow')
      }
    } catch(error) {

    }
  },
  //フォロー状態を確認する(投稿ページ)
  async checkFollowPost({ commit }, {currentUid, followedUserId}) 
  {
    try {
      const ref = await db.collection(`users/${currentUid}/follow`).doc(followedUserId).get()
      if(ref.exists) {
        commit('followPost')
      } else {
        commit('unFollowPost')
      }
    } catch(error) {

    }
  },
  //フォローする(マイページ)
  async follow({ commit }, {currentUserId, followedUserId}) {
    try {
      await db.collection(`users/${currentUserId}/follow`).doc(followedUserId).set({
        id: followedUserId
      })
      await db.collection(`users/${followedUserId}/followed`).doc(currentUserId).set({
        id: currentUserId
      })
      commit('follow')
    } catch(error) {
      alert('フォローに失敗しました。')
    }
  },
  //フォローする（投稿ページ）
  async followPost({ commit }, {currentUserId, followedUserId}) {
    try {
      await db.collection(`users/${currentUserId}/follow`).doc(followedUserId).set({
        id: followedUserId
      })
      await db.collection(`users/${followedUserId}/followed`).doc(currentUserId).set({
        id: currentUserId
      })
      
      commit('followPost')
    } catch(error) {
      alert('フォローに失敗しました。')
    }
  },
  //フォロー解除する(マイページ)
  async unFollow({ commit }, {currentUserId, followedUserId}) {
    try {
      await db.collection(`users/${currentUserId}/follow`).doc(followedUserId).delete()
      await db.collection(`users/${followedUserId}/followed`).doc(currentUserId).delete()
      commit('unFollow')
    } catch(error) {
      alert('フォロー解除に失敗しました。')
    }
  },
  //フォロー解除する（投稿ページ）
  async unFollowPost({ commit }, {currentUserId, followedUserId}) {
    try {
      await db.collection(`users/${currentUserId}/follow`).doc(followedUserId).delete()
      await db.collection(`users/${followedUserId}/followed`).doc(currentUserId).delete()
      commit('unFollowPost')
    } catch(error) {
      alert('フォロー解除に失敗しました。')
    }
  },
  //フォロー中のユーザーを取得
  async getFollowUser({ dispatch, commit }, uid) {
    try {
      const follows = await db.collection(`users/${uid}/follow`).orderBy('id').startAfter(followVisible).limit(2)
      console.log(follows)
      await follows.get().then(snapshot => {
      console.log(followVisible)
      console.log(snapshot)
      followVisible = snapshot.docs[snapshot.docs.length - 1]
      console.log(followVisible)
       if (followVisible == undefined) {
          commit('noFollow')
        }
        snapshot.forEach((doc) => {
          console.log(doc.data())
          dispatch('matchFollowUser', doc.data())
        }, followVisible)
      })
    } catch(error) {
        console.log('miss')
    }
  },
  async matchFollowUser({ commit }, doc) {
    try {
      const profileRef = await db.collection(`users/${doc.id}/profile`).doc(doc.id).get()
      const followUser = {
        userName: profileRef.data().userName,
        iconURL: profileRef.data().iconURL,
        id: doc.id
      }
      commit('matchFollowUser', followUser)
    } catch(error) {
    }
  },
  destroyFollow({ commit }) {
    commit('destroyFollow')
  }
}
export const mutations = {
  resetFollow(state) {
    state.isFollow = false,
    state.isFollowPost = false
    state.followUsers = [],
    state.noFollow = false
  },
  //フォローする
   follow(state) {
     state.isFollow = true
   },
  //フォロー解除する
  unFollow(state) {
    state.isFollow = false
  },
  //フォローする
  followPost(state) {
    state.isFollowPost = true
  },
  //フォロー解除する
  unFollowPost(state) {
    state.isFollowPost = false
  },
  //フォロー中ユーザーを取得
  matchFollowUser(state, followUser) {
    state.followUsers.push(followUser)
  },
  destroyFollow(state) {
    state.isFollow = false,
    state.isFollowPost = false
    state.followUsers = []
  },
  //マイページ。フォロー中ユーザーの最後が表示された時
  noFollow(state) {
    state.noFollow = true
  }
}