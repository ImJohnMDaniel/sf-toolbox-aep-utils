import { Messages } from '@salesforce/core';
import { Flags } from '@salesforce/sf-plugins-core';

Messages.importMessagesDirectoryFromMetaUrl(import.meta.url);
const messages = Messages.loadMessages('@dx-cli-toolbox/sf-toolbox-aep-utils', 'toolbox.aep.generate.flagrelated');

export const at4dx = Flags.boolean({
  summary: messages.getMessage('flags.at4dx.summary'),
  description: messages.getMessage('flags.at4dx.description'),
  exactlyOne: ['at4dx', 'fflib'],
});

export const fflib = Flags.boolean({
  summary: messages.getMessage('flags.fflib.summary'),
  description: messages.getMessage('flags.fflib.description'),
  exactlyOne: ['at4dx', 'fflib'],
});

export const sobject = Flags.string({
  summary: messages.getMessage('flags.sobject.summary'),
  description: messages.getMessage('flags.sobject.description'),
  char: 's',
  required: true,
});

export const className = Flags.string({
  summary: messages.getMessage('flags.class-name.summary'),
  description: messages.getMessage('flags.class-name.description'),
  char: 'c',
  required: true,
});

export const sobjectSelectorClassName = Flags.string({
  summary: messages.getMessage('flags.sobject-selector-class-name.summary'),
  description: messages.getMessage('flags.sobject-selector-class-name.description'),
  char: 'c',
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

// flags specific to the UnitOfWork command
export const uowSpecificFlags = {
  'binding-sequence': uowBindingSequence,
};

// flags that go with commands that require SObjects
export const sobjectRelatedFlags = {
  sobject,
  at4dx,
  fflib,
};

export const selectorMethodRelatedFlags = {
  sobject,
  'class-name': className,
  'sobject-selector-class-name': sobjectSelectorClassName,
};

// flags that go with all commands
export const baseGenerateRelatedFlags = {
  'output-path': outputPath,
  'api-version': apiVersion,
  prefix,
};

// flags that go with command requiring an org
export const orgRelatedFlags = {
  'target-org': targetOrg,
};
