@IsTest
private class FOOBAR_AccountsSelectorTest
{
    @IsTest
    private static void testKnownSelectorMethods()
    {
        Test.startTest();

        System.assert(FOOBAR_AccountsSelector.newInstance().selectById( new Set<Id>{fflib_IDGenerator.generate(Account.SObjecttype)} ).isEmpty(), 'FOOBAR_AccountsSelector selectById verification method failed.');
        System.assert(new FOOBAR_AccountsSelector().getAdditionalSObjectFieldList().isEmpty(), 'FOOBAR_AccountsSelector getAdditionalSObjectFieldList verification method failed.');
                
        Test.stopTest();
    }
}