/*global describe, beforeEach, expect, it, sinon*/
import treeStore from '../tree-store';
import Vue from 'vue';

var types, state, mutations;

describe('tree store module', () => {
  beforeEach(() => {
    ({types, state, mutations} = treeStore('🦀', { }));
  });

  it('has a function that sets a tree property by keypath', () => {
    var val = {};

    mutations[types.SET_KEY](state, 'a.b', val);

    // Check property tree
    expect(state.data.a).to.exist();
    expect(state.data.a.b).to.equal(val);
  });

  it('sets the key path using `Vue.set` so that it\'s reactive', () => {
    var val = {};
    sinon.spy(Vue, 'set');

    mutations[types.SET_KEY](state, 'a.b', val);
    // Check Vue reactivity
    expect(Vue.set).to.have.been.called.with(state.data, 'a', {});
    expect(Vue.set).to.have.been.called.with(state.data.a, 'b', val);
  });
});
