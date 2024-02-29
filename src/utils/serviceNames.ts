import { FILENAME_EXTENSION_FOR_CLASS, FILENAME_EXTENSION_FOR_METADATA } from './constants.js';

class serviceNames {
  private classPrefix!: string;
  private baseClassName: string;

  public constructor(serviceBasename: string, classPrefix?: string) {
    if (classPrefix) {
      this.classPrefix = classPrefix.toLocaleUpperCase() + '_';
    } else {
      this.classPrefix = '';
    }
    this.baseClassName = serviceBasename;
  }
  public static getFilenameForClass(className: string): string {
    return className + FILENAME_EXTENSION_FOR_CLASS;
  }

  public static getMetadataFilenameForClass(className: string): string {
    return serviceNames.getFilenameForClass(className) + FILENAME_EXTENSION_FOR_METADATA;
  }

  public diagnosticReport(): string {
    return (
      'getBaseName(): ' +
      this.getBaseName() +
      '\n' +
      'getServiceFacadeClassName(): ' +
      this.getServiceFacadeClassName() +
      '\n' +
      '  getFilenameForServiceFacadeClassName(): ' +
      serviceNames.getFilenameForClass(this.getServiceFacadeClassName()) +
      '\n' +
      'getServiceImplementationClassName(): ' +
      this.getServiceImplementationClassName() +
      '\n' +
      '  getFilenameForServiceImplementationClassName(): ' +
      serviceNames.getFilenameForClass(this.getServiceImplementationClassName()) +
      '\n' +
      'getServiceInterfaceClassName(): ' +
      this.getServiceInterfaceClassName() +
      '\n' +
      '  getMetadataFilenameForServiceInterfaceClassName(): ' +
      serviceNames.getMetadataFilenameForClass(this.getServiceInterfaceClassName()) +
      '\n' +
      '  getServiceUnitTestClassName(): ' +
      this.getServiceUnitTestClassName() +
      '\n' +
      '  getFilenameForServiceUnitTestClassName(): ' +
      serviceNames.getFilenameForClass(this.getServiceUnitTestClassName()) +
      '\n' +
      '  getServiceExceptionClassName(): ' +
      this.getServiceExceptionClassName() +
      '\n' +
      '    getFilenameForServiceExceptionClassName(): ' +
      serviceNames.getFilenameForClass(this.getServiceExceptionClassName()) +
      '\n' +
      '  getMetadataFilenameForAT4DXServiceBinding(): ' +
      this.getMetadataFilenameForAT4DXServiceBinding() +
      '\n'
    );
  }

  public getServiceFacadeClassName(): string {
    return this.classPrefix + this.getBaseName() + 'Service';
  }

  public getServiceInterfaceClassName(): string {
    return this.classPrefix + 'I' + this.getBaseName() + 'Service';
  }

  public getServiceImplementationClassName(): string {
    return this.classPrefix + this.getBaseName() + 'ServiceImpl';
  }

  public getServiceExceptionClassName(): string {
    return this.classPrefix + this.getBaseName() + 'ServiceException';
  }

  public getServiceUnitTestClassName(): string {
    return this.getServiceFacadeClassName() + 'Test';
  }

  public getMetadataFilenameForAT4DXServiceBinding(): string {
    return (
      'ApplicationFactory_ServiceBinding.' +
      this.getServiceInterfaceClassName() +
      '.md' +
      FILENAME_EXTENSION_FOR_METADATA
    );
  }

  private getBaseName(): string {
    return this.baseClassName;
  }
}

export default serviceNames;
