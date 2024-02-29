const selectorAT4DXMethodInjectionUnitTest: string = `@IsTest
private class {{=it.smn.getSelectorMethodInjectionUnitTestClassName()}}
{
    @IsTest
    private static void testSelectQueryMethod()
    {
        Test.startTest();

        System.assert({{=it.smn.getSelectorImplementationClassName()}}.newInstance().selectInjection( {{=it.smn.getSelectorMethodInjectionClassName()}}.class, null) != null, '{{=it.smn.getSelectorImplementationClassName()}}\\'s selectInjection verification method for {{=it.smn.getSelectorMethodInjectionClassName()}} selector method injection failed.');
                
        Test.stopTest();
    }
}`;

export default selectorAT4DXMethodInjectionUnitTest;

// @IsTest
// private class LCNZAPI_UserInactivatedSel_MethodTest
// {
// 	@IsTest
// 	private static void selectQuery_COVER()
// 	{
//         UCMN_UsersSelector.newInstance().selectInjection(LCNZAPI_UserInactivatedSelectorMethod.class, null);
// 	}
// }
