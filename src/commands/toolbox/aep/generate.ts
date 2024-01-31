import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Org } from '@salesforce/core';
import {
  orgRelatedFlags,
  baseGenerateRelatedFlags,
  sobjectRelatedFlags,
  uowSpecificFlags,
} from '../../../utils/flags.js';
// import ToolboxAepGenerateUnitOfWork from './generate/unitofwork.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate');

export type ToolboxAepGenerateResult = {
  filesCreated: string[];
};

export const toolboxAepGenerateCommandSpecficFlags = {
  selector: Flags.boolean({
    char: 's',
    required: false,
    summary: messages.getMessage('flags.selector.summary'),
    description: messages.getMessage('flags.selector.description'),
    default: false,
  }),
  domain: Flags.boolean({
    char: 'd',
    required: false,
    summary: messages.getMessage('flags.domain.summary'),
    description: messages.getMessage('flags.domain.description'),
    default: false,
  }),
  'unit-of-work': Flags.boolean({
    char: 'u',
    required: false,
    summary: messages.getMessage('flags.unitofwork.summary'),
    description: messages.getMessage('flags.unitofwork.description'),
    default: false,
  }),
};

export default class ToolboxAepGenerate extends SfCommand<ToolboxAepGenerateResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    ...orgRelatedFlags,
    ...baseGenerateRelatedFlags,
    ...sobjectRelatedFlags,
    ...uowSpecificFlags,
    ...toolboxAepGenerateCommandSpecficFlags,
  };

  public async run(): Promise<ToolboxAepGenerateResult> {
    const { flags } = await this.parse(ToolboxAepGenerate);

    this.log('selector flag: ' + flags['selector']);
    this.log('domain flag: ' + flags['domain']);
    this.log('unit-of-work flag: ' + flags['unit-of-work']);
    // await this.config.runCommand('do:stuff', ['--flag1', '--flag2'])

    const flagsArray: string[] = [];

    const keysToExclude: string[] = Object.keys(toolboxAepGenerateCommandSpecficFlags);

    const theTargetOrg: Org = flags['target-org'];

    this.log(theTargetOrg.getUsername());
    Object.keys(flags).forEach((element) => {
      if (!keysToExclude.includes(element)) {
        flagsArray.push('--' + element);
        if (flags[element] instanceof Org) {
          const theOrg = flags[element] as Org;
          flagsArray.push(theOrg.getUsername()!);
        } else if (flags[element]) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          flagsArray.push(flags[element]);
        }
      }
    });

    this.log('flagsArray: ' + flagsArray.toString());

    if (flags['unit-of-work']) {
      // await this.config.runCommand('toolbox aep generate unitofwork', flagsArray);
      // await ToolboxAepGenerateUnitOfWork.run(flagsArray);
    }

    return {
      filesCreated: [] as string[],
    };
  }
}
