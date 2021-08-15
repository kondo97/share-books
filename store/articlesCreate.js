export const state = () => ({
  contents:[],
  content:{
    title: "",
    author: "",
    descript: "",
    url: "",
  },
  editIndex:''
})

export const getters = {
  contents: state => state.contents,
  content: state => state.content
}

export const actions = {
  // 本を追加
  pushBook({ commit }, create) {
    commit('pushBook', create)
  },
  // 編集アイコンを押下
  editCreate({ commit }, {content, index}) {
    commit('editCreate', {content, index})
  },
  // 更新ボタンを押下
  updateCreate({ commit }, create) {
    commit('updateCreate', create)
  }
}

export const mutations = {
  //本を追加
  pushBook(state, create) {
    state.contents.push(create)
  },
  //編集アイコンを押下
  editCreate(state, {content, index}) {
    state.content = content
    state.editIndex = index
  },
  //編集データに置き換える。
  updateCreate(state, create) {
    state.contents[state.editIndex] = create
  }
}