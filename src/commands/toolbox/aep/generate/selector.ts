/* eslint-disable sf-plugin/no-missing-messages */
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { DescribeSObjectResult } from 'jsforce';
// import { ConfigAggregator, Messages, Org, SfError, SfProject } from '@salesforce/core';
import { Messages, SfProject } from '@salesforce/core';
import sObjectNames from '../../../../utils/sObjectNames.js';

Messages.importMessagesDirectory(dirname(fileURLToPath(import.meta.url)));
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate.selector');

export type ToolboxAepGenerateSelectorResult = {
  path: string;
};

export default class ToolboxAepGenerateSelector extends SfCommand<ToolboxAepGenerateSelectorResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    'target-org': Flags.requiredOrg({
      summary: messages.getMessage('flags.target-org.summary'),
      description: messages.getMessage('flags.target-org.description'),
      char: 'o',
      required: true,
    }),
    sobject: Flags.string({
      summary: messages.getMessage('flags.sobject.summary'),
      description: messages.getMessage('flags.sobject.description'),
      char: 's',
      required: true,
    }),
  };

  public async run(): Promise<ToolboxAepGenerateSelectorResult> {
    const { flags } = await this.parse(ToolboxAepGenerateSelector);

    // const name = flags.name ?? 'world'; // this is the default for the command flag "name"

    // resolve the project
    // const project: SfProject = await SfProject.resolve();
    // const projectJson = await project.resolveProjectConfig();
    // get the project's basePath
    // const basePath: string = SfProject.resolveProjectPathSync();
    const basePath: string = await SfProject.resolveProjectPath();

    this.log(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      `flags == ${flags['target-org'].getUsername()}`
    );
    // const conn = this.org.getConnection();
    // const org = await Org.create({ aliasOrUsername: opts['target-org'] });

    this.debug('DEBUG looking for already installed packages');
    await flags['target-org'].refreshAuth();
    this.log(`FLAG "api-version": ${flags['api-version']}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const conn = flags['target-org'].getConnection(flags['api-version']);

    // const result: DescribeSObjectResult = await conn.describe(this.args.sObjectName);
    const describeResult: DescribeSObjectResult = await conn.describeSObject(flags['sobject']);
    this.log(`name: ${describeResult.name}`);
    this.log(`label: ${describeResult.label}`);
    this.log(`labelPlural: ${describeResult.labelPlural}`);
    this.log(`keyPrefix: ${describeResult.keyPrefix}`);
    this.log('THIS FAR');

    const sobj: sObjectNames = new sObjectNames(describeResult, 'foobar');

    this.log(sobj.diagnosticReport());

    // if (!project) {
    //   throw new SfdxError(messages.getMessage('errorNoSfdxProject'));
    // }

    // const conn = this.org.getConnection();
    // const result: DescribeSObjectResult = await conn.describe(this.args.sObjectName);

    // const sobj: sObject = new sObject(result);

    this.log(
      //   `hello ${ name } from / Users / john / workspace / _cli - related / sf - toolbox - aep - utils / src / commands / toolbox / aep / generate / selector.ts`
      `basePath == ${basePath} `
    );
    return {
      // path: '/Users/john/workspace/_cli-related/sf-toolbox-aep-utils/src/commands/toolbox/aep/generate/selector.ts',
      path: `${basePath} `,
    };
  }
}
