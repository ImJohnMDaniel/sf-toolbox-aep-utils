@IsTest
private class FOOBAR_FOOBARBrokeragesSelectorTest
{
    @IsTest
    private static void testKnownSelectorMethods()
    {
        Test.startTest();

        System.assert(FOOBAR_FOOBARBrokeragesSelector.newInstance().selectById( new Set<Id>{fflib_IDGenerator.generate(FOOBAR_Brokerage__c.SObjecttype)} ).isEmpty(), 'FOOBAR_FOOBARBrokeragesSelector selectById verification method failed.');
        System.assert(new FOOBAR_FOOBARBrokeragesSelector().getAdditionalSObjectFieldList().isEmpty(), 'FOOBAR_FOOBARBrokeragesSelector getAdditionalSObjectFieldList verification method failed.');
                
        Test.stopTest();
    }
}