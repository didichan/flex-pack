import toPath from 'lodash/toPath';
import Vue from 'vue';

/**
 * Creates a store module that contains an object structured data
 * State has these properties:
 * {
 *   data: {},    // The object
 * }
 *
 * Mutations:
 * SET            // Sets the object
 */
export default function create(namespace, value = {}){

  if(!namespace){
    throw new TypeError('No namespace provided for the tree-store 💣');
  }

  var types = {
    SET: `${namespace}:SET`,
    SET_KEY: `${namespace}:SET_KEY`
  };

  var state = {
    data: value
  };

  var mutations = {
    [types.SET] (state, data){
      state.data = data;
    },
    [types.SET_KEY] (state, key, data){
      // Can't use _.set because we need to make new objects/arrays reactive
      // Instead iterate through key path and use Vue.set
      var keyPath = toPath(key);
      var lastIx = keyPath.length - 1;
      var isNum = n => /^[0-9]+$/.test(n);

      keyPath.reduce(function(object, key, index){
        if(index < lastIx){
          // Go through all keys and create objects for undefined values.
          // Convert primitive values to objects (e.g. number -> new Number)
          let curVal = object[key];
          if((typeof curVal !== 'object') || (curVal === null)){
            // If the next key is a number, create an empty array at this key
            let newVal = isNum(keyPath[index + 1]) ? [] : Object(curVal);
            Vue.set(object, key, newVal);
          }

          // Pass created/existing object to next iteration
          return object[key];
        }else{
          // At the last index just set the value
          Vue.set(object, key, data);
        }
      },
      state.data);
    }
  };

  return {
    types,
    state,
    mutations
  }
}
