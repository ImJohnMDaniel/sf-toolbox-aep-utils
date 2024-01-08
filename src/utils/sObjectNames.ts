// import { string } from '@oclif/core/lib/args.js';
import { DescribeSObjectResult, Field } from 'jsforce';

const filenameExtensionForClass: string = '.cls';
const filenameExtensionForClassMetadata: string = '-meta.xml';

class sObjectNames {
  private sobjectDescribeResult: DescribeSObjectResult;
  private classPrefix!: string;
  private baseClassName: string;

  public constructor(sobjectDescribeResult: DescribeSObjectResult, classPrefix?: string) {
    this.sobjectDescribeResult = sobjectDescribeResult;
    if (classPrefix) {
      this.classPrefix = classPrefix.toLocaleUpperCase() + '_';
    } else {
      this.classPrefix = '';
    }
    this.baseClassName = '';
    this.initializeBaseName();
  }

  public static getFilenameForClass(className: string): string {
    return className + filenameExtensionForClass;
  }

  public static getMetadataFilenameForClass(className: string): string {
    return sObjectNames.getFilenameForClass(className) + filenameExtensionForClassMetadata;
  }

  private static cleanUpClassName(className: string): string {
    return className
      .replace('__c', '') // remove the typical "__c" present in custom SObject API names
      .replace('_', ''); // remove any underscores present in the custom SObject API name
  }

  // eslint-disable-next-line complexity
  private static getPluralFormOfWord(word: string): string {
    if (word.endsWith('bus')) {
      word = word + 'ses';
    } else if (word.endsWith('fez')) {
      // #3
      word = word + 'zes';
    } else if (word.endsWith('o')) {
      // #7
      word = word + 'es';
    } else if (word.endsWith('us')) {
      // #8
      word = sObjectNames.replaceLastOccurance(word, 'us', 'i');
    } else if (word.endsWith('is')) {
      // #9
      word = sObjectNames.replaceLastOccurance(word, 'is', 'es');
    } else if (word.endsWith('on')) {
      // #9
      word = sObjectNames.replaceLastOccurance(word, 'on', 'a');
    } else if (
      word.endsWith('ef') || // #4
      word.endsWith('f')
    ) {
      word = word + 's';
    } else if (
      word.endsWith('s') || // #2
      word.endsWith('ss') ||
      word.endsWith('sh') ||
      word.endsWith('ch') ||
      word.endsWith('x') ||
      word.endsWith('z')
    ) {
      word = word + 'es';
    } else if (word.endsWith('y')) {
      // #5 & #6
      // Is the letter before the "y" a noun or a consonant?
      // const last = word.lastIndexOf('y');
      // // eslint-disable-next-line no-console
      // console.log(`last: ${last}`);
      const wordChunk = `${word.substring(0, word.length - 1)}`;
      // // eslint-disable-next-line no-console
      // console.log(`wordChunk: ${wordChunk}`);
      const previousLetter = wordChunk.substring(wordChunk.length - 1, wordChunk.length);
      // // eslint-disable-next-line no-console
      // console.log(`previousLetter: ${previousLetter}`);
      if (
        previousLetter.toLocaleLowerCase() === 'a' ||
        previousLetter.toLocaleLowerCase() === 'e' ||
        previousLetter.toLocaleLowerCase() === 'i' ||
        previousLetter.toLocaleLowerCase() === 'o' ||
        previousLetter.toLocaleLowerCase() === 'u'
      ) {
        // #6 requires that the letter before the "y" be a vowel
        word = word + 's';
      } else {
        // #5 also requires that the letter before the "y" be a consonant
        word = sObjectNames.replaceLastOccurance(word, 'y', 'ies');
      }
    } else {
      word = word + 's';
    }
    return word;
  }

  private static replaceLastOccurance(str: string, pattern: string, replacement: string): string {
    const last = str.lastIndexOf(pattern);

    return last !== -1 ? `${str.slice(0, last)}${replacement}${str.slice(last + pattern.length)}` : str;
  }

