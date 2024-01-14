const serviceFacade: string = `public inherited sharing class {{=it.svcNames.getServiceFacadeClassName()}}
{
    private static {{=it.svcNames.getServiceInterfaceClassName()}} service()
    {
        return ({{=it.svcNames.getServiceInterfaceClassName()}}) Application.Service.newInstance({{=it.svcNames.getServiceInterfaceClassName()}}.class);
    }

    // example service method
    // public static void doSomething(Set<Id> recordsToDoSomething)
    // {
    //     service().doSomething(recordsToDoSomething);
    // }
}
`;

export default serviceFacade;
