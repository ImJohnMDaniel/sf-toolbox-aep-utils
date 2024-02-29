class filepathNames {
  public static getFilepathForMainClasses(): string {
    return 'main/classes';
  }

  public static getFilepathForMainSchema(): string {
    return 'main/schema';
  }

  public static getFilepathForTestClasses(): string {
    return 'test/classes';
  }

  public static getFilepathForApplicationFactoryBindings(): string {
    return filepathNames.getFilepathForMainSchema() + '/custommetadata/applicationFactoryBindings';
  }

  public static getFilepathForMainServiceBinding(): string {
    return filepathNames.getFilepathForApplicationFactoryBindings() + '/serviceBindings';
  }

  public static getFilepathForMainServiceClass(): string {
    return filepathNames.getFilepathForMainClasses() + '/services';
  }

  public static getFilepathForTestServiceClass(): string {
    return filepathNames.getFilepathForTestClasses() + '/services';
  }

  public static getFilepathForMainDomainBinding(): string {
    return filepathNames.getFilepathForApplicationFactoryBindings() + '/domainBindings';
  }

  public static getFilepathForMainDomainClass(): string {
    return filepathNames.getFilepathForMainClasses() + '/domains';
  }

  public static getFilepathForTestDomainClass(): string {
    return filepathNames.getFilepathForTestClasses() + '/domains';
  }

  public static getFilepathForMainTrigger(): string {
    return filepathNames.getFilepathForMainSchema() + '/triggers';
  }

  public static getFilepathForMainSelectorBinding(): string {
    return filepathNames.getFilepathForApplicationFactoryBindings() + '/selectorBindings';
  }

  public static getFilepathForMainSelectorClass(): string {
    return filepathNames.getFilepathForMainClasses() + '/selectors';
  }

  public static getFilepathForTestSelectorClass(): string {
    return filepathNames.getFilepathForTestClasses() + '/selectors';
  }

  public static getFilepathForMainUnitOfWorkBinding(): string {
    return filepathNames.getFilepathForApplicationFactoryBindings() + '/unitOfWorkBindings';
  }
}

export default filepathNames;
