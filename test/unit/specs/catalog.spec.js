/*global describe, it, expect*/
import Population from 'src/pages/population';
import {createTestInstance} from './test-utils';

describe('the population page', function(){

  var pop = createTestInstance(Population);

  it('prevents the user from registering invalid data', function(){
    pop.columns[0].input = 'aaa';
    pop.columns[2].input = 'bad@email';

    var status1 = pop.isBadInput('name');
    var status3 = pop.isBadInput('email');

    expect(status1).to.equal(true);
    expect(status3).to.equal(true);

    pop.columns[0].input = 'aaa456';
    pop.columns[2].input = 'good@email.com';

    status1 = pop.isBadInput('name');
    status3 = pop.isBadInput('email');

    expect(status1).to.equal(false);
    expect(status3).to.equal(false);
  });
});
