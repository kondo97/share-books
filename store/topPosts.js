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
  },
  //firestoreから全投稿記事のデータを取得
  async getPosts({ dispatch, commit }) {
    try{
      const posts = await db.collection('posts').orderBy('createdAt', 'desc').startAfter(lastVisible).limit(2)
      posts.get().then(snapshot => {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]
        if(lastVisible == undefined) {
          commit('noData')
        }
        snapshot.forEach((doc) => {
          dispatch('pushPosts', { id: doc.id, item: doc.data() })
        }, lastVisible)
      })
    } catch (error) {
      alert('データの取得に失敗しています。')
    }
  },
  //必要なデータを合致させる
  async pushPosts({ commit }, { id, item }) {
    const uid = item.authorUid
    try {
       const ref = await db.collection(`users/${uid}/profile`).doc(uid).get()
       item.id = id
       item.userName = "@" + ref.data().userName
       item.iconURL = ref.data().iconURL
       item.createdAt = dayjs(item.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
       commit('pushPosts', item)
    } catch (erro) {
      alert('データの取得に失敗しました。')
    }
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
    state.noData = true
  }
}