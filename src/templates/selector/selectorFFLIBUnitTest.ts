const selectorFFLIBUnitTest: string = `@IsTest
private class {{=it.sobj.getSelectorUnitTestClassName()}}
{
    @IsTest
    private static void testKnownSelectorMethods()
    {
        Test.startTest();

        System.assert({{=it.sobj.getSelectorImplementationClassName()}}.newInstance().selectById( new Set<Id>{fflib_IDGenerator.generate({{=it.sobj.getApiName()}}.SObjecttype)} ).isEmpty(), '{{=it.sobj.getSelectorImplementationClassName()}} selectById verification method failed.');
                
        Test.stopTest();
    }
}`;

export default selectorFFLIBUnitTest;
