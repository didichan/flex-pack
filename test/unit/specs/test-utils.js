import Vue from 'vue';
import Vuex from 'vuex';

// update the defaul value based on tests
const MOCK_STORE = {
  state: {
    people: {
      array: []
    }
  },
  mutations: {
    'people:SET': ''
  }
};

/**
 * Runs any VueJS actions that are scheduled for the next tick
 * Returns a promise that resolves when done.
 * @return {Promise} A promise that resolves after the tick.
 */
export function tick(){
  return new Promise(function(resolve){
    Vue.nextTick(resolve);
  });
}

/**
 * Creates a stubbed instance of a view component by assigning a blank
 * object to each of its props and creating a new element for it.
 * @param  {object} constructor The Vue compunent to create an instance of
 * @param  {object} data        The props of the component
 * @return {Vue}    The created Vue instance
 */
export function createTestInstance(constructor, data){

  Vue.use(Vuex);
  var Component = Vue.extend(constructor);

  return new Component({
    propsData: data,
    el: document.createElement('div'),
    store: new Vuex.Store(MOCK_STORE)
  })
}

export default { tick, createTestInstance };
