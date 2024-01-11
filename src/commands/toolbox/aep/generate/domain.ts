/* eslint-disable sf-plugin/no-missing-messages */
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { DescribeSObjectResult } from 'jsforce';
// import { template, templateSettings } from 'dot';
import dotpkg from 'dot';
// import { writeFile } from 'graceful-fs';
import gracefulfspkg from 'graceful-fs';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { writeFile } = gracefulfspkg;
import { Messages, SfProject } from '@salesforce/core';
import { apexMetadataSource, domainTemplates } from '../../../../templates/index.js';

import sObjectNames from '../../../../utils/sObjectNames.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { template, templateSettings } = dotpkg;

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
templateSettings.strip = false;

// Messages.importMessagesDirectory(dirname(fileURLToPath(import.meta.url)));
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
      exists: true,
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

  public async run(): Promise<ToolboxAepGenerateDomainResult> {
    const { flags } = await this.parse(ToolboxAepGenerateDomain);

    const basePath: string = await SfProject.resolveProjectPath();

    // eslint-disable-next-line no-console, @typescript-eslint/explicit-function-return-type
    // const logError = (err: Error) => err ? console.log(err) : null;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // const logError = (err: SfError) => this.error(err);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const logError = function (err: any): void {
      // eslint-disable-next-line no-console
      if (err) console.log(err);
      // eslint-disable-next-line no-console
      console.log('The file was saved!');
    };

    // this.log(
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //   `flags == ${flags['target-org'].getUsername()}`
    // );

    await flags['target-org'].refreshAuth();
    // this.log(`FLAG "api-version": ${flags['api-version']}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const conn = flags['target-org'].getConnection(flags['api-version']);

    // const result: DescribeSObjectResult = await conn.describe(this.args.sObjectName);
    const describeResult: DescribeSObjectResult = await conn.describeSObject(flags['sobject']);
    // this.log(`name: ${describeResult.name}`);
    // this.log(`label: ${describeResult.label}`);
    // this.log(`labelPlural: ${describeResult.labelPlural}`);
    // this.log(`keyPrefix: ${describeResult.keyPrefix}`);
    // this.log('THIS FAR');

    const sobj: sObjectNames = new sObjectNames(describeResult, flags['prefix']);
    // this.log(sobj.diagnosticReport());

    // Setup Apex class metadata file template
    const apiVersion = conn.getApiVersion();
    const apexMetadataTemplate = template(apexMetadataSource);
    const apexMetadataContent = apexMetadataTemplate({ apiVersion });

    // Write the domain class to a file
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
    const domainClassTemplate = template(domainTemplates.domainClass);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const implementationClassContent = domainClassTemplate({ sobj });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${flags['output-path']}/${sObjectNames.getFilenameForClass(
        sobj.getDomainImplementationClassName()
      )}`,
      implementationClassContent,
      logError
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${flags['output-path']}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getDomainImplementationClassName()
      )}`,
      apexMetadataContent,
      logError
    );
    // this.log(`${implementationClassContent}`);

    // Write the domain interface to a file
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
    const domainInterfaceTemplate = template(domainTemplates.domainInterface);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const interfaceClassContent = domainInterfaceTemplate({ sobj });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${flags['output-path']}/${sObjectNames.getFilenameForClass(sobj.getDomainInterfaceClassName())}`,
      interfaceClassContent,
      logError
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${flags['output-path']}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getDomainInterfaceClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the domain unit test to a file
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
    const domainUnitTestTemplate = template(domainTemplates.domainUnitTest);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const unitTestClassContent = domainUnitTestTemplate({ sobj });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${flags['output-path']}/${sObjectNames.getFilenameForClass(sobj.getDomainUnitTestClassName())}`,
      unitTestClassContent,
      logError
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${flags['output-path']}/${sObjectNames.getMetadataFilenameForClass(
        sobj.getDomainUnitTestClassName()
      )}`,
      apexMetadataContent,
      logError
    );

    // Write the AT4DX ApplicationFactory_DomainBinding file
    const domainBindingTemplate = template(domainTemplates.domainBinding);
    const domainBindingContent = domainBindingTemplate({ sobj });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    writeFile(
      `${basePath}/${flags['output-path']}/${sobj.getMetadataFilenameForAT4DXDomainBinding()}`,
      domainBindingContent,
      logError
    );

    return {
      path: `${basePath} `,
    };
  }
}
