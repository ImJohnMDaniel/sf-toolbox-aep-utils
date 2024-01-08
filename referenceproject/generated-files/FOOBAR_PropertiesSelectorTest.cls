@IsTest
private class FOOBAR_PropertiesSelectorTest
{
    @IsTest
    private static void testKnownSelectorMethods()
    {
        Test.startTest();

        System.assert(FOOBAR_PropertiesSelector.newInstance().selectById( new Set<Id>{fflib_IDGenerator.generate(Property__c.SObjecttype)} ).isEmpty(), 'FOOBAR_PropertiesSelector selectById verification method failed.');
        System.assert(new FOOBAR_PropertiesSelector().getAdditionalSObjectFieldList().isEmpty(), 'FOOBAR_PropertiesSelector getAdditionalSObjectFieldList verification method failed.');
                
        Test.stopTest();
    }
}