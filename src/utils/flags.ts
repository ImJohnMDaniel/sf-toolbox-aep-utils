import { Messages } from '@salesforce/core';
import { Flags } from '@salesforce/sf-plugins-core';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate.flagrelated');

export const sobject = Flags.string({
  summary: messages.getMessage('flags.sobject.summary'),
  description: messages.getMessage('flags.sobject.description'),
  char: 's',
  required: true,
});

export const outputPath = Flags.directory({
  exists: false,
  summary: messages.getMessage('flags.output-path.summary'),
  description: messages.getMessage('flags.output-path.description'),
  char: 'p',
  default: 'generated-files',
  required: false,
});

export const prefix = Flags.string({
  summary: messages.getMessage('flags.prefix.summary'),
  description: messages.getMessage('flags.prefix.description'),
  required: false,
});

export const targetOrg = Flags.requiredOrg({
  summary: messages.getMessage('flags.target-org.summary'),
  description: messages.getMessage('flags.target-org.description'),
  char: 'o',
  required: true,
});

export const apiVersion = Flags.orgApiVersion({
  char: 'a',
  summary: messages.getMessage('flags.api-version.summary'),
  description: messages.getMessage('flags.api-version.description'),
});

export const uowBindingSequence = Flags.string({
  char: 'b',
  required: false,
  summary: messages.getMessage('flags.binding-sequence.summary'),
  description: messages.getMessage('flags.binding-sequence.description'),
});

export const uowSpecificFlags = {
  'binding-sequence': uowBindingSequence,
};

export const sobjectRelatedFlags = {
  sobject,
};

export const baseGenerateRelatedFlags = {
  'output-path': outputPath,
  'api-version': apiVersion,
  prefix,
};

export const orgRelatedFlags = {
  'target-org': targetOrg,
};
