import Query from '../query.js'

describe('query class', () => {
  var query;
  var api = {
    read: sinon.spy()
  };

  beforeEach(() => {
    query = new Query(api, 'object');
  });

  it('creates a new query object with an empty filter', () => {
    expect(query.query).to.deep.equal({ filter: {} });
  });

  it('adds keys to the filter', () => {
    var chain = query.filter('user.email', 'jockey@example.horse');
    expect(chain).to.equal(query);

    expect(query.query.filter).to.deep.equal({
      user: {
        email: 'jockey@example.horse'
      }
    });
  });

  it('sets the filter object', () => {
    var filter = { animal: 'horse' };

    var chain = query.filter(filter);
    expect(chain).to.equal(query);

    expect(query.query.filter).to.equal(filter);
  });

  it('sets the page size and number', () => {
    var chain = query.page(50, 2);
    expect(chain).to.equal(query);
    expect(query.query.page_size).to.equal(50);
    expect(query.query.page).to.equal(2);
  });

  it('sets the sort column and order', () => {
    var chain = query.sort('one');
    expect(chain).to.equal(query);
    expect(query.query.sort_col).to.equal('one');
    expect(query.query.reverse).to.equal(false);

    query.sort('two', 'DESC');
    expect(query.query.sort_col).to.equal('two');
    expect(query.query.reverse).to.equal(true);

    query.sort('three', true);
    expect(query.query.sort_col).to.equal('three');
    expect(query.query.reverse).to.equal(true);
  });

  it('reads from the api', function(){
    query.read();

    expect(api.read).to.have.been.called.with('object', query.query);
  });

  it('can set a raw query property', function(){
    var chain = query.setRaw('expand', [['blah']]);

    expect(chain).to.equal(query);
    expect(query.query.expand).to.deep.equal([['blah']]);
  });
});
