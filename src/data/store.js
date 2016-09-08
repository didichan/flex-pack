import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import { arrayStore } from '@didichan/store'

Vue.use(Vuex)

var people = arrayStore('people')

const actions = {
  /**
   * Get people and set the store
   * @return {Promise}
   */
  getPeopleList({ commit }){
    api.getPeople()
       .then(p => commit(people.types.SET, p))
  },

  /**
   * Add a new record and update the store
   * @param {Object}   p   The new record to be added
   * @return {Promise}
   */
  addPerson({ commit }, human){
    api.addPerson(human)
       .then(p => commit(people.types.SET, p))
  }
}

const getters = {
  people: state => state.people.array
}

// Create the store
var store = new Vuex.Store({
  getters: getters,
  actions: actions
})

store.registerModule('people', {
  mutations: people.mutations,
  state: people.state
})

export default store
