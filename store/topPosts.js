import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

export const state = () => ({
  items: [
    { header: '本棚一覧' }
  ],
  noData: false
})

export const getters = {
  items: state => state.items,
  noData: state => state.noData
}

const db = firebase.firestore()
const auth = firebase.auth()

let lastVisible = ''

export const actions = {
  // 最初にstateのデータを空にする。
  resetPosts({ commit }) {
    commit('resetItems')
    lastVisible = ''
    console.log('test')
  },
  //firestoreから自分の投稿記事のデータを取得
  async getPosts({ dispatch, commit }) {
    const posts = await db.collection('posts').orderBy('createdAt', 'desc').startAfter(lastVisible).limit(5)
    await posts.get().then(snapshot => {
      lastVisible = snapshot.docs[snapshot.docs.length - 1]
      console.log("last", lastVisible);
      if(lastVisible == undefined) {
        commit('noData')
      }
      snapshot.forEach((doc) => {
        dispatch('pushPosts', { id: doc.id, item: doc.data() })
      }, lastVisible)
    })
    console.log('test2')
  },
  //必要なデータを合致させる
  pushPosts({ commit }, { id, item }) {
    const uid = item.authorUid
    db.collection(`users/${uid}/profile`).doc(uid).get()
      .then(ref => {
        item.id = id
        item.userName = "@" + ref.data().userName
        item.iconURL = ref.data().iconURL
        item.createAt = dayjs(ref.data().createAt).format('YYYY年MM月DD日') + "に投稿"
      }).then(() => [
        commit('pushPosts', item)
      ])
  },
}

export const mutations = {
  //読み込み時は、stateの値をリセット
  resetItems(state) {
    state.items = [
      { header: '本棚一覧' }
    ],
    state.noData = false
  },
  //itemsにデータを格納
  pushPosts(state, item) {
    state.items.push(item)
    state.items.push(
      { divider: true, inset: true },
    )
  },
  // マイ本棚の最後の記事が表示されたとき
  noData(state) {
    console.log('worl')
    state.noData = true
  }
}