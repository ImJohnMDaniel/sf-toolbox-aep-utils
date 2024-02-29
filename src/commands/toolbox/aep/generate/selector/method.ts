import { SfCommand } from '@salesforce/sf-plugins-core';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { DescribeSObjectResult } from 'jsforce';
import dotpkg from 'dot';
import gracefulfspkg from 'graceful-fs';
const { writeFile, mkdirSync } = gracefulfspkg;
import { Messages, SfProject } from '@salesforce/core';
import { apexMetadataSource, selectorTemplates } from '../../../../../templates/index.js';
import { baseGenerateRelatedFlags, selectorMethodRelatedFlags } from '../../../../../utils/flags.js';
import selectorMethodNames from '../../../../../utils/selectorMethodNames.js';
import filepathNames from '../../../../../utils/filepathNames.js';

const { template, templateSettings } = dotpkg;

templateSettings.strip = false;

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate.selector.method');

export type ToolboxAepGenerateSelectorMethodResult = {
  path: string;
};

export default class ToolboxAepGenerateSelectorMethod extends SfCommand<ToolboxAepGenerateSelectorMethodResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  // --sobject
  // --class-name
  // --sobject-selector-class-name == AccountsSelector
  // --prefix
  // --api-version
  // --output-path
  public static readonly flags = {
    ...selectorMethodRelatedFlags,
    ...baseGenerateRelatedFlags,
  };

  public async run(): Promise<ToolboxAepGenerateSelectorMethodResult> {
    const { flags } = await this.parse(ToolboxAepGenerateSelectorMethod);

    const basePath: string = await SfProject.resolveProjectPath();

    const apiVersion: string = flags['api-version'] ? flags['api-version'] : '60.0';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const logError = function (err: any): void {
      // eslint-disable-next-line no-console
      if (err) console.log(err);
      // eslint-disable-next-line no-console
      console.log('The file was saved!');
    };

    // const smn: selectorMethodNames = new selectorMethodNames(flags['class-name'], flags['sobject'], flags['sobject-selector-class-name'], flags['prefix']);
    const smn: selectorMethodNames = new selectorMethodNames(
      flags['class-name'],
      flags['sobject'],
      flags['sobject-selector-class-name']
    );

    // ensure that all output path folders are created
    mkdirSync(`${basePath}/${flags['output-path']}/${filepathNames.getFilepathForMainSelectorClass()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${filepathNames.getFilepathForTestSelectorClass()}`, {
      recursive: true,
    });

    // Setup Apex class metadata file template

    // --sobject
    // --class-name
    // --sobject-selector-class-name == AccountsSelector
    // --prefix
    // --api-version
    // --output-path

    // Write the selector method class metadata
    // Write the selector method test class
    // Write the selector method test metadata

    const apexMetadataTemplate = template(apexMetadataSource);
    const apexMetadataContent = apexMetadataTemplate({ apiVersion });

    // Write the selector method class
    const selectorMethodClassTemplate = template(selectorTemplates.selectorAT4DXMethodInjectionClass);
    const selectorMethodClassContent = selectorMethodClassTemplate({ smn });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${filepathNames.getFilepathForMainSelectorClass()}/${selectorMethodNames.getFilenameForClass(
        smn.getSelectorMethodInjectionClassName()
      )}`,
      selectorMethodClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${filepathNames.getFilepathForMainSelectorClass()}/${selectorMethodNames.getMetadataFilenameForClass(
        smn.getSelectorMethodInjectionClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the selector unit test to a file
    const selectorMethodUnitTestTemplate = template(selectorTemplates.selectorAT4DXMethodInjectionUnitTest);
    const unitTestClassContent = selectorMethodUnitTestTemplate({ smn });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${filepathNames.getFilepathForTestSelectorClass()}/${selectorMethodNames.getFilenameForClass(
        smn.getSelectorMethodInjectionUnitTestClassName()
      )}`,
      unitTestClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${filepathNames.getFilepathForTestSelectorClass()}/${selectorMethodNames.getMetadataFilenameForClass(
        smn.getSelectorMethodInjectionUnitTestClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    return {
      path: `${basePath} `,
    };
  }
}
