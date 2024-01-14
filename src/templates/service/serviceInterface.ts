const serviceInterface: string = `public interface {{=it.svcNames.getServiceInterfaceClassName()}}
{
    // example interface method
    // void doSomething(Set<Id> recordsToDoSomething);
}
`;

export default serviceInterface;
