const domainUnitTest: string = `@IsTest
private class {{=it.sobj.getDomainUnitTestClassName()}}
{
    @IsTest 
    private static void testNewInstanceMethod()
    {
        // Given
        Id recordId = fflib_IDGenerator.generate( {{=it.sobj.getApiName()}}.SObjectType );

        {{=it.sobj.getApiName()}} record = new {{=it.sobj.getApiName()}}( Id = recordId );

        // When
        Test.startTest();

        {{=it.sobj.getDomainImplementationClassName()}}.newInstance( new List<{{=it.sobj.getApiName()}}>{ record } );

        {{=it.sobj.getDomainImplementationClassName()}}.newInstance( new Set<Id>{ recordId } );

        Test.stopTest();

        // Then 
    }
}`;

export default domainUnitTest;
