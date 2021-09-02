import firebase from '@/plugins/firebase'

export const state = () => ({
  isFollow: false,
  isFollowPost: false,
  followUsers: [],
  noFollow: false,
  followedUsers: [],
  noFollowed: false,
})

export const getters = {
  isFollow: state => state.isFollow,
  isFollowPost: state => state.isFollowPost,
  followUsers: state => state.followUsers,
  noFollow: state => state.noFollow,
  followedUsers: state => state.followedUsers,
  noFollowed: state => state.noFollowed,
}

const db = firebase.firestore()
const auth = firebase.auth()

let followVisible = ''
let followerVisible = ''

export const actions = {
  resetFollow({ commit }) {
    commit('resetFollow') 
    followVisible = ''
    followerVisible = ''
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
    console.log(currentUserId)
    console.log(followedUserId)
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
      await follows.get().then(snapshot => {
      followVisible = snapshot.docs[snapshot.docs.length - 1]
       if (followVisible == undefined) {
          commit('noFollow')
        }
        snapshot.forEach((doc) => {
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
  //フォロワーを取得
  async getFollowedUser({ dispatch, commit }, uid) {
    try {
    const follower = await db.collection(`users/${uid}/followed`).orderBy('id').startAfter(followerVisible).limit(2)
    await follower.get().then(snapshot => {
      followerVisible= snapshot.docs[snapshot.docs.length - 1]
       if (followerVisible == undefined) {
          commit('noFollowed')
       }
        snapshot.forEach((doc) => {
          dispatch('matchFollowedUser', doc.data())
        }, followerVisible)
      })
    } catch(error) {
        console.log('miss')
    }
  },
  async matchFollowedUser({ commit }, doc) {
    try {
      const profileRef = await db.collection(`users/${doc.id}/profile`).doc(doc.id).get()
      const followedUser = {
        userName: profileRef.data().userName,
        iconURL: profileRef.data().iconURL,
        id: doc.id
      }
      commit('matchFollowedUser', followedUser)
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
    state.noFollow = false,
    state.followedUsers = [],
    state.noFollowed = false
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
  //フォロワーを取得
  matchFollowedUser(state, followedUser) {
    state.followedUsers.push(followedUser)
  }, 
  destroyFollow(state) {
    state.isFollow = false
    state.isFollowPost = false
    state.followUsers = []
    state.noFollow = false
    state.followedUsers = []
    state.noFollowed = false
  },
  //マイページ。フォロー中ユーザーの最後が表示された時
  noFollow(state) {
    state.noFollow = true
  },
  //フォロワーがすべて表示された時
  noFollowed(state) {
    state.noFollowed = true
  }
}