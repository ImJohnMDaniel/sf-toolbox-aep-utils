import { SfCommand } from '@salesforce/sf-plugins-core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DescribeSObjectResult } from 'jsforce';
import dotpkg from 'dot';
import gracefulfspkg from 'graceful-fs';
const { writeFile, mkdirSync } = gracefulfspkg;
import { Messages, SfProject } from '@salesforce/core';
import { unitOfWorkTemplates } from '../../../../templates/index.js';
import {
  orgRelatedFlags,
  baseGenerateRelatedFlags,
  sobjectRelatedFlags,
  uowSpecificFlags,
} from '../../../../utils/flags.js';
import sObjectNames from '../../../../utils/sObjectNames.js';
import filepathNames from '../../../../utils/filepathNames.js';

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
    ...orgRelatedFlags,
    ...baseGenerateRelatedFlags,
    ...sobjectRelatedFlags,
    ...uowSpecificFlags,
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

    if (flags['at4dx']) {
      // ensure that all output path folders are created
      mkdirSync(`${basePath}/${flags['output-path']}/${filepathNames.getFilepathForMainUnitOfWorkBinding()}`, {
        recursive: true,
      });

      // Write the AT4DX ApplicationFactory_UnitOfWorkBinding file
      const unitOfWorkBindingTemplate = template(unitOfWorkTemplates.unitOfWorkBinding);
      const unitOfWorkBindingContent = unitOfWorkBindingTemplate({ sobj });
      writeFile(
        `${basePath}/${
          flags['output-path']
        }/${filepathNames.getFilepathForMainUnitOfWorkBinding()}/${sobj.getMetadataFilenameForAT4DXUnitOfWorkBinding()}`,
        unitOfWorkBindingContent,
        logError
      );
    } else {
      this.log(
        '\n\nPlease add the following binding to the Application.cls; specifically the fflib_Application.UnitOfWorkFactory entry.'
      );
      this.log(`    ${sobj.getApiName()}.SObjectType`);
    }

    return {
      path: `${basePath} `,
    };
  }
}
