import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

export const state = () => ({
  items: [
    { header: 'マイ本棚' }
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
  //firestoreから自分の投稿記事のデータを取得
  async getMyPosts({ dispatch, commit }, uid) {
    const posts = await db.collection('posts').where("authorUid", "==", uid).orderBy('createdAt', 'desc').startAfter(lastVisible).limit(2)
    await posts.get().then(snapshot => {
      lastVisible = snapshot.docs[snapshot.docs.length - 1]
      console.log("last", lastVisible);
      if(lastVisible == undefined) {
        commit('noData')
      }
      snapshot.forEach((doc) => {
        dispatch('pushMyPosts', { uid: uid, id: doc.id, item: doc.data() })
      }, lastVisible)
    })
  },
  //必要なデータを合致させる
  pushMyPosts({ commit }, { uid, id, item }) {
    db.collection(`users/${uid}/profile`).doc(uid).get()
      .then(ref => {
        item.id = id
        item.userName = "@" + ref.data().userName
        item.iconURL = ref.data().iconURL
        item.createAt = dayjs(ref.data().createAt).format('YYYY年MM月DD日') + "に投稿"
      }).then(() => [
        commit('pushMyPosts', item)
      ])
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
  }
}