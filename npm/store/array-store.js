import {remove} from './utils'
/**
 * A generic store module for an array of items.
 * @return {Object}      The created module.
 *
 * The store's main state object is just an array. The initial state looks like:
 * {
 *   array: []
 * }
 *
 * The following mutations are available:
 *   SET ADD REMOVE REPLACE
 */
export default function create(namespace, initial = []){

  if(!namespace){
    throw new TypeError('No namespace provided for the array-store 💣')
  }

  var types = {
    SET: `${namespace}:SET`,
    ADD: `${namespace}:ADD`,
    REMOVE: `${namespace}:REMOVE`,
    REPLACE: `${namespace}:REPLACE`
  }

  var state = {
    array: initial
  }

  var mutations = {
    [types.SET] (state, array){
      state.array = [...array]
    },
    [types.ADD] (state, array){
      state.array = state.array.concat(array)
    },
    [types.REMOVE] (state, array){
      for(let i of array){
        remove(state.array, i)
      }
    },
    [types.REPLACE] (state, [index, item]){
      state.array.splice(index, 1, item)
    }
  }

  var getters = {
    [namespace]: state => state.array
  }

  return {
    types,
    state,
    mutations,
    getters
  }
}
