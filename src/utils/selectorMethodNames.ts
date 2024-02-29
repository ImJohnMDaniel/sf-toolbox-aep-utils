import { FILENAME_EXTENSION_FOR_CLASS, FILENAME_EXTENSION_FOR_METADATA } from './constants.js';

class selectorMethodNames {
  // private classPrefix!: string;
  private className: string;
  private sobjectName: string;
  private sobjectSelectorClassName: string;

  public constructor(className: string, sobjectName: string, sobjectSelectorClassName: string) {
    // public constructor(className: string, sobjectName: string, sobjectSelectorClassName: string, classPrefix?: string) {
    // if (classPrefix) {
    //   this.classPrefix = classPrefix.toLocaleUpperCase() + '_';
    // } else {
    //   this.classPrefix = '';
    // }
    this.className = className;
    this.sobjectName = sobjectName;
    this.sobjectSelectorClassName = sobjectSelectorClassName;
  }
  public static getFilenameForClass(className: string): string {
    return className + FILENAME_EXTENSION_FOR_CLASS;
  }

  public static getMetadataFilenameForClass(className: string): string {
    return selectorMethodNames.getFilenameForClass(className) + FILENAME_EXTENSION_FOR_METADATA;
  }

  // public diagnosticReport(): string {
  //   return (
  //     'getBaseName(): ' +
  //     this.getBaseName() +
  //     '\n' +
  //     'getServiceFacadeClassName(): ' +
  //     this.getServiceFacadeClassName() +
  //     '\n' +
  //     '  getFilenameForServiceFacadeClassName(): ' +
  //     selectorMethodNames.getFilenameForClass(this.getServiceFacadeClassName()) +
  //     '\n' +
  //     'getServiceImplementationClassName(): ' +
  //     this.getServiceImplementationClassName() +
  //     '\n' +
  //     '  getFilenameForServiceImplementationClassName(): ' +
  //     selectorMethodNames.getFilenameForClass(this.getServiceImplementationClassName()) +
  //     '\n' +
  //     'getServiceInterfaceClassName(): ' +
  //     this.getServiceInterfaceClassName() +
  //     '\n' +
  //     '  getMetadataFilenameForServiceInterfaceClassName(): ' +
  //     selectorMethodNames.getMetadataFilenameForClass(this.getServiceInterfaceClassName()) +
  //     '\n' +
  //     '  getServiceUnitTestClassName(): ' +
  //     this.getServiceUnitTestClassName() +
  //     '\n' +
  //     '  getFilenameForServiceUnitTestClassName(): ' +
  //     selectorMethodNames.getFilenameForClass(this.getServiceUnitTestClassName()) +
  //     '\n' +
  //     '  getServiceExceptionClassName(): ' +
  //     this.getServiceExceptionClassName() +
  //     '\n' +
  //     '    getFilenameForServiceExceptionClassName(): ' +
  //     selectorMethodNames.getFilenameForClass(this.getServiceExceptionClassName()) +
  //     '\n' +
  //     '  getMetadataFilenameForAT4DXServiceBinding(): ' +
  //     this.getMetadataFilenameForAT4DXServiceBinding() +
  //     '\n'
  //   );
  // }

  public getSelectorMethodInjectionClassName(): string {
    return this.className;
  }

  public getApiName(): string {
    return this.sobjectName;
  }

  public getSelectorImplementationClassName(): string {
    return this.sobjectSelectorClassName;
  }

  public getSelectorMethodInjectionUnitTestClassName(): string {
    return this.getSelectorMethodInjectionClassName() + 'Test';
  }
}

export default selectorMethodNames;
