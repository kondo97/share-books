import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

export const state = () => ({
  items: [
    { header: 'マイ本棚' }
  ],
  noData: false,
  commentItems: [
    { header: 'コメント記事' }
  ],
  noDataComment: false,
})

export const getters = {
  items: state => state.items,
  noData: state => state.noData,
  commentItems: state => state.commentItems,
  noDataComment: state => state.noDataComment
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
          commit('getMyPosts', { id: doc.id, item: doc.data() })
        }, lastVisible)
      })
    } catch (error) {
    }
  },
  //コメントした記事のIdを取得
  async getCommentId({ commit }, uid) {
    try {
      const id = await db.collection(`users/${uid}/commented`).orderBy('createdAt', 'desc').startAfter(lastComment).limit(1)
      id.get().then(snapshot => {
        lastComment = snapshot.docs[snapshot.docs.length - 1]
        if (lastComment == undefined) {
          commit('noDataComment')
        }
        snapshot.forEach((doc) => {
          db.collection('posts').doc(doc.data().id).get()
            .then((doc) => {
              if (doc.exists) {
                commit('getCommentPosts', { id: doc.id, commentItem: doc.data() })
              } else {
                return
              }
            })
        }, lastComment)
      })
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
      state.noData = false,
      state.commentItems = [
        { header: 'コメント記事' }
      ],
      state.noDataComment = false
  },
  //読み込み時は、stateの値をリセット
  resetItems(state) {
    state.items = [
      { header: 'マイ本棚' }
    ],
      state.noData = false
    state.commentItems = [
      { header: 'コメント記事' }
    ],
      state.noDataComment = false
  },
  //itemsにデータを格納
  getMyPosts(state, { id, item }) {
    item.id = id
    item.userName = "@" + item.userName
    item.createdAt = dayjs(item.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
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
  getCommentPosts(state, { id, commentItem }) {
    commentItem.id = id
    commentItem.userName = "@" + commentItem.userName
    commentItem.createdAt = dayjs(commentItem.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
    state.commentItems.push(commentItem)
    state.commentItems.push(
      { divider: true, inset: true },
    )
  },
  noDataComment(state) {
    state.noDataComment = true
  }
}