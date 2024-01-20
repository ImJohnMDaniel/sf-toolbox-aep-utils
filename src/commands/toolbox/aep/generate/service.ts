import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import dotpkg from 'dot';
import gracefulfspkg from 'graceful-fs';
const { writeFile, mkdirSync } = gracefulfspkg;
import { Messages, SfProject } from '@salesforce/core';
import { apexMetadataSource, serviceTemplates } from '../../../../templates/index.js';
import { baseGenerateRelatedFlags } from '../../../../utils/flags.js';
import serviceNames from '../../../../utils/serviceNames.js';

const { template, templateSettings } = dotpkg;

templateSettings.strip = false;

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate.service');

export type ToolboxAepGenerateSelectorResult = {
  path: string;
};

export default class ToolboxAepGenerateSelector extends SfCommand<ToolboxAepGenerateSelectorResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    ...baseGenerateRelatedFlags,
    'service-basename': Flags.string({
      summary: messages.getMessage('flags.service-basename.summary'),
      description: messages.getMessage('flags.service-basename.description'),
      required: true,
    }),
  };

  public async run(): Promise<ToolboxAepGenerateSelectorResult> {
    const { flags } = await this.parse(ToolboxAepGenerateSelector);

    const basePath: string = await SfProject.resolveProjectPath();

    const apiVersion: string = flags['api-version'] ? flags['api-version'] : '59.0';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const logError = function (err: any): void {
      // eslint-disable-next-line no-console
      if (err) console.log(err);
      // eslint-disable-next-line no-console
      console.log('The file was saved!');
    };

    const svcNames: serviceNames = new serviceNames(flags['service-basename'], flags['prefix']);

    // ensure that all output path folders are created
    mkdirSync(`${basePath}/${flags['output-path']}/${serviceNames.getFilepathForMainServiceBinding()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${serviceNames.getFilepathForMainServiceClass()}`, {
      recursive: true,
    });
    mkdirSync(`${basePath}/${flags['output-path']}/${serviceNames.getFilepathForTestServiceClass()}`, {
      recursive: true,
    });

    // Setup Apex class metadata file template
    const apexMetadataTemplate = template(apexMetadataSource);
    const apexMetadataContent = apexMetadataTemplate({ apiVersion });

    // Write the service facade class to a file
    const serviceFacadeClassTemplate = template(serviceTemplates.serviceFacade);
    const facadeClassContent = serviceFacadeClassTemplate({ svcNames });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getFilenameForClass(
        svcNames.getServiceFacadeClassName()
      )}`,
      facadeClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getMetadataFilenameForClass(
        svcNames.getServiceFacadeClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the service interface to a file
    const serviceInterfaceTemplate = template(serviceTemplates.serviceInterface);
    const interfaceClassContent = serviceInterfaceTemplate({ svcNames });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getFilenameForClass(
        svcNames.getServiceInterfaceClassName()
      )}`,
      interfaceClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getMetadataFilenameForClass(
        svcNames.getServiceInterfaceClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the service implementation to a file
    const serviceImplementationTemplate = template(serviceTemplates.serviceImpl);
    const implementationClassContent = serviceImplementationTemplate({ svcNames });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getFilenameForClass(
        svcNames.getServiceImplementationClassName()
      )}`,
      implementationClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getMetadataFilenameForClass(
        svcNames.getServiceImplementationClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the service exception to a file
    const serviceExceptionTemplate = template(serviceTemplates.serviceException);
    const exceptionClassContent = serviceExceptionTemplate({ svcNames });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getFilenameForClass(
        svcNames.getServiceExceptionClassName()
      )}`,
      exceptionClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceClass()}/${serviceNames.getMetadataFilenameForClass(
        svcNames.getServiceExceptionClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the service unit test to a file
    const serviceUnitTestTemplate = template(serviceTemplates.serviceUnitTest);
    const unitTestClassContent = serviceUnitTestTemplate({ svcNames });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForTestServiceClass()}/${serviceNames.getFilenameForClass(
        svcNames.getServiceUnitTestClassName()
      )}`,
      unitTestClassContent,
      logError
    );
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForTestServiceClass()}/${serviceNames.getMetadataFilenameForClass(
        svcNames.getServiceUnitTestClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the AT4DX ApplicationFactory_SelectorBinding file
    const selectorBindingTemplate = template(serviceTemplates.serviceBinding);
    const selectorBindingContent = selectorBindingTemplate({ svcNames });
    writeFile(
      `${basePath}/${
        flags['output-path']
      }/${serviceNames.getFilepathForMainServiceBinding()}/${svcNames.getMetadataFilenameForAT4DXServiceBinding()}`,
      selectorBindingContent,
      logError
    );

    return {
      path: `${basePath} `,
    };
  }
}
