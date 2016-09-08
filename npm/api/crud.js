import Api from './api';
import Query from './query';

export default class Crud extends Api {
  /**
   * Read an object
   * @param  {String}   object  The instance to read
   * @param  {Object}   detail  Details like filter or expand
   * @param  {Bool}     [count] Do a count query at the same time (default true)
   * @return {Promise}          Resolves when request is complete
   */
  async read(object, detail, count = true){
    var payload = {
      object: object,
      read: detail
    };

    // The count method takes the same params as read
    if(count){
      payload.count = detail;
    }

    var response = await this.fetch(payload);
    var read = response.read;

    if(count && Array.isArray(read)){
      // `read` should return an array. Add the total as an extra property.
      read.count = response.count;
    }

    return read;
  }

  /**
   * Update an array objects
   * @param  {String} object The instance to read
   * @param  {Array}  detail Array of objects {id: xx, property: {}}
   * @return {Promise}       Resolves when request is complete
   */
  update(object, detail){
    var payload = {
      object: object,
      update: detail
    };
    return this.fetch(payload).
      then(json => json.update);
  }

  /**
   * Add new items
   * @param  {String}   object Type of objects to add
   * @param  {Object[]} detail Array of objects to add
   * @return {Promise}         Resolves when request is complete
   */
  create(object, detail){
    var payload = {
      object: object,
      create: detail
    };
    return this.fetch(payload).
      then(json => json.create);
  }

  /**
   * Creates a new instance of the query builder
   * @param  {String} object The object to build the query for
   * @return {Query}         The query builder object
   */
  query(object){
    return new Query(this, object);
  }
}
