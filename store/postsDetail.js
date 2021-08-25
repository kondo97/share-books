import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

export const state = () => ({
  matchUser: false,
  postDetail: '',
  isAuth: false,
  currentUser: '',
  editInitial: '',
})

export const getters = {
  matchUser: state => state.matchUser,
  postDetail: state => state.postDetail,
  isAuth: state => state.isAuth,
  currentUser: state => state.currentUser,
  editInitial: state => state.editInitial
}

const db = firebase.firestore()
const auth = firebase.auth()

export const actions = {
  //記事のデータをここで取得する
  getPostDetail({ getters, dispatch, commit }, pageUid) {
    db.collection('posts').doc(pageUid).get()
      .then((doc) => {
        dispatch('pushPostDetail', { uid: doc.data().authorUid, item: doc.data() })
        if (getters.isAuth) {
          const currentUser = auth.currentUser.uid
          dispatch('getCurrentUser', currentUser)

          if (doc.data().authorUid == currentUser) {
            commit('matchUser')
          } else {
            commit('notMatchUser')
            console.log('false')
          }
        }
      })
  },
  //必要なデータを合致させる
  pushPostDetail({ commit }, { uid, item }) {
    db.collection(`users/${uid}/profile`).doc(uid).get()
      .then(ref => {
        item.id = uid
        item.userName = ref.data().userName
        item.iconURL = ref.data().iconURL
        item.intro = ref.data().intro
        item.twitterURL = ref.data().twitterURL
        item.createAt = dayjs(ref.data().createAt).format('YYYY年MM月DD日') + "に投稿"
      }).then(() => {
        commit('pushPostDetail', item)
      })
  },
  //閲覧ユーザーの情報を取得
  getCurrentUser({ commit }, currentUser) {
    db.collection(`users/${currentUser}/profile`).doc(currentUser).get()
      .then(ref => {
        commit('currentUser', ref.data())
      }).catch(error => {
        commit('notLoginUser')
      })
  },
  //削除処理
  deletePost({ commit }, pageUid) {
    db.collection('posts').doc(pageUid).delete()
      .then(() => {
        commit('destoryData')
        this.$router.push('/')
      })
  },
  //編集処理
  //初期値を取得
  getEditInitial({ commit }, ref) {
    // db.collection('posts').doc(postId).get()
    // .then(ref => {
    //   console.log('getInitial')
    //   commit('getEditInitial', ref.data())
    // })

    commit('getEditInitial', ref.data())
  },
  //編集内容のアップデート
  updatePost({ commit }, payload) {
    db.collection('posts').doc(payload.postId).update({
      articleTitle: payload.articleTitle,
      articleDescript: payload.articleDescript,
      articleCate: payload.articleCate,
      contents: payload.contents
    }).then(() => {
      this.$router.push('/')
    })
  },
  async updateEditInitial({ getters, commit }, { postId, create, editIndex }) {
    try {
      const post = await db.collection('posts').doc(postId).get()
      let preparedContents = post.data().contents
      preparedContents[editIndex] = create
      db.collection('posts').doc(postId).update({
        contents: preparedContents
      })
      this.$router.push(`/articles/articlesEdit/${postId}`)
    } catch (error) {
      alert('更新できません。')
    }

  },
  //stateの中身を消去
  destoryData({ commit }) {
    commit('destoryData')
  },
  editDestroy({ commit }) {
    commit('editDestroy')
  },
  // ログイン状態にする
  authChecked({ commit }) {
    commit('authChecked')
  }
}

export const mutations = {
  //記事の作者と閲覧ユーザーが一致
  matchUser(state) {
    state.matchUser = true
  },
  //記事の作者と閲覧ユーザーが不一致
  notMatchUser(state) {
    state.matchUser = false
  },
  //記事の必要情報をstateに格納
  pushPostDetail(state, item) {
    state.postDetail = item
  },
  //閲覧ユーザー情報をstateに格納
  notLoginUser(state) {
    state.loginUser = false
  },
  currentUser(state, ref) {
    state.currentUser = ref
    state.loginUser = true
  },
  // ページ遷移時にstateのデータを破棄する
  destoryData(state) {
    state.matchUser = false,
      state.postDetail = '',
      state.loginUser = false,
      state.currentUser = ''
  },
  editDestroy(state) {
    state.editInitial = ''
  },
  //編集画面の初期値
  getEditInitial(state, ref) {
    state.editInitial = ref
  },
  // ログイン時
  authChecked(state) {
    state.isAuth = true
  },
  // ログアウト時
  logoutReset(state) {
    state.isAuth = false
  },

}