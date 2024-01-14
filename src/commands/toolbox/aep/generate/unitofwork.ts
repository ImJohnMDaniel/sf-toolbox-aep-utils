import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { DescribeSObjectResult } from 'jsforce';
import dotpkg from 'dot';
import gracefulfspkg from 'graceful-fs';
const { writeFile, mkdirSync } = gracefulfspkg;
import { Messages, SfProject } from '@salesforce/core';
import { unitOfWorkTemplates } from '../../../../templates/index.js';

import sObjectNames from '../../../../utils/sObjectNames.js';

const { template, templateSettings } = dotpkg;

templateSettings.strip = false;

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate.unitofwork');

export type ToolboxAepGenerateUnitOfWorkResult = {
  path: string;
};

export default class ToolboxAepGenerateUnitOfWork extends SfCommand<ToolboxAepGenerateUnitOfWorkResult> {
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
    'output-path': Flags.directory({
      exists: true,
      // eslint-disable-next-line sf-plugin/no-hardcoded-messages-flags
      summary: 'The output path to deposit the files',
      char: 'p',
      required: false,
    }),
    prefix: Flags.string({
      // eslint-disable-next-line sf-plugin/no-hardcoded-messages-flags
      summary: 'The prefix to create the files with.',
      required: false,
    }),
    'binding-sequence': Flags.string({
      char: 'b',
      required: false,
      // eslint-disable-next-line sf-plugin/no-hardcoded-messages-flags
      summary: 'The Unit Of Work Binding Sequence',
    }),
    'api-version': Flags.orgApiVersion({
      char: 'a',
      summary: messages.getMessage('flags.api-version.summary'),
      description: messages.getMessage('flags.api-version.description'),
    }),
  };

  public async run(): Promise<ToolboxAepGenerateUnitOfWorkResult> {
    const { flags } = await this.parse(ToolboxAepGenerateUnitOfWork);

    const basePath: string = await SfProject.resolveProjectPath();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const logError = function (err: any): void {
      // eslint-disable-next-line no-console
      if (err) console.log(err);
      // eslint-disable-next-line no-console
      console.log('The file was saved!');
    };

    await flags['target-org'].refreshAuth();

    const conn = flags['target-org'].getConnection(flags['api-version']);

    const describeResult: DescribeSObjectResult = await conn.describeSObject(flags['sobject']);

    const sobj: sObjectNames = new sObjectNames(describeResult, flags['prefix']);

    if (flags['binding-sequence']) {
      sobj.setUnitOfWorkBindingSequence(flags['binding-sequence']);
    }

    // ensure that all output path folders are created
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForMainUnitOfWorkBinding()}`, {
      recursive: true,
    });

    // Write the AT4DX ApplicationFactory_UnitOfWorkBinding file
    const unitOfWorkBindingTemplate = template(unitOfWorkTemplates.unitOfWorkBinding);
    const unitOfWorkBindingContent = unitOfWorkBindingTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainUnitOfWorkBinding()}/${sobj.getMetadataFilenameForAT4DXUnitOfWorkBinding()}`,
      unitOfWorkBindingContent,
      logError
    );

    return {
      path: `${basePath} `,
    };
  }
}
