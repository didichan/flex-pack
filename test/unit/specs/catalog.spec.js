/*global describe, it, expect*/
import Population from 'src/pages/population';
import {createTestInstance} from './test-utils';

describe('the population page', function(){

  var pop = createTestInstance(Population);

  it('prevents the user from registering invalid data', function(){
    pop.columns[0].input = 'aaa';

    var status = pop.isBadInput('name');

    expect(status).to.equal(true);
  });
});
