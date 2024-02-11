import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages, Org } from '@salesforce/core';
import {
  orgRelatedFlags,
  baseGenerateRelatedFlags,
  sobjectRelatedFlags,
  uowSpecificFlags,
} from '../../../utils/flags.js';
import ToolboxAepGenerateUnitOfWork from './generate/unitofwork.js';
import ToolboxAepGenerateSelector from './generate/selector.js';
import ToolboxAepGenerateDomain from './generate/domain.js';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate');

export type ToolboxAepGenerateResult = {
  filesCreated: string[];
};

export const toolboxAepGenerateCommandSpecficFlags = {
  selector: Flags.boolean({
    char: 'r',
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

    this.debug('selector flag: ' + flags['selector']);
    this.debug('domain flag: ' + flags['domain']);
    this.debug('unit-of-work flag: ' + flags['unit-of-work']);

    const flagsArray: string[] = [];

    const keysToExclude: string[] = Object.keys(toolboxAepGenerateCommandSpecficFlags);

    const theTargetOrg: Org = flags['target-org'];

    this.debug(theTargetOrg.getUsername());
    Object.keys(flags).forEach((element) => {
      if (!keysToExclude.includes(element)) {
        flagsArray.push('--' + element);
        if (flags[element] instanceof Org) {
          const theOrg = flags[element] as Org;
          flagsArray.push(theOrg.getUsername()!);
        } else if (
          flags[element] &&
          // Don't push the value of a boolean.
          // A boolean flag is only true if the flag itself is pushed.
          // The implicit value of "true" does not need to be pushed to the flagsArray.
          !(flags[element] === true)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          flagsArray.push(flags[element]);
        }
      }
    });

    this.debug('flagsArray: ' + flagsArray.toString());

    if (flags['unit-of-work']) {
      // await this.config.runCommand('toolbox aep generate unitofwork', flagsArray);
      await ToolboxAepGenerateUnitOfWork.run(flagsArray);
    }

    if (flags['selector']) {
      await ToolboxAepGenerateSelector.run(flagsArray);
    }

    if (flags['domain']) {
      await ToolboxAepGenerateDomain.run(flagsArray);
    }

    return {
      filesCreated: [] as string[],
    };
  }
}
