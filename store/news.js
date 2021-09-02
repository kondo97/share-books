import firebase from '@/plugins/firebase'
import dayjs from 'dayjs'

export const state = () => ({
   news: [
     { initial:true, read:true}
   ],
   noDataNews: false
})

export const getters = {
  news: state => state.news,
  noDataNews: state => state.noDataNews
}

const db = firebase.firestore()
const auth = firebase.auth()

let newsVisible =''

export const actions = {
  async getNews({ commit }, currentUid) {
    try {
      const lastMonth = dayjs().subtract(30, 'day').unix()
      const news =  db.collection(`users/${currentUid}/news`).where("createdAt", ">=", lastMonth).orderBy('createdAt', 'desc').startAfter(newsVisible).limit(3)
      news.get().then(snapshot => {
        newsVisible = snapshot.docs[snapshot.docs.length - 1]
        if (newsVisible == undefined) {
          commit('noDataNews')
        }
        snapshot.forEach((doc) => {
          if (doc.exists) {
          const newsData = doc.data()
          commit('getNews', newsData)
          }
        }, newsVisible)
      })
    } catch(error) {
      console.log('error')
    }
  },
  resetNews({ commit }) {
    commit('resetNews')
    newsVisible =''
  },
  readNews({ commit }, userId) {
    const batch = db.batch()
    const newsRef = db.collection(`users/${userId}/news`)
    newsRef.get().then(snapshot => {
      snapshot.forEach((doc) => {
        batch.update(doc.ref, {'read': true})
      })
      batch.commit()
    })
  },
}

export const mutations = {
  resetNews(state) {
    state.news = [
      {initial:true, read:true}
    ],
    state.noDataNews = false
  },
  getNews(state, newsData) {
    if(state.news[0].initial == true) {
      console.log('inital')
      state.news = []
    } 
    if(newsData.select == 'いいね') {
      console.log('iine')
      const editNews = {
        id: newsData.id,
        iconURL: newsData.iconURL,
        text: newsData.userName + 'が記事にいいねをしました。',
        createdAt: dayjs(newsData.createdAt * 1000).format('YYYY年MM月DD日'),
        select: 'いいね',
        read: newsData.read
      }
      state.news.push(editNews)
    } 
    if(newsData.select == 'コメント') {
      console.log('teat')
      const editNews = {
        id: newsData.id,
        iconURL: newsData.iconURL,
        text: newsData.userName + 'が記事にコメントをしました。',
        createdAt: dayjs(newsData.createdAt * 1000).format('YYYY年MM月DD日'),
        select: 'コメント',
        read: newsData.read
      }
      state.news.push(editNews)
    }
  },
  noDataNews(state) {
    state.noDataNews = true
  }
}