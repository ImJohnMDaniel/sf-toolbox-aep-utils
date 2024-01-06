/* eslint-disable sf-plugin/no-missing-messages */
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { DescribeSObjectResult } from 'jsforce';
// import { template, templateSettings } from 'dot';
import pkg from 'dot';
import { Messages, SfProject } from '@salesforce/core';
import {
  // apexMetadataSource,
  selectorTemplates,
} from '../../../../templates/index.js';

import sObjectNames from '../../../../utils/sObjectNames.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { template, templateSettings } = pkg;

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
templateSettings.strip = false;

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

    // this.log('field.name,field.soapType,field.type,field.extraTypeInfo,field.externalId,field.idLookup,field.custom,field.filterable,field.groupable,field.nameField,field.permissionable,field.sortable,field.referenceTo,field.relationshipName,field.relationshipOrder');
    // describeResult.fields.forEach((field) => {
    //   // if (field.custom && field.soapType.includes(''))
    //   // this.log(`field.name == ${field.name}`);
    //   // this.log(`field.soapType == ${field.soapType}`);
    //   // this.log(`field.type == ${field.type}`);
    //   // this.log(`field.extraTypeInfo == ${field.extraTypeInfo}`);
    //   // this.log(`field.externalId == ${field.externalId.toString()}`);
    //   // this.log(`field.idLookup == ${field.idLookup.toString()}`);
    //   // this.log(`field.custom == ${field.custom.toString()}`);
    //   // this.log(`field.filterable == ${field.filterable.toString()}`);
    //   // this.log(`field.groupable == ${field.groupable.toString()}`);
    //   // this.log(`field.nameField == ${field.nameField.toString()}`);
    //   // this.log(`field.permissionable == ${field.permissionable}`);
    //   // this.log(`field.sortable == ${field.sortable.toString()}`);
    //   // this.log(`field.referenceTo == ${field.referenceTo?.toString()}`);
    //   // this.log(`field.relationshipName == ${field.relationshipName}`);
    //   // this.log(`field.relationshipOrder == ${field.relationshipOrder}`);
    //   // this.log('');
    //   this.log(`${field.name},${field.soapType},${field.type},${field.extraTypeInfo},${field.externalId.toString()},${field.idLookup.toString()},${field.custom.toString()},${field.filterable.toString()},${field.groupable.toString()},${field.nameField.toString()},${field.permissionable},${field.sortable.toString()},${field.referenceTo?.toString()},${field.relationshipName},${field.relationshipOrder}`);
    // });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unused-vars
    const selectorClassTemplate = template(selectorTemplates.selectorClass);

    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const implementationClassContent = selectorClassTemplate({ sobj });

    this.log(`${implementationClassContent}`);

    return {
      // path: '/Users/john/workspace/_cli-related/sf-toolbox-aep-utils/src/commands/toolbox/aep/generate/selector.ts',
      path: `${basePath} `,
    };
  }
}
