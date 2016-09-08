import Crud from './crud';

export default class GbCrud extends Crud {
  constructor(addresses, token){
    var host = addresses.host || '';
    super(host + addresses.genomebrowser.crud, token);
  }
}
