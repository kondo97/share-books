import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'


const db = firebase.firestore()
const auth = firebase.auth()

export const state = () => ({
  // 本棚のデータを格納
  contents: [],
  // 本のデータを格納
  content: {
    title: "",
    author: "",
    descript: "",
    url: "",
  },
  booksCounts: 0,
  overBooks: false,
  //編集する本の番号を取得
  editIndex: '',
  //画面遷移時の保存用
  articleTitle:'',
  articleDescript:'',
  articleCate:''
})

export const getters = {
  contents: state => state.contents,
  content: state => state.content,
  overBooks: state => state.overBooks,
  articleTitle: state => state.articleTitle,
  articleDescript: state => state.articleDescript,
  articleCate: state => state.articleCate,
  editIndex: state => state.editIndex
}

export const actions = {
  // 本を追加
  pushBook({ state, commit }, create) {
    if (state.booksCounts <= 4) {
      commit('pushBook', create)
      console.log(state.booksCounts)
    } else {
      commit('overBooks')
    }
  },
  // 編集アイコンを押下
  editCreate({ commit }, { content, index }) {
    commit('editCreate', { content, index })
  },
  // 削除ボタン押下
  deleteBook({ commit }, index) {
    commit('deleteBook', index)
  },
  // 更新ボタンを押下
  updateCreate({ commit }, create) {
    commit('updateCreate', create)
  },
  //記事そのものを削除
  deletePosts({ commit }) {
    commit('deletePosts')
  },
  //公開ボタン押下
  async pushCreatePosts({ commit }, { articleTitle, articleDescript, articleCate, contents, userUid }) {
    try {
      const doc = await db.collection(`users/${userUid}/profile`).doc(userUid).get()
      const userName = doc.data().userName
      const iconURL = doc.data().iconURL
      await  db.collection('posts').add({
        authorUid: userUid,
        articleTitle: articleTitle,
        articleDescript: articleDescript,
        articleCate: articleCate,
        contents: contents,
        createdAt: dayjs().unix(),
        userName: userName,
        iconURL: iconURL,
        likeCount: 0
      })
      commit('logoutReset')
      this.$router.push('/')
    } catch(error) {
      alert('投稿に失敗しました。')
    }
  },
  //画面遷移時に記事作成途中のデータをstateに保存
  savePosts({ commit }, { articleTitle, articleDescript, articleCate}) {
    commit('savePosts', { articleTitle, articleDescript, articleCate})
  }
}

export const mutations = {
  //本を追加
  pushBook(state, create) {
    state.contents.push(create)
    state.booksCounts++
    console.log(state.booksCounts)
  },
  overBooks(state) {
    state.overBooks = true
  },
  //編集アイコンを押下
  editCreate(state, { content, index }) {
    state.content = content
    state.editIndex = index
  },
  //本の削除ボタンを押下
  deleteBook(state, index) {
    state.contents.splice(index, 1)
    state.booksCounts = -1
    state.overBooks = false
  },
  //編集データに置き換える。
  updateCreate(state, create) {
    state.contents[state.editIndex] = create
  },
  //記事そのものを削除
  deletePosts(state) {
    state.contents = [],
      state.content = {
        title: "",
        author: "",
        descript: "",
        url: "",
      },
      state.booksCounts = 0,
      state.overBooks = false,
      state.editIndex = '',
      state.articleTitle = '',
      state.articleDescript = '',
      state.articleCate = ''
  },
  //ログアウト時はstateのデータを空にする。
  logoutReset(state) {
    state.contents = [],
      state.content = {
        title: "",
        author: "",
        descript: "",
        url: "",
      },
      state.booksCounts = 0,
      state.overBooks = false,
      state.editIndex = ''
      state.articleTitle = '',
      state.articleDescript = '',
      state.articleCate = ''
  },
  //画面遷移時に記事作成途中のデータをstateに保存
  savePosts(state, { articleTitle, articleDescript, articleCate}) {
    state.articleTitle = articleTitle
    state.articleDescript = articleDescript
    state.articleCate = articleCate
  }
}