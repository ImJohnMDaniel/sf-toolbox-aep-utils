import { MockTestOrgData, TestContext } from '@salesforce/core/lib/testSetup.js';
import { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import sinon from 'sinon';
import { stubSfCommandUx } from '@salesforce/sf-plugins-core';
import ToolboxAepGenerateSelector from '../../../../../src/commands/toolbox/aep/generate/selector.js';

describe('toolbox aep generate selector', () => {
  const $$ = new TestContext();
  const testOrg = new MockTestOrgData();
  testOrg.isScratchOrg = true;
  let sfCommandStubs: ReturnType<typeof stubSfCommandUx>;

  beforeEach(async () => {
    await $$.stubAuths(testOrg);
    await $$.stubConfig({ 'target-org': testOrg.username });
    sfCommandStubs = stubSfCommandUx($$.SANDBOX);
  });

  afterEach(() => {
    $$.restore();
  });

  it('runs toolbox aep generate selector', async () => {
    await ToolboxAepGenerateSelector.run(['--sobject', 'Account']);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('var'); // TODO: why does it show /var/folders/th/tkh1fkm90v34nrl6hcl2  ????
  });
});
