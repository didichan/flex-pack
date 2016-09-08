import set from 'lodash/set';

/**
 * A Query builder class for CRUD. Builds a CRUD query. Chainable.
 */
export default class Query{
  /**
   * Constructor for query builder
   * @param  {Crud}   api    An instance of the CRUD API class
   * @param  {String} object The type of object to query for
   */
  constructor(api, object){
    this.api = api;
    this.object = object;
    this.query = { filter: {} };
  }

  /**
   * Sets the filter object on the query. Chainable.
   * @param  {Object} filter  The filter object to set
   * @return {Query}          The query object
   */
  filter(...args){
    if(args.length >= 2){
      // If 2 args, it's keypath and value
      let [key, val] = args;
      set(this.query.filter, key, val);
      // If 1 args, it's filter object
    }else{
      this.query.filter = args[0];
    }

    return this;
  }

  /**
   * Sets the page size and number on the query. Chainable.
   * @param  {Number} size   The size of the page
   * @param  {Number} number The page number
   * @return {Query}         The query object
   */
  page(size, number){
    this.query.page = number;
    this.query['page_size'] = size;

    return this;
  }

  /**
   * Sets the sort column and direction of the query. Chainable.
   * @param  {string}      column    The column to sort by
   * @param  {string|bool} direction True or DESC to sort descending
   * @return {Query}                 The query object
   */
  sort(column, direction){
    this.query['sort_col'] = column;

    var reverse = String(direction).toLowerCase() === 'desc'
                  || direction === true;

    this.query.reverse = reverse;
    return this;
  }

  /**
   * Sets a property on the query. Chainable.
   * @param  {string} keyPath The keypath of the property to set
   * @param  {*}      value   The value to set
   * @return {Query}          The query object
   */
  setRaw(keyPath, value){
    set(this.query, keyPath, value);
    return this;
  }

  /**
   * Send the query as a read request
   * @return {Promise} The promise returned by the CRUD api class
   */
  read(){
    return this.api.read(this.object, this.query);
  }
}
