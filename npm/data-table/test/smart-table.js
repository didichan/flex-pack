/*global require, describe, it, expect, beforeEach, sinon*/
import SmartTable from '../smart';

describe('smart table component', function(){
  it('sorts records by the selected sort order if present', function(){
    var vm = {
      sort: null,
      records: [
        { name: 2 }
        { name: 3 }
        { name: 1 }
      ]
    }

    var result = SmartTable.computed.sorted.call(vm)
    expect(result).to.deep.equal([
      { name: 2 },
      { name: 3 },
      { name: 1 }
    ])

    vm.sort = { field: 'name', order: 'ASC' }

    result = SmartTable.computed.sorted.call(vm)
    expect(result).to.deep.equal([
      { name: 1 },
      { name: 2 },
      { name: 3 }
    ])
  })

  it('returns a subset of the sorted data if pageSize is specified', function(){
    var vm = {
      pageSize: null,
      sorted: [1, 2, 3, 4, 5, 6]
    }

    var result = SmartTable.computed.pageRows.call(vm)
    expect(result).to.deep.equal([1, 2, 3, 4, 5, 6])

    vm.pageSize = 2
    vm.currentPage = 2

    result = SmartTable.computed.pageRows.call(vm)
    expect(result).deep.to.equal([3, 4])
  })

  it('calculates the total number of pages', function(){
    var vm = {
      records: [1,2,3,4,5,6,7],
      pageSize: 5
    }

    expect(SmartTable.computed.totalPages.call(vm)).to.equal(2)
  })
});
