import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'
import algoliasearch from "algoliasearch";
const client = algoliasearch("2EX58AP7P2", "1c4aba9a94b52d8dbb3d11422ed6c97f");
const index = client.initIndex("share-books");

export const state = () => ({
  items: [
    { header: '本棚一覧' }
  ],
  noData: false,
  //「もっと表示する」をカテゴリー検索用に切り替え
  cateSearch: false,
  noDataCate: false,
  //選択中のカテゴリーの名前が入る
  cateName: '',
  keySearch: false,
  keyVisible: 0,
  noMoreKey: false
})

export const getters = {
  items: state => state.items,
  noData: state => state.noData,
  cateSearch: state => state.cateSearch,
  noDataCate: state => state.noDataCate,
  cateName: state => state.cateName,
  keySearch: state => state.keySearch,
  keyVisible: state => state.keyVisible,
  noMoreKey: state => state.noMoreKey
}

const db = firebase.firestore()
const auth = firebase.auth()

let lastVisible = ''
let cateVisible = ''

export const actions = {
  // 最初にstateのデータを空にする。
  resetPosts({ commit }) {
    commit('resetItems')
    lastVisible = ''
    cateVisible = ''
  },
  //firestoreから全投稿記事のデータを取得
  async getPosts({ dispatch, commit }) {
    try {
      const posts = await db.collection('posts').orderBy('createdAt', 'desc').startAfter(lastVisible).limit(2)
      posts.get().then(snapshot => {
        lastVisible = snapshot.docs[snapshot.docs.length - 1]
        if (lastVisible == undefined) {
          commit('noData')
        }
        snapshot.forEach((doc) => {
          commit('getPosts', { id: doc.id, item: doc.data() })
        }, lastVisible)
      })
    } catch (error) {
      alert('データの取得に失敗しています。')
    }
  },
  //カテゴリー検索
  async catePosts({ commit }, name) {
    try {
      const catePosts = await db.collection('posts').where('articleCate', '==', name).orderBy('createdAt', 'desc').startAfter(cateVisible).limit(2)
      catePosts.get().then(snapshot => {
        cateVisible = snapshot.docs[snapshot.docs.length - 1]
        if (cateVisible == undefined) {
          commit('noDataCate')
        }
        snapshot.forEach((doc) => {
          commit('getPosts', { id: doc.id, item: doc.data() })
        }, cateVisible)
      })
      commit('cateSearch', name)
    } catch (error) {
      console.log('error')
    }
  },
  //キーワード検索イベント
  keyWordSearch({ getters, commit }, searchWords) {
    const keyVisible = getters.keyVisible
    console.log(keyVisible)
    index.search(searchWords, {
      page: keyVisible
    }).then(({ hits }) => {
      if(hits.length != 0) {
        commit('keyWordSearch', hits)
      } else {
        commit('noKeySearch')
      } 
    })
  }
}

export const mutations = {
  //読み込み時は、stateの値をリセット
  resetItems(state) {
    state.items = [
      { header: '本棚一覧' }
    ],
      state.noData = false
    state.noDataCate = false
    state.cateSearch = false
    state.cateName = ''
    state.keySearch = false
    state.keyVisible = 0
    state.noMoreKey = false
  },
  //itemsにデータを格納
  getPosts(state, { id, item }) {
    item.id = id
    item.userName = "@" + item.userName
    item.createdAt = dayjs(item.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
    state.items.push(item)
    state.items.push(
      { divider: true, inset: true },
    )
  },
  // 本棚の最後の記事が表示されたとき
  noData(state) {
    state.noData = true
  },
  //「もっと表示する」をカテゴリー検索用に切り替え
  cateSearch(state, name) {
    state.cateSearch = true
    state.cateName = name
  },
  //カテゴリー検索時の最後の記事が表示されたとき
  noDataCate(state) {
    state.noDataCate = true
  },
  //キーワード検索
  keyWordSearch(state, hits) {
    state.keySearch = true
    state.keyVisible += 1
    hits.forEach((value) => {
      let item = {
        id: value.objectID,
        articleTitle: value.articleTitle,
        userName: "@" + value.userName,
        iconURL: value.iconURL,
        createdAt: dayjs(value.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿",
        authorUid: value.authorUid,
        articleCate: value.articleCate
      }
      state.items.push(item)
      state.items.push(
        { divider: true, inset: true },
      )
    })
  },
  //キーワード検索で全て表示された時
  noKeySearch(state) {
    state.noMoreKey = true
  }
}