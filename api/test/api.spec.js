/*global describe it sinon expect*/
import {Crud, Rpc, GenomeBrowser} from '..';

describe('The CRUD class', () => {
  it('has a method that adds items', () => {
    var crud = new Crud();

    sinon.stub(crud, 'fetch').returns(Promise.resolve({ create: 'response' }));

    var returned = crud.create('apples', 'green');

    expect(crud.fetch).to.have.been.called.with(
      {
        object: 'apples',
        create: 'green'
      }
    );

    return returned.then(resolved => {
      expect(resolved).to.equal('response');
    });
  });

  it('can read items', function(){
    var crud = new Crud();
    sinon.stub(crud, 'fetch').returns(Promise.resolve({
      read: [1,2,3],
      count: 10
    }));

    var returned = crud.read('horse', 'arg');

    expect(crud.fetch).to.have.been.called.with({
      object: 'horse',
      read: 'arg',
      count: 'arg'
    });

    return returned.then(value => {
      expect([...value]).to.deep.equal([1,2,3]);
      expect(value.count).to.equal(10);
    });
  });
});

describe('The RPC class', () => {
  it('has a call method', () => {
    var rpc = new Rpc({});

    sinon.stub(rpc, 'fetch').returns(Promise.resolve({ result: 'response' }));

    var returned = rpc.call('a walk in the park', 'grass');

    expect(rpc.fetch).to.have.been.called.with(
      {
        params: 'grass',
        jsonrpc: '2.0',
        method: 'a walk in the park',
        id: 1
      }
    );

    return returned.then(resolved => {
      expect(resolved).to.equal('response');
    });
  });
});

describe('The genome-browser class', () => {

  var gb = new GenomeBrowser({genomebrowser:{}});
  sinon.stub(gb, 'fetch');
  var input = {
    chr: 'chr',
    genome: 'genome',
    region: 'region',
    bases: 'bases',
    start: 'start',
    end: 'end'
  };

  it('has a payload builder', () => {
    var payload = gb.buildPayload(input);
    expect(payload).to.deep.equal({
      chromosome: { id: 'chr' },
      genome: { id: 'genome' },
      read: {
        expand: [[ 'coordinates' ]]
      },
      'region_type': 'region',
      sequence: 'bases',
      'target_region': {
        start: 'start',
        end: 'end'
      }
    })
  });

  it('has a method that takes a gene object to build the request', () => {
    var gene = {
      coordinates: {
        chromosome: {
          id: 'chr',
          'genome_id': 'genome'
        },
        'start_end': ['start', 'end']
      }
    };


    sinon.stub(gb, 'buildPayload').returns('gene');

    gb.getGene(gene);

    expect(gb.fetch).to.have.been.called.with('gene');
    expect(gb.buildPayload).to.have.been.called.with({
      chr: 'chr',
      genome: 'genome',
      start: 'start',
      end: 'end',
      region: [ 'gene', 'transcript', 'exon' ],
      bases: true
    });

    gb.buildPayload.restore();
  });

  it('takes a sequence details and adjustes the request acordingly', () => {
    var goodShortSequence = {
      chr: '1',
      genome: '2',
      start: '1000',
      end: '2000'
    };

    var goodLongSequence = {
      chr: '1',
      genome: '2',
      start: '1000',
      end: '26000'
    };

    var badSequence = {
      chr: 'chr',
      genome: 'genome',
      region: 'region',
      bases: 'bases',
      start: 'start',
      end: 'end'
    };

    var inversedSequence = {
      chr: '1',
      genome: '2',
      start: '3000',
      end: '1000'
    };

    sinon.stub(gb, 'buildPayload').returns('sequence');

    gb.getSequence(goodShortSequence);
    expect(gb.fetch).to.have.been.called.with('sequence');
    expect(gb.buildPayload).to.have.been.called.with({
      chr: '1',
      genome: '2',
      start: '1000',
      end: '2000',
      region: [ 'gene', 'exon' ],
      bases: true
    });

    gb.getSequence(goodLongSequence);
    expect(gb.fetch).to.have.been.called.with('sequence');
    expect(gb.buildPayload).to.have.been.called.with({
      chr: '1',
      genome: '2',
      start: '1000',
      end: '26000',
      region: [ 'gene' ]
    });

    expect(() => gb.getSequence(badSequence)).to.throw(TypeError,
      `For the getSequence method you must include a config object like
          {
            chr: chromosome id,
            genome: genome id,
            start: sequence start,
            end: sequence end
          }`
    );

    expect(() => gb.getSequence(inversedSequence)).to.throw(TypeError,
      'For the getSequence method, ' +
      'sequence start should precede sequence end'
    );

    gb.buildPayload.restore();
  });
});
