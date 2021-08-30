import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'
import { subtract } from 'lodash'

export const state = () => ({
  isLike: false,
  totalLike: 0,
  likes: [
    { header: 'いいねした記事' }
  ],
  noDataLike: false,
  likedUsers:[],
  noDataLikeUser: false
})

export const getters = {
  isLike: state => state.isLike,
  totalLike: state => state.totalLike,
  likes: state => state.likes,
  noDataLike: state => state.noDataLike,
  likedUsers: state => state.likedUsers,
  noDataLikeUser: state => state.noDataLikeUser
}

const db = firebase.firestore()
const auth = firebase.auth()

let likeVisible = ''
let likeUserVisible = ''

export const actions = {
  resetLike({commit}) {
    commit('resetLike')
  },
  resetLikeTotal({ commit }) {
    commit('resetLikeTotal')
  },
  resetLikePost({ commit }) {
    likeVisible = ''
    commit('resetLikePost')
  },
  resetLikedUsers({ commit }) {
    likeUserVisible = ''
    commit('resetLikedUsers')
  },
  //閲覧ユーザーがいいねを押しているか確認
  async checkLike({ commit }, {pageUid, currentUserId}) {
    try{
    const like = await db.collection(`users/${currentUserId}/likedPosts`).doc(pageUid)
    like.get().then((doc) => {
      if(doc.exists) {
        commit('onIsLike')
      } else {
        commit('notIsLike')
      }
    })
    } catch(error) {

    }
  },
  //いいねボタン押下
  async addLike({ dispatch, commit }, {pageUid, currentUserId}) {
    try {
      await db.collection(`posts/${pageUid}/likedUsers`).doc(currentUserId).set({
        id: currentUserId,
        createdAt: dayjs().unix()
      })
      await db.collection(`users/${currentUserId}/likedPosts`).doc(pageUid).set({
        id: pageUid,
        createdAt: dayjs().unix()
      })
      await db.collection(`posts`).doc(pageUid).update({
        likeCount: firebase.firestore.FieldValue.increment(1)
      })
      commit('onIsLike')
      dispatch('postsDetail/additionLike', null, { root: true })
      commit('additionTotalLike')
    } catch(error) {

    }
  },
  //いいね削除
  async deleteLike({ dispatch, commit }, {pageUid, currentUserId}) {
    try {
      await db.collection(`posts/${pageUid}/likedUsers`).doc(currentUserId).delete()
      await db.collection(`users/${currentUserId}/likedPosts`).doc(pageUid).delete()
      await db.collection(`posts`).doc(pageUid).update({
        likeCount: firebase.firestore.FieldValue.increment(-1)
      })
      commit('notIsLike')
      dispatch('postsDetail/subtractLike', null, { root: true })
      commit("subtractTotalLike")
    } catch(error) {

    }
  },
  //トータルいいね数の取得
  async totalLike({ commit }, profileUid) {
    let totalLikeCounts = 0
    try {
     const posts =  await db.collection('posts').where('authorUid', '==', profileUid).get()
     posts.forEach(async doc => {
       totalLikeCounts += doc.data().likeCount
     })
     commit('totalLike', totalLikeCounts)
    } catch(error) {
      console.log('error')
    }
  },
  //いいねした記事を取得
  async getLikePosts({ commit }, uid) {
    try {
      console.log(uid)
      const postId = await db.collection(`users/${uid}/likedPosts`).orderBy('createdAt', 'desc').startAfter(likeVisible).limit(1)
      postId.get().then(snapshot => {
        likeVisible = snapshot.docs[snapshot.docs.length - 1]
        if (likeVisible == undefined) {
          commit('noDataLike')
        }
        snapshot.forEach((doc) => {
          db.collection('posts').doc(doc.data().id).get()
            .then((doc) => {
              if (doc.exists) {
                commit('getMyPostsLike', { id: doc.id, item: doc.data() })
              } else {
                return
              }
            })
        }, likeVisible)
      })
    } catch(error) {
      console.log('error')
    }
  },
  //いいねしたユーザーの一覧を表示
  async getLikeUsers({ dispatch, commit }, postId) {
    try {
     const userId = await db.collection(`posts/${postId}/likedUsers`).orderBy('createdAt', 'desc').startAfter(likeUserVisible).limit(1)
     userId.get().then(snapshot => {
      likeUserVisible = snapshot.docs[snapshot.docs.length - 1]
      if (likeUserVisible == undefined) {
        commit('noDataLikeUser')
      }
      snapshot.forEach((doc) => {
        if (doc.exists) {
        const likedUserId = doc.data().id
        dispatch('matchLikedUsers', likedUserId)
        }
      }, likeUserVisible)
     })
    } catch(error) {

    }
  },
  //いいねしたユーザーのプロフィール情報を取得
  async matchLikedUsers({ commit }, likedUserId) {
    console.log(likedUserId)
    try {
     const likedUser = db.collection(`users/${likedUserId}/profile`).doc(likedUserId)
     likedUser.get().then((doc) => {
       console.log(doc.data())
       const likedUserProfile = {
         id: doc.id,
         userName: doc.data().userName,
         iconURL: doc.data().iconURL
       }
       commit('matchLikedUsers', likedUserProfile)
     })
    } catch(error) {

    }
  } 
}

export const mutations = {
  resetLike(state) {
    state.isLike = false
  },
  onIsLike(state) {
    state.isLike = true
  },
  notIsLike(state) {
    state.isLike = false
  },
  totalLike(state, totalLikeCounts) {
    state.totalLike = totalLikeCounts
  },
  additionTotalLike(state) {
    state.totalLike += 1
  },
  subtractTotalLike(state) {
   state.totalLike -= 1
  },
  resetLikeTotal(state) {
    state.totalLike = 0
  },
  resetLikePost(state) {
    state.likes = [
      { header: 'いいねした記事' }
    ]
  },
  getMyPostsLike(state, { id, item }) {
    console.log('tstts')
    item.id = id
    item.userName = "@" + item.userName
    item.createdAt = dayjs(item.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
    state.likes.push(item)
    state.likes.push(
      { divider: true, inset: true },
    )
  },
  noDataLike(state) {
    state.noDataLike = true
  },
  matchLikedUsers(state, likedUserProfile) {
    state.likedUsers.push(likedUserProfile)
  },
  resetLikedUsers(state) {
    state.likedUsers = []
  },
  noDataLikeUser(state) {
    state.noDataLikeUser = true
  }
}