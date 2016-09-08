import Api from './api';

export default class Nucleases extends Api {
  constructor(addresses){
    var host = addresses.host || '';
    super(host + addresses.genomebrowser.nucleases);
  }

  get(){
    return this.fetch(null, null, 'GET')
  }
}
