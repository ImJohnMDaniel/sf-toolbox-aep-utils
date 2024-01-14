const selectorClass: string = `public with sharing class {{=it.svcNames.getServiceImplementationClassName()}} 
    implements {{=it.svcNames.getServiceInterfaceClassName()}}
{
    // example service method
    // public void doSomething(Set<Id> recordsToDoSomething)
    // {
    //     
    // }
}
`;

export default selectorClass;
