@isTest
private class FooBarTest 
{
    @isTest
    private static void testHappyPath()
    {
        System.assert(true, 'Happy Path');
    }

    private static void testFooBar()
    {
        FooBar clazz = new FooBar();
    }

    // @isTest
    // private static void testUnHappyPath()
    // {
    //     System.assert(false, 'Unhappy Path');
    // }
}
