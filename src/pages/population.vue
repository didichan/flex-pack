<template>
<div>
  <div class="container">
    <label v-for="item in columns" :for="item.name">
      {{ item.header }}
      <input :type="item.type" :id="item.name"
             v-model="item.input" min="0" max="87">
      <span v-if="item.type=='range'">{{ item.input }}</span>
      <div class="error" v-if="item.input && isBadInput(item.name)">
        This field is required
      </div>
    </label>
  </div>

  <a v-if="columns[3].input==87" class="welcome"
    @click="columns[3].input=86">
    <p>
      Welcome Feodor Vassilyev!
    </p>
  </a>

  <a @click="addRecord(newUser)" class="action"
     :class="disableClass">Add</a>
  <div class="inline-container">
    <input type="text" v-model="userInput" placeholder="search by name">
    <input type="text" v-model="userInputSecondary"
           placeholder="search by email">
  </div>

  <smart v-if="filteredRecords" :columns="columns"
         :records="filteredRecords"></smart>
</div>
</template>
<script>
import Smart from '@didichan/data-table/smart'
import { mapGetters, mapActions } from 'vuex'

export default {
  /**
   * A block of instruction that runs on created hook
   */
  created(){
    this.getPeopleList()
  },
  /**
   * Fairly static data
   */
  data(){
    return {
      userInput: null,
      userInputSecondary: null,
      submit: false,
      columns: [
        {
          name: 'name',
          header: 'Name',
          input: null,
          type: 'text'
        },
        {
          name: 'date',
          header: 'Date of Birth',
          input: null,
          type: 'date'
        },
        {
          name: 'email',
          header: 'User Email',
          input: null,
          type: 'email'
        },
        {
          name: 'children',
          header: 'Number of Children',
          input: null,
          type: 'range'
        }
      ]
    }
  },
  /**
   * A list of used components - short
   */
  components: {
    Smart
  },
  /**
   * Custom and general getters
   */
  computed: {
    /**
     * Store getters
     */
    ...mapGetters({
      people: 'people'
    }),
    /**
     * Data for the table to display
     */
    filteredRecords(){
      var step1 = this.filterPeople(this.userInput, 'name', this.people)
      return this.filterPeople(this.userInputSecondary, 'email', step1)
    },
    /**
     * A new user object
     */
    newUser(){
      return {
        name: this.columns[0].input,
        date: this.columns[1].input,
        email: this.columns[2].input,
        children: this.columns[3].input
      }
    },
    /**
     * The class for the button
     */
    disableClass(){
      return this.isClickable ? '' : 'disabled'
    },
    /**
     * The all mighty logic of the page
     * Unless all filds are valid nothing proceeds
     */
    isClickable(){
      var result = false
      this.columns.map(a => {
        result = this.isBadInput(a.name) || result
      })
      this.submit = !result
      return this.submit
    }
  },
  methods: {
    /**
     * Methods from the store - constants
     */
    ...mapActions([
      'getPeopleList',
      'addPerson'
    ]),
    /**
     * A small utility for filters
     * @param {String} string The user input
     * @param {String} string The column to target
     * @param {Array} array   The array of data to filter
     * @return {Array}
     */
    filterPeople(string, column, array){
      return string
           ? array.filter(e => e[column].match(string))
           : array
    },
    /**
     * A click handler for adding records
     */
    addRecord(){
      if(this.isClickable){
        this.addPerson(this.newUser)
        this.submit = false
        this.columns.map(a => a.input = null)
      }
    },
    /**
     * The form validator
     * @param {String} a The column name
     * @return {Boolean} true - is bad
     *                   false - is good
     */
    isBadInput(a){
      var output = false
      switch(a){
      case 'name':
        output = this.columns[0].input ? (this.columns[0].input.length < 5)
                                       : true
        break
      case 'email':
        var regEmail = /^[\w\d!#$%&'*+-/=?^_`{|}~]+@[\w\d.]+\.[\w]{2,}$/
        output = this.columns[2].input ? !this.columns[2].input.match(regEmail)
                                       : true
      }
      return output
    }
  }
}
</script>
<style>
.welcome{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);

  p{
    line-height: 1em;
    padding: 1em;
    font-size: 2em;
    background-color: white;
    transform: translate(1em, calc(50vh - 50%));
  }
}
a{
  cursor: pointer;
}
.disabled{
  cursor: default;
}
</style>
