<template>
  <div class="smart-table">
    <basic-table :columns="columns"
                :records="sorted"
                :focused="focused"
                :sort="sort"
                @focus="setFocus"
                @sort="setSort"></basic-table>
  </div>
</template>

<script>
import BasicTable from './basic'
import orderBy from 'lodash/orderBy'

export default {
  components: {
    BasicTable
  },

  props: [
    'columns',
    'records'
  ],

  data(){
    return {
      sort: null,
      focused: null
    }
  },

  computed: {
    /**
     * Returns the records sorted by the appropriate field
     * @return {array} The array of sorted records
     */
    sorted(){
      var records = this.records

      return this.sort
        ? orderBy(records, this.sort.field, this.sort.order.toLowerCase())
        : records
    }
  },

  methods: {
    /**
     * Sets the focus to the specified record
     * @param {Obect} focus The record to focus
     */
    setFocus(focus){
      this.focused = focus
    },

    /**
     * Sets the sort order and field
     * @param {object} sort Sort config object
     */
    setSort(sort){
      this.sort = sort
    }
  }
}
</script>
