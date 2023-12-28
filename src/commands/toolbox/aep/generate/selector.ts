import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// import { ConfigAggregator, Messages, Org, SfError, SfProject } from '@salesforce/core';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import {
  Messages,
  // Org,
  SfProject,
} from '@salesforce/core';

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

    // const result: DescribeSObjectResult = await conn.describe(this.args.sObjectName);
    // const sobj: sObject = new sObject(result);

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
