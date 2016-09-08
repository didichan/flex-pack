
var people = [
  {
    name: 'bebe-chan',
    date: '4567-09-12',
    email: 'bebe@chan.edu',
    children: '0'
  },
  {
    name: 'monkey-chan',
    date: '4567-09-12',
    email: 'monkey@chan.edu',
    children: '12'
  }
]

export default {
  /**
   * Gets the user object for the current user
   * @return {Promise}      Resolves when request is complete
   */
  getPeople(){
    return Promise.resolve(people)
  },
  /**
   * Gets the user object for the current user
   * @return {Promise}      Resolves when request is complete
   */
  addPerson(person){
    people.push(person)
    return this.getPeople()
  }
}
