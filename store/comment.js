export const state = () => ({
  //編集するコメントのIDを格納
  index:''
})

export const getters = {
  index: state => state.index
}

export const actions = {
  //編集アイコンを押下
  changeCommit({ commit }, index) {
    commit('changeCommit', index)
  }
}

export const mutations = {
  //編集アイコンを押下。コメントのIDを格納。
  changeCommit(state, index) {
    state.index = index
    console.log(index)
  }
}