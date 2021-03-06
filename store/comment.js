import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'
import _ from "lodash"

export const state = () => ({
  //コメントの情報を格納
  comments: []
})

export const getters = {
  index: state => state.index,
  EditpageUid: state => state.EditpageUid,
  EditId: state => state.EditId,
  EditIndex: state => state.EditIndex,
  Orderdcomments: state => {
    return _.sortBy(state.comments, 'createdAt')
  },
  comments: state => state.comments
}

const db = firebase.firestore()
const auth = firebase.auth()

export const actions = {
  // 最初にstateのcommentsを空にする
  resetComments({ commit }) {
    commit('resetComments')
  },
  //コメントをcommentsコレクションに格納
  async pushComment({ dispatch, commit }, { pageUid, userUid, comment }) {
    try {
      await db.collection(`posts/${pageUid}/comments`).add({
        comment: comment,
        user: userUid,
        createdAt: dayjs().unix()
      })
      await db.collection(`users/${userUid}/commented`).doc(pageUid).set({
        id: pageUid,
        createdAt: dayjs().unix()
      })
      const actionUser = await db.collection(`users/${userUid}/profile`).doc(userUid).get()
      const refActionUser = actionUser.data()
      const author = await db.collection('posts').doc(pageUid)
      author.get().then((doc) => {
        const authorUid = doc.data().authorUid
        db.collection(`users/${authorUid}/news`).doc(userUid + 'comment').set({
          select: 'コメント',
          createdAt: dayjs().unix(),
          iconURL: refActionUser.iconURL,
          userName: refActionUser.userName,
          id: pageUid,
          read: false
        })
      })
      dispatch('resetComments')
      dispatch('getCommnets', { nowUser: userUid, pageUid: pageUid })
    } catch (error) {
      alert('コメントの投稿に失敗しました。')
    }
  },
  //記事へのコメントを取得
  async getCommnets({ dispatch, commit }, {nowUser, pageUid}) {
    try {
      const comments = await db.collection(`posts/${pageUid}/comments`)
      comments.get().then(snapshot => {
        snapshot.forEach((doc) => {
          dispatch('matchComments', {id: doc.id, nowUser: nowUser, comment: doc.data() })
        })
      })     
    } catch(error) {
    
    }
  },
  // コメントに必要情報を合致させる
  async matchComments({ commit }, {id ,nowUser, comment}) {
    const commentAuthor = comment.user
    try {
      const user = await db.collection(`users/${commentAuthor}/profile`).doc(commentAuthor).get()
      comment.id = id
      comment.userName = user.data().userName
      comment.iconURL = user.data().iconURL
      // comment.createdAt = dayjs(comment.createdAt * 1000).format('YYYY年MM月DD日') 
      if(nowUser == commentAuthor) {
        comment.displayIcon = true
      } else {
        comment.displayIcon = false
      }
      commit('matchComments', comment)
    } catch(error) {
      alert('コメントの取得に失敗しました。')
    }
  },
  //コメントを削除
  async deleteComment({ commit }, { pageUid, id, index }) {
    try {
      await db.collection(`posts/${pageUid}/comments`).doc(id).delete()
      commit('deleteComment', index)
    } catch (error) {
      alert('削除に失敗しました。')
    }
  },
  //コメントを編集
  async updateComment({ getters, commit }, commentEditComment) {
    const pageUid = getters.EditpageUid
    const id = getters.EditId
    const index = getters.EditIndex
    try {
      await db.collection(`posts/${pageUid}/comments`).doc(id).update({
        comment: commentEditComment
      })
      commit('updateComment', { index, commentEditComment })
    } catch (error) {
      alert('更新に失敗しました。')
    }
  }
}

export const mutations = {
  //stateのcommentsをリセット。
  resetComments(state) {
    state.comments = []
  },
  //コメントを編集
  updateComment(state, { index, commentEditComment }) {
    state.comments[index].comment = commentEditComment
  },
  //stateに格納
  matchComments(state, comment) {
    state.comments.push(comment)
  },
  //コメントを消去
  deleteComment(state, index) {
    state.comments.splice(index, 1)
  }
}