  private static fieldShouldBeIncluded(currentField: Field): boolean {
    // get the default fields
    // remove IsDeleted fields
    // remove field.type == textarea
    // remove field.filterable == false
    if (
      currentField.name.toLocaleLowerCase() === 'isdeleted' ||
      currentField.type === 'textarea' ||
      currentField.filterable === false
    ) {
      return false;
    }

    return true;
  }
  public diagnosticReport(): string {
    return (
      'getApiName(): ' +
      this.getApiName() +
      '\n' +
      'getBaseName(): ' +
      this.getBaseName() +
      '\n' +
      'Selector Related\n' +
      '  getSelectorInterfaceClassName(): ' +
      this.getSelectorInterfaceClassName() +
      '\n' +
      '    getFilenameForSelectorInterfaceClassName(): ' +
      sObjectNames.getFilenameForClass(this.getSelectorInterfaceClassName()) +
      '\n' +
      '    getMetadataFilenameForSelectorInterfaceClassName(): ' +
      sObjectNames.getMetadataFilenameForClass(this.getSelectorInterfaceClassName()) +
      '\n' +
      '  getSelectorImplementationClassName(): ' +
      this.getSelectorImplementationClassName() +
      '\n' +
      '    getFilenameForSelectorImplementationClassName(): ' +
      sObjectNames.getFilenameForClass(this.getSelectorImplementationClassName()) +
      '\n' +
      '    getMetadataFilenameForSelectorImplementationClassName(): ' +
      sObjectNames.getMetadataFilenameForClass(this.getSelectorImplementationClassName()) +
      '\n' +
      '  getSelectorUnitTestClassName(): ' +
      this.getSelectorUnitTestClassName() +
      '\n' +
      '    getFilenameForSelectorUnitTestClassName(): ' +
      sObjectNames.getFilenameForClass(this.getSelectorUnitTestClassName()) +
      '\n' +
      '    getMetadataFilenameForSelectorUnitTestClassName(): ' +
      sObjectNames.getMetadataFilenameForClass(this.getSelectorUnitTestClassName()) +
      '\n' +
      '  getMetadataFilenameForAT4DXSelectorBinding(): ' +
      this.getMetadataFilenameForAT4DXSelectorBinding() +
      '\n' +
      'Domain Related\n' +
      '  getDomainInterfaceClassName(): ' +
      this.getDomainInterfaceClassName() +
      '\n' +
      '    getFilenameForDomainInterfaceClassName(): ' +
      sObjectNames.getFilenameForClass(this.getDomainInterfaceClassName()) +
      '\n' +
      '    getMetadataFilenameForDomainInterfaceClassName(): ' +
      sObjectNames.getMetadataFilenameForClass(this.getDomainInterfaceClassName()) +
      '\n' +
      '  getDomainImplementationClassName(): ' +
      this.getDomainImplementationClassName() +
      '\n' +
      '    getFilenameForDomainImplementationClassName(): ' +
      sObjectNames.getFilenameForClass(this.getDomainImplementationClassName()) +
      '\n' +
      '    getMetadataFilenameForDomainImplementationClassName(): ' +
      sObjectNames.getMetadataFilenameForClass(this.getDomainImplementationClassName()) +
      '\n' +
      '  getDomainUnitTestClassName(): ' +
      this.getDomainUnitTestClassName() +
      '\n' +
      '    getFilenameForDomainUnitTestClassName(): ' +
      sObjectNames.getFilenameForClass(this.getDomainUnitTestClassName()) +
      '\n' +
      '    getMetadataFilenameForDomainUnitTestClassName(): ' +
      sObjectNames.getMetadataFilenameForClass(this.getDomainUnitTestClassName()) +
      '\n' +
      '  getMetadataFilenameForAT4DXDomainBinding(): ' +
      this.getMetadataFilenameForAT4DXDomainBinding() +
      '\n'
    );
  }

  public getFields(): Field[] {
    return this.sobjectDescribeResult.fields;
  }

  // TODO: public getParentLookupFields(): string[]
  //     This will be used by the selector template to create the "selectByField()" methods

  public getFieldsForSObjectFieldList(): string[] {
    const fieldList: string[] = [];

    this.getFields().forEach((field, idx, array) => {
      if (sObjectNames.fieldShouldBeIncluded(field)) {
        if (idx + 1 === array.length) {
          fieldList.push(field.name);
        } else {
          fieldList.push(field.name + ',');
        }
      }
    });

    return fieldList;
  }

  public getApiName(): string {
    return this.sobjectDescribeResult.name;
  }

  public getSelectorInterfaceClassName(): string {
    return this.classPrefix + 'I' + this.getBaseSelectorName();
  }

  public getSelectorImplementationClassName(): string {
    return this.classPrefix + this.getBaseSelectorName();
  }

  public getSelectorUnitTestClassName(): string {
    return this.getSelectorImplementationClassName() + 'Test';
  }

  public getMetadataFilenameForAT4DXSelectorBinding(): string {
    return (
      'ApplicationFactory_SelectorBinding__mdt.' +
      sObjectNames.cleanUpClassName(this.getApiName()) +
      'SObjectBinding.md' +
      filenameExtensionForClassMetadata
    );
  }

  public getDomainInterfaceClassName(): string {
    return this.classPrefix + 'I' + this.getBaseDomainName();
  }

  public getDomainImplementationClassName(): string {
    return this.classPrefix + this.getBaseDomainName();
  }

  public getDomainUnitTestClassName(): string {
    return this.getDomainImplementationClassName() + 'Test';
  }

  public getMetadataFilenameForAT4DXDomainBinding(): string {
    return (
      'ApplicationFactory_DomainBinding__mdt.' +
      sObjectNames.cleanUpClassName(this.getApiName()) +
      'SObjectBinding.md' +
      filenameExtensionForClassMetadata
    );
  }

  private initializeBaseName(): void {
    let workingBaseName = this.getApiName(); // Property__c

    // remove the prefix, if present
    workingBaseName = workingBaseName.replace(this.classPrefix + '_', '');

    workingBaseName = sObjectNames.cleanUpClassName(workingBaseName); // Property

    workingBaseName = sObjectNames.getPluralFormOfWord(workingBaseName); // Properties

    this.baseClassName = workingBaseName;

    return;
  }

  private getBaseName(): string {
    return this.baseClassName;
  }

  private getBaseSelectorName(): string {
    return this.getBaseName() + 'Selector';
  }

  private getBaseDomainName(): string {
    return this.getBaseName();
  }
}

export default sObjectNames;
