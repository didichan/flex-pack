import Api from './api';

export default class Auth extends Api {

  constructor(addresses, token){
    super(null, token);
    this.addresses = addresses;
    this.host = addresses.host || '';
  }

  /**
   * Gets the user object for the current user
   * @return {Promise}      Resolves when request is complete
   */
  verify(){
    var url = this.host + this.addresses.auth.verify;

    return this.fetch(null, url)
      .catch(er => {
        if(er.response.status === 403){
          return null;
        }
        throw er;
      });
  }

  /**
   * Get the user token
   * @param  {String}   email     User email
   * @param  {String}   password  User password
   * @return {Promise}            Resolves when request is complete
   */
  requestToken(email, password){
    var url = this.host + this.addresses.auth['request-token'];
    var request = {
      email: email,
      password: password
    };

    return this.fetch(request, url).
      then(json => json.token);
  }
}
