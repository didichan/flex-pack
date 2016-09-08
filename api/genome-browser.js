import Api from './api';

export default class GenomeBrowser extends Api {
  constructor(addresses, token){
    var host = addresses.host || '';
    super(host + addresses.genomebrowser.api, token);
  }

  buildPayload(object){
    return {
      chromosome: { id: object.chr },
      genome: { id: object.genome },
      read: {
        expand: [[ 'coordinates' ]]
      },
      'region_type': object.region,
      sequence: false || object.bases,
      'target_region': {
        start: object.start,
        end: object.end
      }
    }
  }
  /**
   * Get the genome browser data for a specific gene
   * @param  {Object}   gene    The gene object returned by crud api
   * @return {Promise}          Resolves when request is complete
   */
  getGene(gene){
    var settings = {
      chr: gene.coordinates.chromosome.id,
      genome: gene.coordinates.chromosome.genome_id,
      start: gene.coordinates.start_end[0],
      end: gene.coordinates.start_end[1],
      region: [ 'gene', 'transcript', 'exon' ],
      bases: true
    };
    return this.fetch(this.buildPayload(settings))
  }

  /**
   * Get all data you can from a sequence
   * @param  {Object}  s: {
   *                        chr:    6,
   *                        genome: 70,
   *                        start: '112233636',
   *                        end:   '112233900'
   *                      }
   * @return {Promise}    Resolves when request is complete
   */
  getSequence(s){
    if(!s || isNaN(s.chr)   || isNaN(s.genome)
          || isNaN(s.start) || isNaN(s.end)){
      throw new TypeError(
        `For the getSequence method you must include a config object like
          {
            chr: chromosome id,
            genome: genome id,
            start: sequence start,
            end: sequence end
          }`
      )
    }

    s.region = [ 'gene' ];

    var start = parseInt(s.start);
    var end   = parseInt(s.end);
    var spam  = end - start;

    if(spam < 0){
      throw new TypeError('For the getSequence method, ' +
                          'sequence start should precede sequence end')
    }

    if(spam < 24000){
      s.region = [ 'gene', 'exon' ];
      s.bases  = true;
    }

    return this.fetch(this.buildPayload(s))
  }
}
