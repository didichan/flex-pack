import Api from './api';

export default class Rpc extends Api {

  constructor(addresses, token){
    var host = addresses.host || '';
    super(host + addresses.rpc, token);
  }

  /**
   * Loads the guides for a given gene in a given genome
   * @param  {String}   method   The method called
   * @param  {Object}   params   The params for the method
   * @return {Promise}           The promise that is returned by fetch
   */
  call(method, params){

    var request = {
      params: params,
      jsonrpc: '2.0',
      method: method,
      id: 1
    };

    return this.fetch(request).
      then(json => json.result);
  }
}
