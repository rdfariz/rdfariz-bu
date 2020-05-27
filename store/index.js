import Cookies from 'universal-cookie'
import { isObject } from '@/plugins/utils'
const cookies = new Cookies()

export const state = () => ({
  static: {},
  myWork: [],
  myExperience: [],
  isLoading: false,
  isError: false,
  myWorkCategory: [],
  myExperienceCategory: [],
  darkMode: false
})
export const getters = {
  static: (state) => {
    return state.static
  },
  myWork: (state) => {
    return state.myWork
  },
  myExperience: (state) => {
    return state.myExperience
  },
  isLoading: (state) => {
    return state.isLoading
  },
  myWorkCategory: (state) => {
    return state.myWorkCategory
  },
  myExperienceCategory: (state) => {
    return state.myExperienceCategory
  },
  darkMode: (state) => {
    return state.darkMode
  }
}
export const mutations = {
  setStatic (state, payload) {
    state.static = payload
  },
  setMyWork (state, payload) {
    state.myWork = payload
  },
  setMyExperience (state, payload) {
    state.myExperience = payload
  },
  setLoading (state, payload) {
    state.isLoading = payload
  },
  setMyWorkCategory (state, payload) {
    state.myWorkCategory = payload
  },
  setMyExperienceCategory (state, payload) {
    state.myExperienceCategory = payload
  },
  setDarkMode (state, newState) {
    state.darkMode = newState
  }
}
export const actions = {
  async nuxtServerInit ({ dispatch, commit, state }, context) {
    await dispatch('getStatic')
    await dispatch('getMyWork')
    await dispatch('getMyExperience')

    if (context.req && context.req.headers) {
      const cookies = new Cookies(context.req.headers.cookie)
      const darkMode = cookies.get('_darkMode')
      if (darkMode === undefined || darkMode === null) {
        if (!isObject(state.static) && state.static.darkMode === true) {
          dispatch('toggleTheme', true)
        } else {
          dispatch('toggleTheme', false)
        }
      } else if (darkMode === 'true' || darkMode === true) {
        commit('setDarkMode', true)
      } else {
        commit('setDarkMode', false)
      }
    } else if (!isObject(state.static) && state.static.darkMode === true) {
      commit('setDarkMode', true)
    } else {
      commit('setDarkMode', false)
    }
  },
  async getStatic ({ dispatch, commit, state }) {
    const ref = this.$fireStore.collection('static').doc('data')
    try {
      if (isObject(state.static)) {
        await ref.onSnapshot(async (doc) => {
          commit('setStatic', doc.data())
          const staticData = await doc.data()
          if (staticData.categoryList !== undefined) {
            const categoryList = staticData.categoryList
            if (categoryList !== undefined && Array.isArray(categoryList.portfolio) && categoryList.portfolio.length > 0) {
              commit('setMyWorkCategory', categoryList.portfolio)
            }
            if (categoryList !== undefined && Array.isArray(categoryList.experience) && categoryList.experience.length > 0) {
              commit('setMyExperienceCategory', categoryList.experience)
            }
          }
        })
      }
    } catch (e) {
      commit('setStatic', {})
    } finally {
    }
  },
  toggleTheme ({ commit, state }, newState) {
    commit('setDarkMode', newState)
    cookies.set('_darkMode', newState)
  },
  async getMyWork ({ commit }) {
    const ref = this.$fireStore.collection('portfolio').orderBy('order', 'asc')
    try {
      const data = await ref.get()
      const promise = data.docs.map(async el => {
        return await el.data()
      })
      const payload = await Promise.all(promise)
      await commit('setMyWork', payload)
    } catch (e) {
      await commit('setMyWork', [])
    } finally {
    }
  },
  async getMyExperience ({ commit }) {
    const ref = this.$fireStore.collection('experience').orderBy('order', 'asc')
    try {
      const data = await ref.get()
      const promise = data.docs.map(async el => {
        return await el.data()
      })
      const payload = await Promise.all(promise)
      await commit('setMyExperience', payload)
    } catch (e) {
      await commit('setMyExperience', [])
    } finally {
    }
  },
  setLoading ({ commit, state }, newState) {
    if (state.isLoading === true) {
      setTimeout(() => {
        commit('setLoading', newState)
      }, 500)
    } else {
      commit('setLoading', newState)
    }
  }
}
