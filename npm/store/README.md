#STORE

### This is a collection of miscellaneous stores of general structure and purpose for Vuex

### Install
`npm i @privateNamespace/store`

### Use
`import { _store_ , _store_ } from @privateNamespace/store` or
`import store from @privateNamespace/store/_store_` where `_store_` is:

 - `array-store` with the mutations
  ```js
  var mutations = {
    [types.SET] (state, array){
      state.array = [...array];
    },
    [types.ADD] (state, array){
      state.array = state.array.concat(array);
    },
    [types.REMOVE] (state, array){
      for(let i of array){
        state.array.$remove(i);
      }
    },
    [types.REPLACE] (state, [index, item]){
      state.array.splice(index, 1, item);
    }
  };
  ```

 - `tree-store` with mutations
  ```js
  var mutations = {
    [types.SET] (state, data){
      state.data = data;
    },
    [types.SET_KEY] (state, [key, data]){ ... }
  ```

 - `load-store` with actions and mutations
  ```js
  var mutations = {
    [types.START_LOAD](state, key){
      state.queue.push(key);
    },
    [types.END_LOAD](state, key){
      state.queue.$remove(key);
    }
  };

  var actions = {
    /**
     * Tracks a load call by adding its promise to the load queue
     * and removing it on reject or resolve
     * @param  {Promise} promise  The promise to track
     * @return {Promise}          The original promise
     */
    trackLoad: function({dispatch}, promise){ ... }
  ```
