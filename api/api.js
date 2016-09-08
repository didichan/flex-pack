import 'whatwg-fetch';

/**
 * An error that occurs when fetching data
 * @param {String} options.message    The description of the error
 * @param {Response} options.response The response of the fetch request
 */
function FetchError({ message, response }){
  this.name = 'FetchError';
  this.message = message;
  this.response = response;
  this.toString = () => this.message;
}
FetchError.prototype = Error.prototype;

export default class Api{
  /**
   * Api client constructor
   * @param  {String} url     The url for the request
   * @param  {String} token   The authToken of the logged in user
   * @return {Api}            Instance of Api client
   */
  constructor(url, token){
    this.token = token;
    this.url = url;
  }

  /**
   * Builds a basic request object for all methods in this class
   * @param  {Object} body    The request body object
   * @return {Object}         The request object
   */
  buildRequest(body, method){
    var token = this.token;
    // if headders are set and the request is cross origin the browser will
    // send an OPTIONS request first and if that comes back ok it will
    // send the POST request
    var request = {
      method: method || 'POST',
      headers: {
        'Content-Type':'application/json'
      }
    };

    if(token){
      request.headers['Authorization'] = 'Bearer ' + token;
    }

    if(body){
      request.body = JSON.stringify(body);
    }

    return request;
  }

  /**
   * Does a fetch request for a given path
   * @param  {object} [body]  The request body object
   * @param  {string} url     The absolute url
   * @return {Promise}        The promise returned from window.fetch
   */
  fetch(body, url, method){
    var readOptions = this.buildRequest(body, method);
    if(!url){
      url = this.url
    }

    return window.fetch(url, readOptions)
      .then(response => {
        if(response.status >= 400){
          throw new FetchError({
            message: 'The request returned with a '
                            +response.status+' status.',
            response: response
          });
        }

        return response.json();
      });
  }
}
