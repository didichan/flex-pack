/*global describe, beforeEach, it, expect*/
import arrayStore from '../array-store';

var types, state, mutations;

describe('array store module', () => {
  beforeEach(() => {
    ({types, state, mutations} = arrayStore('🦄', { size: 3 }));
  });

  it('has a function that sets the array contents', () => {
    mutations[types.SET](state, [1, 2, 3, 4]);

    expect(state.array).to.deep.equal([1, 2, 3, 4]);
  });

  it('has a function that adds an array the array contents', () => {
    mutations[types.SET](state, [1, 2, 3, 4]);
    mutations[types.ADD](state, [5, 6]);

    expect(state.array).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it('has a function that removes items from the array contents', () => {
    mutations[types.SET](state, [1, 2, 3, 4, 5, 6]);
    mutations[types.REMOVE](state, [1, 2]);

    expect(state.array).to.deep.equal([3, 4, 5, 6]);
  });
});
