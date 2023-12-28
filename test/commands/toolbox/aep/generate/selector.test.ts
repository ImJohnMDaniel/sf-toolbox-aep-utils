import { TestContext } from '@salesforce/core/lib/testSetup.js';
import { expect } from 'chai';
import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
import ToolboxAepGenerateSelector from '../../../../../src/commands/toolbox/aep/generate/selector.js';

describe('toolbox aep generate selector', () => {
  const $$ = new TestContext();
  let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(() => {
    sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  });

  afterEach(() => {
    $$.restore();
  });

  it('runs toolbox aep generate selector', async () => {
    await ToolboxAepGenerateSelector.run(['--target-org', 'bluefish']);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('var'); // why does it show /var/folders/th/tkh1fkm90v34nrl6hcl2  ????
  });
});
