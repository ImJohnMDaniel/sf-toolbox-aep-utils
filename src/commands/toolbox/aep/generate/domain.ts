import { SfCommand } from '@salesforce/sf-plugins-core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DescribeSObjectResult } from 'jsforce';
import dotpkg from 'dot';
import gracefulfspkg from 'graceful-fs';
const { writeFile, mkdirSync } = gracefulfspkg;
import { Messages, SfProject } from '@salesforce/core';
import { apexMetadataSource, domainTemplates, triggerMetadataSource } from '../../../../templates/index.js';
import { orgRelatedFlags, baseGenerateRelatedFlags, sobjectRelatedFlags } from '../../../../utils/flags.js';
import sObjectNames from '../../../../utils/sObjectNames.js';

const { template, templateSettings } = dotpkg;

templateSettings.strip = false;

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate.domain');

export type ToolboxAepGenerateDomainResult = {
  path: string;
};

export default class ToolboxAepGenerateDomain extends SfCommand<ToolboxAepGenerateDomainResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    ...orgRelatedFlags,
    ...baseGenerateRelatedFlags,
    ...sobjectRelatedFlags,
  };

  public async run(): Promise<ToolboxAepGenerateDomainResult> {
    const { flags } = await this.parse(ToolboxAepGenerateDomain);

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
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForMainDomainClass()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForTestDomainClass()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForMainDomainBinding()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${sObjectNames.getFilepathForMainTrigger()}`, { recursive: true });

    // Setup Apex class metadata file template
    const apiVersion = conn.getApiVersion();
    const apexMetadataTemplate = template(apexMetadataSource);
    const apexMetadataContent = apexMetadataTemplate({ apiVersion });

    // Write the domain class to a file
    const domainClassTemplate = template(domainTemplates.domainClass);
    const implementationClassContent = domainClassTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainDomainClass()}/${sObjectNames.getFilenameForClass(
        sobj.getDomainImplementationClassName()
      )}`,
      implementationClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainDomainClass()}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getDomainImplementationClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the domain interface to a file
    const domainInterfaceTemplate = template(domainTemplates.domainInterface);
    const interfaceClassContent = domainInterfaceTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainDomainClass()}/${sObjectNames.getFilenameForClass(
        sobj.getDomainInterfaceClassName()
      )}`,
      interfaceClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainDomainClass()}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getDomainInterfaceClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the domain unit test to a file
    const domainUnitTestTemplate = template(domainTemplates.domainUnitTest);
    const unitTestClassContent = domainUnitTestTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForTestDomainClass()}/${sObjectNames.getFilenameForClass(
        sobj.getDomainUnitTestClassName()
      )}`,
      unitTestClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForTestDomainClass()}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getDomainUnitTestClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the domain trigger to a file
    const domainTriggerTemplate = template(domainTemplates.domainTrigger);
    const domainTriggerContent = domainTriggerTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainTrigger()}/${sObjectNames.getFilenameForTrigger(
        sobj.getDomainImplementationClassName()
      )}`,
      domainTriggerContent,
      logError
    );
    const triggerMetadataTemplate = template(triggerMetadataSource);
    const triggerMetadataContent = triggerMetadataTemplate({ apiVersion });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainTrigger()}/${sObjectNames.getMetadataFilenameForTrigger(
        sobj.getDomainImplementationClassName()
      )}`,
      triggerMetadataContent,
      logError
    );

    // Write the AT4DX ApplicationFactory_DomainBinding file
    const domainBindingTemplate = template(domainTemplates.domainBinding);
    const domainBindingContent = domainBindingTemplate({ sobj });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${sObjectNames.getFilepathForMainDomainBinding()}/${sobj.getMetadataFilenameForAT4DXDomainBinding()}`,
      domainBindingContent,
      logError
    );

    return {
      path: `${basePath} `,
    };
  }
}
