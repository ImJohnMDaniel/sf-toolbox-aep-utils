const filenameExtensionForClass: string = '.cls';
const filenameExtensionForMetadata: string = '-meta.xml';

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
  public static getFilepathForMainServiceClass(): string {
    return 'main/classes/services';
  }

  public static getFilepathForTestServiceClass(): string {
    return 'test/classes/services';
  }

  public static getFilepathForMainServiceBinding(): string {
    return 'main/schema/custommetadata/applicationFactoryBindings/serviceBindings';
  }

  public static getFilenameForClass(className: string): string {
    return className + filenameExtensionForClass;
  }

  public static getMetadataFilenameForClass(className: string): string {
    return serviceNames.getFilenameForClass(className) + filenameExtensionForMetadata;
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
      'ApplicationFactory_ServiceBinding__mdt.' +
      this.getServiceInterfaceClassName() +
      '.md' +
      filenameExtensionForMetadata
    );
  }

  private getBaseName(): string {
    return this.baseClassName;
  }
}

export default serviceNames;
