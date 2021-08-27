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
          commit('getPosts', { id: doc.id, item: doc.data() })
          console.log(doc.data())
        }, lastVisible)
      })
    } catch (error) {
      alert('データの取得に失敗しています。')
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
  getPosts(state, {id, item}) {
    item.id = id
    item.userName = "@" + item.userName
    item.createdAt =  dayjs(item.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
    state.items.push(item)
    state.items.push(
      { divider: true, inset: true },
    )
  },
  // 本棚の最後の記事が表示されたとき
  noData(state) {
    state.noData = true
  }
}