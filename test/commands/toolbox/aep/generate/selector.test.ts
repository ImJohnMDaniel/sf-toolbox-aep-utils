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

  it('runs hello', async () => {
    await ToolboxAepGenerateSelector.run([]);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello world');
  });

  it('runs hello with --json and no provided name', async () => {
    const result = await ToolboxAepGenerateSelector.run([]);
    expect(result.path).to.equal(
      '/Users/john/workspace/_cli-related/sf-toolbox-aep-utils/src/commands/toolbox/aep/generate/selector.ts'
    );
  });

  it('runs hello world --name Astro', async () => {
    await ToolboxAepGenerateSelector.run(['--name', 'Astro']);
    const output = sfCommandStubs.log
      .getCalls()
      .flatMap((c) => c.args)
      .join('\n');
    expect(output).to.include('hello Astro');
  });
});
