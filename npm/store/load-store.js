import {remove} from './utils'
/**
 * Creates a store that keeps track of pending loads
 * @return {Object} state, mutations, types and actions
 *
 * The state looks like this:
 * {
 *   queue: []  // A queue of tokens, each representing a load in progress
 * }
 *
 * Mutations avaiable:
 * START_LOAD // Adds a token to the load queue
 * END_LOAD   // Removes a token from the load queue
 *
 * Actions available:
 * trackLoad // Adds a promise to the load queue and removes it when complete
 */
export default function create(namespace){

  if(!namespace){
    throw new TypeError('No namespace provided for the load-store 💣');
  }

  var state = {
    queue: []
  };

  var types = {
    START_LOAD: `${namespace}:START_LOAD`,
    END_LOAD: `${namespace}:END_LOAD`
  };

  var mutations = {
    [types.START_LOAD](state, key){
      state.queue.push(key);
    },
    [types.END_LOAD](state, key){
      remove(state.queue, key);
    }
  };

  var actions = {
    /**
     * Tracks a load call by adding its promise to the load queue
     * and removing it on reject or resolve
     * @param  {Promise} promise  The promise to track
     * @return {Promise}          The original promise
     */
    trackLoad: function({dispatch}, promise){
      dispatch(types.START_LOAD, promise);
      return promise.then(
        result => {
          dispatch(types.END_LOAD, promise);
          return result;
        },
        error => {
          dispatch(types.END_LOAD, promise);
          throw error;
        }
      );
    }
  }

  return {
    state,
    mutations,
    actions,
    types
  };
}
