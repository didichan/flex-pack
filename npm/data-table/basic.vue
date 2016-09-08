<template>
  <table class='data-table'>
    <thead>
      <tr>
        <th v-for="column in columns"
            :key="getTrackBy(column)"
            @click="sortColumn(column)">
          <component :is="getHeaderComponent(column)"></component>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, $index) in records"
          @click='selectRow(row, $index)'
          :class='getRowClass(row)'>
        <td v-for="column in columns"
            :key="getTrackBy(column)">
          <component :is="getCellComponent(column)"
                     :row="row"
                     :column="column"></component>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue';

export default {
  data: function(){
    return {
    }
  },
  props: {
    // Column configuration array (see examples)
    'columns': {
      type: Array
    },
    // An array of records to use if `data` is absent
    'records': null,
    // The sort configuration to use if `data` is absent
    'sort': null,

    'focused': {
      default: () => null
    }
  },
  methods: {
    /**
     * Sets the sort field to the given column or reverses the sort order
     * if the column is already selected. Creates a new sort config object
     * and fires a sort event.
     * @param  {object}  column The column configuration obect
     */
    sortColumn(column){
      var order = 'ASC'

      // If we're already sorting ascending by this column,
      // reverse the polarity.
      if(this.getSortOrder(column) === 'ASC'){
        order = 'DESC'
      }

      // This is the new config object
      var sort = {
        field: column.name,
        order: order
      }
      this.$emit('sort', sort)
    },
    /**
     * Sets the focus to a given row, and emit an event
     * @param  {Object row The row to focus
     */
    selectRow(selected, index){
      if(this.focused === selected){
        selected = null
        index = null
      }

      this.$emit('focus', selected, index);
    },

    /**
     * Returns the `focused` if the row is focused
     * @param  {Object} row The row to get the class for
     * @return {string}     The class (or a blank string)
     */
    getRowClass(row){
      return {
        focused: row === this.focused
      }
    },

    /**
     * Create a cell component with a custom template
     * @param  {String} template The template to use
     * @return {Object}          The component created
     */
    getComponent(template){
      var parent = this.$parent;

      return Vue.extend({
        // Inherit the parent vm's components
        components: parent.$options.components,
        template: `<span>${template}</span>`,
        // Make the current row available
        props: ['row', 'column'],
        computed: {
          // Make parent vm available
          parent(){
            return parent
          },
          value(){
            return this.row[this.column.name]
          }
        }
      });
    },

    /**
     * Returns the column field to be used for tracking
     * @param  {Object} column The column
     * @return {String}        The field name to track by
     */
    getTrackBy(column){
      return column && column.template ? 'template' : 'name';
    },

    getCellComponent(column){
      var template = column.template || '{{ value }}'
      return this.getComponent(template)
    },

    getHeaderComponent(column){
      return this.getComponent(column.header)
    },

    /**
     * Returns the sort order of the given column, or false if the column
     * is not being sorted
     * @param  {object}      column The column configuration Object
     * @return {string|bool}        ASC, DESC or false
     */
    getSortOrder(column){
      return !!this.sort && (this.sort.field === column.name) && this.sort.order
    }
  }
}
</script>

<style>
.data-table th.sortable{
  cursor: pointer
}

.data-table .focused{
  background: #a0d3e8;
  outline: dotted 1px #74bfdd;
}
</style>
