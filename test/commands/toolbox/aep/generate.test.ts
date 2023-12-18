import { TestContext } from '@salesforce/core/lib/testSetup.js';
// import { expect } from 'chai';
// import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
import Generate from '../../../../src/commands/toolbox/aep/generate.js';

describe('toolbox aep generate', () => {
  const $$ = new TestContext();
  // let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  // beforeEach(() => {
  //   sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  // });

  afterEach(() => {
    $$.restore();
  });

  it('runs toolbox aep generate', async () => {
    // const result = await Generate.run(['--name', 'Astro', '--json']);
    // expect(result.name).to.equal('Astro');
    await Generate.run(['--name', 'Astro', '--json']);
  });
});
