/*global require, describe, it, expect, beforeEach, sinon*/
import BasicTable from '../basic';

describe('data table component', function(){
  var dataTable;

  beforeEach(function(){
    dataTable = {
      $emit: sinon.stub()
    };

    dataTable.sort = {}

    dataTable.records = []

    dataTable.columns = [
      { text: 'Fruit', name: 0 },
      { text: 'Scientific Name', name: 1 },
      { text: 'Symbol', name: 2 },
      { text: 'Ripe colour', name: 3 }
    ];
  });

  // it('has a function for getting a columns sort order', function(){
  //   var vm = {
  //     sort: {
  //       field: 'a',
  //       order: 'DESC'
  //     }
  //   }
  //
  //   var order = BasicTable.methods.getSortOrder.call(vm, { name: 'a' })
  //   expect(order).to.equal('DESC')
  //
  //   order = BasicTable.methods.getSortOrder.call(vm, { name: 'b' })
  //   expect(order).to.equal(false)
  // });

  // it('has a function to check whether a column is sortable', function(){
  //   var sortable = BasicTable.methods.isColumnSortable({ template: 'aaa' })
  //   expect(sortable).to.equal(false)
  //
  //   sortable = BasicTable.methods.isColumnSortable({ name: 0 })
  //   expect(sortable).to.equal(true)
  //
  //   sortable = BasicTable.methods.isColumnSortable({ name: 0, sort: false })
  //   expect(sortable).to.equal(false)
  // })

  describe('sortColumn function', function(){
    var vm;

    beforeEach(function(){
      vm = {
        isColumnSortable: sinon.stub(),
        getSortOrder: sinon.stub(),
        $emit: sinon.spy()
      }
    })

    // it('does nothing if the column is not sortable', function(){
    //   vm.isColumnSortable.returns(false)
    //
    //   BasicTable.methods.sortColumn.call(vm, { name: 'a' })
    //
    //   expect(vm.$emit).not.to.have.been.called()
    // })

    it('sorts by ASC if the column is not already selected', function(){
      vm.isColumnSortable.returns(true)
      vm.getSortOrder.returns(false)

      BasicTable.methods.sortColumn.call(vm, { name: 'a' })

      expect(vm.$emit).to.have.been.called.with('sort', {
        field: 'a',
        order: 'ASC'
      })
    })

    it('inverts the sort order if the  column is already slected', function(){
      vm.isColumnSortable.returns(true)
      vm.getSortOrder.returns('ASC')

      BasicTable.methods.sortColumn.call(vm, { name: 'a' })

      expect(vm.$emit).to.have.been.called.with('sort', {
        field: 'a',
        order: 'DESC'
      })

      vm.getSortOrder.returns('DESC')

      BasicTable.methods.sortColumn.call(vm, { name: 'a' })

      expect(vm.$emit).to.have.been.called.with('sort', {
        field: 'a',
        order: 'ASC'
      })
    })
  })

  it('has a function that toggles a row as focused or not', function(){
    var vm = {
      $emit: sinon.spy()
    }
    var selected = { name: 'test' }

    BasicTable.methods.selectRow.call(vm, selected, 1)

    expect(vm.$emit).to.have.been.called.with('focus', selected, 1)

    vm.focused = selected

    BasicTable.methods.selectRow.call(vm, selected, 1)

    expect(vm.$emit).to.have.been.called.with('focus', null, null)
  })
});
