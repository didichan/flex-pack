/*global describe, beforeEach, expect, it*/
import loadQueue from '../load-store';

var state, types, mutations, actions;

describe('load queue store module', () => {
  beforeEach(() => {
    ({state, types, mutations, actions} = loadQueue('🐀'));
  });

  it('has a mutation that adds something to the queue', ()=>{
    mutations[types.START_LOAD](state, 'loading');

    expect(state.queue).to.deep.equal(['loading']);
  });

  it('has a mutation that removes something from the queue', ()=>{
    state.queue = ['loading'];

    mutations[types.END_LOAD](state, 'loading');

    expect(state.queue).to.deep.equal([]);
  });

  describe(' - trackLoad action', () => {
    var promise, resolve, reject,
      store = {
        dispatch: (...args) => {
          var mutation = args.shift();
          mutations[mutation](state, ...args);
        }
      };

    beforeEach(() => {
      promise = new Promise((...handlers) => {
        [resolve, reject] = handlers;
      });
    });

    it('adds a promise to the queue and removes it when resolved', () => {
      var p = actions.trackLoad(store, promise);

      expect(state.queue).to.deep.equal([promise]);

      resolve('good');

      return p.then(result => {
        expect(result).to.equal('good');
        expect(state.queue).to.deep.equal([]);
      });
    });

    it('adds a promise to the queue and removes it when rejected', () => {
      var p = actions.trackLoad(store, promise);

      expect(state.queue).to.deep.equal([promise]);

      reject('bad');

      return p.catch(e => e)
              .then(err => {
                expect(err).to.equal('bad');
                expect(state.queue).to.deep.equal([]);
              });
    });
  });
});
