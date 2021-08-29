import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

export const state = () => ({
  matchUser: false,
  postDetail: '',
  currentUser: '',
  editInitial: '',
})

export const getters = {
  matchUser: state => state.matchUser,
  postDetail: state => state.postDetail,
  currentUser: state => state.currentUser,
  editInitial: state => state.editInitial
}

const db = firebase.firestore()
const auth = firebase.auth()

export const actions = {
  //記事のデータをここで取得する
  async getPostDetail({ getters, dispatch, commit }, {isAuth, pageUid, currentUid}) {
    try {
      const doc = await db.collection('posts').doc(pageUid).get()
      commit('getPostDetail', { id: pageUid, item: doc.data() })
      //フォロー状態を確認する
      const followedUserId = doc.data().authorUid
      dispatch('follow/checkFollowPost', {currentUid, followedUserId}, { root: true })
      //トータルいいね数を取得する。
      const authorId = doc.data().authorUid
      dispatch('like/totalLike', authorId, { root: true }) 
      if (isAuth) {
        // const currentUser = auth.currentUser.uid
        dispatch('getCurrentUser', currentUid)
        if (doc.data().authorUid == currentUid) {
          commit('matchUser')
        } else {
          commit('notMatchUser')
        }
      }
    } catch(error) {
    }
  },
  //閲覧ユーザーの情報を取得
  async getCurrentUser({ commit }, currentUser) {
    try {
    const ref = await db.collection(`users/${currentUser}/profile`).doc(currentUser).get()
        commit('currentUser', ref.data())
    } catch(error) {
        commit('notLoginUser')
      }
  },
  //削除処理
  async deletePost({ commit }, pageUid) {
    try {
      await db.collection('posts').doc(pageUid).delete()
      commit('destoryData')
        this.$router.push('/')
    } catch(error) {
    }
  },
  //編集処理
  //初期値を取得
  getEditInitial({ commit }, ref) {
    commit('getEditInitial', ref.data())
  },
  //編集内容のアップデート
  async updatePost({ commit }, payload) {
    try {
      await  db.collection('posts').doc(payload.postId).update({
        articleTitle: payload.articleTitle,
        articleDescript: payload.articleDescript,
        articleCate: payload.articleCate,
        contents: payload.contents
      })
      this.$router.push('/')
    } catch (error) {
    }
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
  //いいね押下時にプラスする
  additionLike({ commit }) {
    commit('additionLike')
  },
  //いいね削除時にマイナスする
  subtractLike({ commit }) {
    commit('subtractLike')
  },
  //stateの中身を消去
  destoryData({ commit }) {
    commit('destoryData')
  },
  editDestroy({ commit }) {
    commit('editDestroy')
  },
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
  getPostDetail(state, {id, item}) {
    item.id = id
    item.userName = "@" + item.userName
    item.createdAt =  dayjs(item.createdAt * 1000).format('YYYY年MM月DD日') + "に投稿"
    state.postDetail = item
  },
  currentUser(state, ref) {
    state.currentUser = ref
  },
  // ページ遷移時にstateのデータを破棄する
  destoryData(state) {
    state.matchUser = false,
      state.postDetail = '',
      state.currentUser = ''
  },
  editDestroy(state) {
    state.editInitial = ''
  },
  //編集画面の初期値
  getEditInitial(state, ref) {
    state.editInitial = ref
  },
  //いいね押下時にライクをプラスする
  additionLike(state) {
    state.postDetail.likeCount += 1
  },
  //いいね削除時にライクをマイナスする
  subtractLike(state) {
    state.postDetail.likeCount -= 1
  }
}