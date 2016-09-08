# Data Table

This is a great component to use if you want to have a table on your page.
There are actually two different types of table: the stupid table and the smart
table.

## Stupid Table

This guy is really basic. It doesn't know how to sort, it just fires the event
and makes you do the dirty work.

For use when the sorting is done on the server side. Remember to keep your
"sort" property synced or you won't get UI updates on the currently sorted
column. Same for the focus property and the focus event.

```html
<template>
  <div>
    <data-table :columns="columns"
                :records="items"
                :sort="sort"
                :focused="selected"
                @sort="setSort"
                @focus="setSelected"></data-table>

    Sort:
    <div>
      - Field: <span class="sort-field">{{ sort && sort.field}}</span><br>
      - Order: <span class="sort-order">{{ sort && sort.order }}</span>
    </div>
    <br>

    Selected:
    <div>
      - Index: <span class="selected-index">{{ selIx }}</span><br>
      - Data: <span class="selected">{{ selected | csv }}</span>
    </div>
  </div>
</template>

<script>
import DataTable from '@deskgen/dg-data-table/basic';

export default {
  components: {
    DataTable
  },
  filters: {
    csv: val => val && String(val)
  },
  data: function(){
    return {
      sort: null,
      selected: null,
      selIx: null,
      columns: [
        { header: 'Fruit', name: 0 },
        { header: 'Scientific Name', name: 1 },
        { header: 'Symbol', name: 2, sort: false },
        {
          header: 'Ripe colour',
          name: 3,
          template: `<div :style="{ color: row[3] }">
                      {{ row[3] }}
                    </div>`
        }
      ],
      items: [
        ['Strawberry', 'Fragaria × ananassa', '🍓', 'Red'],
        ['Watermelon', 'Citrullus lanatus', '🍉', 'Green'],
        ['Tangerine', 'Citrus tangerina', '🍊', 'Orange'],
        ['Peach', 'Prunus persica', '🍑', 'Peach']
      ],
      selection: []
    }
  },
  methods:{
    setSort(sort){
      this.sort = sort
    },
    setSelected(sel, ix){
      this.selected = sel
      this.selIx = ix
    }
  }
}
</script>
```

## Smart Table

This guy's a little bit more proactive. The sorting and row focusing is done
all automatically.

```html
<template>
  <div>
    <data-table :columns="columns"
                :records="records"></data-table>
  </div>
</template>

<script>
import DataTable from '@deskgen/dg-data-table/smart'
import Vue from 'vue'

Vue.filter('index', str => {
  str = String(str)
  while(str.length < 3){
    str = '0' + str
  }
  return '#' + str
})

export default {
  components: {
    DataTable
  },

  data(){
    return {
      records: [
        { id: 1, name: 'Bulbasaur',   types: ['grass', 'poison'] },
        { id: 2, name: 'Ivysaur',     types: ['grass', 'poison'] },
        { id: 3, name: 'Venusaur',    types: ['grass', 'poison'] },
        { id: 4, name: 'Charmander',  types: ['fire'] },
        { id: 5, name: 'Charmeleon',  types: ['fire'] },
        { id: 6, name: 'Charazard',   types: ['fire', 'flying'] },
        { id: 7, name: 'Squirtle',    types: ['water'] },
        { id: 8, name: 'Wartortle',   types: ['water'] },
        { id: 9, name: 'Blastoise',   types: ['water'] },
        { id: 10, name: 'Caterpie',   types: ['bug'] },
        { id: 11, name: 'Metapod',    types: ['bug'] },
        { id: 12, name: 'Butterfree', types: ['bug', 'flying'] }
      ],
      columns: [
        {
          name: 'id',
          header: 'National Pokédex #',
          template: '{{ row.id | index }}'
        },
        {
          name: 'name',
          header: 'Name'
        },
        {
          header: 'Type',
          template: `{{ row.types.join('/') }}`
        }
      ]
    }
  }
}
</script>
```
