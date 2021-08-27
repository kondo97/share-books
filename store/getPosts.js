import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

export const state = () => ({
  items: [
    { header: 'マイ本棚' }
  ],
  noData: false,
  commentItems: [
    { header: 'マイ本棚' }
  ]
})

export const getters = {
  items: state => state.items,
  noData: state => state.noData,
  commentItems: state => state.commentItems
}

const db = firebase.firestore()
const auth = firebase.auth()

let lastVisible = ''
let lastComment = ''

export const actions = {
  // 最初にstateのデータを空にする。
  resetPosts({ commit }) {
    commit('resetItems')
    lastVisible = ''
    lastComment = ''
  },
  //firestoreから自分の投稿記事のデータを取得
  async getMyPosts({ dispatch, commit }, uid) {
    try {
      const posts = await db.collection('posts').where("authorUid", "==", uid).orderBy('createdAt', 'desc').startAfter(lastVisible).limit(2)
      posts.get().then(snapshot => {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]
        if (lastVisible == undefined) {
          commit('noData')
        }
        snapshot.forEach((doc) => {
          dispatch('pushMyPosts', { uid: uid, id: doc.id, item: doc.data() })
        }, lastVisible)
      })
    } catch (error) {
    }
  },
  //必要なデータを合致させる(マイ本棚)
  async pushMyPosts({ commit }, { uid, id, item }) {
    try {
      const ref = await db.collection(`users/${uid}/profile`).doc(uid).get()
      item.id = id
      item.userName = "@" + ref.data().userName
      item.iconURL = ref.data().iconURL
      item.createdAt = dayjs(item.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
      commit('pushMyPosts', item)
    } catch {
    }
  },
  //コメントした記事のIdを取得
  async getCommentId({ dispatch, commit }, uid) {
    try {
      const id = await db.collection(`users/${uid}/commented`).orderBy('createdAt', 'desc').startAfter(lastComment).limit(1)
      id.get().then(snapshot => {
        lastComment = snapshot.docs[snapshot.docs.length - 1]
        snapshot.forEach((doc) => {
          dispatch('getCommentPosts', doc.data().id)
        }, lastComment)
      })
    } catch (error) {
      
    }
  },
  // コメントした記事のデータを取得
  async getCommentPosts({ commit }, id) {
    try {
      const post = await db.collection('posts').doc(id).get()
      const userId = post.data().authorUid
      const profileData = await db.collection(`users/${userId}/profile`).doc(userId).get()
      const commentItem = {
        postId: id,
        userName: "@" + profileData.data().userName,
        iconURL: profileData.data().iconURL,
        createdAt: dayjs(post.data().createdAt * 1000).format('YYYY年MM月DD日') + "に投稿",
        articleTitle: post.data().articleTitle,
        articleCate: post.data().articleCate
      }
      console.log()
      commit('getCommentPosts', commentItem)
    } catch (error) {
    }
  },
  //ログアウト時はstateの中身をリセット
  logoutReset({ commit }) {
    commit('logoutReset')
  },
}

export const mutations = {
  // ログアウト時はstateの中身をリセット
  logoutReset(state) {
    state.items = [
      { header: 'マイ本棚' }
    ],
      state.noData = false
  },
  //読み込み時は、stateの値をリセット
  resetItems(state) {
    state.items = [
      { header: 'マイ本棚' }
    ],
      state.noData = false
    state.commentItems = [
      { header: 'マイ本棚' }
    ]
  },
  //itemsにデータを格納
  pushMyPosts(state, item) {
    state.items.push(item)
    state.items.push(
      { divider: true, inset: true },
    )
  },
  // マイ本棚の最後の記事が表示されたとき
  noData(state) {
    state.noData = true
  },
  //コメントした記事を取得
  getCommentPosts(state, commentItem) {
    state.commentItems.push(commentItem)
    state.items.push(
      { divider: true, inset: true },
    )
  }
}