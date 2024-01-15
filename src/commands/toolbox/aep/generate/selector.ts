import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DescribeSObjectResult } from 'jsforce';
import dotpkg from 'dot';
import gracefulfspkg from 'graceful-fs';
const { writeFile, mkdirSync } = gracefulfspkg;
import { Messages, SfProject } from '@salesforce/core';
import { apexMetadataSource, selectorTemplates } from '../../../../templates/index.js';

import sObjectNames from '../../../../utils/sObjectNames.js';

const { template, templateSettings } = dotpkg;

templateSettings.strip = false;

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
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
    'api-version': Flags.orgApiVersion({
      char: 'a',
      summary: messages.getMessage('flags.api-version.summary'),
      description: messages.getMessage('flags.api-version.description'),
    }),
  };

  public async run(): Promise<ToolboxAepGenerateSelectorResult> {
    const { flags } = await this.parse(ToolboxAepGenerateSelector);

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

    // ensure that all output path folders are created
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForMainSelectorClass()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForTestSelectorClass()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForMainSelectorBinding()}`, {
      recursive: true,
    });

    // Setup Apex class metadata file template
    const apiVersion = conn.getApiVersion();
    const apexMetadataTemplate = template(apexMetadataSource);
    const apexMetadataContent = apexMetadataTemplate({ apiVersion });

    // Write the selector class to a file
    const selectorClassTemplate = template(selectorTemplates.selectorClass);
    const implementationClassContent = selectorClassTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainSelectorClass()}/${sObjectNames.getFilenameForClass(
        sobj.getSelectorImplementationClassName()
      )}`,
      implementationClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainSelectorClass()}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getSelectorImplementationClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the selector interface to a file
    const selectorInterfaceTemplate = template(selectorTemplates.selectorInterface);
    const interfaceClassContent = selectorInterfaceTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainSelectorClass()}/${sObjectNames.getFilenameForClass(
        sobj.getSelectorInterfaceClassName()
      )}`,
      interfaceClassContent,
      logError
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainSelectorClass()}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getSelectorInterfaceClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the selector unit test to a file
    const selectorUnitTestTemplate = template(selectorTemplates.selectorUnitTest);
    const unitTestClassContent = selectorUnitTestTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForTestSelectorClass()}/${sObjectNames.getFilenameForClass(
        sobj.getSelectorUnitTestClassName()
      )}`,
      unitTestClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForTestSelectorClass()}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getSelectorUnitTestClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the AT4DX ApplicationFactory_SelectorBinding file
    const selectorBindingTemplate = template(selectorTemplates.selectorBinding);
    const selectorBindingContent = selectorBindingTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainSelectorBinding()}/${sobj.getMetadataFilenameForAT4DXSelectorBinding()}`,
      selectorBindingContent,
      logError
    );

    return {
      path: `${basePath} `,
    };
  }
}
