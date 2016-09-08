import {GenomeBrowser, GbCrud, Auth} from '.';

export default async function example(){
  // short demonstartion of the api class

  // a snapshot of build-config.json
  var addresses = {
    host: 'https://showroom.deskgen.com',
    genomebrowser: {
      crud: '/api/genomebrowser/crud',
      api: '/api/genomebrowser'
    },
    auth: {
      'request-token': '/auth/request-token'
    }
  };

  var token;
  // get a valid token
  var auth = new Auth(addresses, token);
  // get token for existing username and password
  token = await auth.requestToken('lego@lego.com', 'legolego');
  /*eslint-disable no-console*/
  console.info('your new token: ' + token);
  /*eslint-enable no-console*/
  var gb = new GenomeBrowser(addresses, token);
  var crud = new GbCrud(addresses, token);

  var genome = await crud.query('genome')
                         .filter('name', 'Homo sapiens')
                         .read();
  genome = genome[0];
  var gene = await crud.query('gene')
                       .setRaw('expand', [['coordinates', 'chromosome']])
                       .filter({
                         'name': 'INA',
                         coordinates:{
                           chromosome:{
                             'genome_id': genome.id
                           }
                         }
                       }).read();
  gene = gene[0];
  var sequence = {
    chr: gene.coordinates.chromosome.id,
    genome: genome.id,
    start: 200000,
    end: 204000
  };

  gb.getGene(gene).then(response => {
    /*eslint-disable no-console*/
    console.info('gene INA from human', response);
    /*eslint-enable no-console*/
  });
  gb.getSequence(sequence).then(response => {
    /*eslint-disable no-console*/
    console.info('a sequence from', sequence, response);
    /*eslint-enable no-console*/
  });
}
