const domainFFLIBClass: string = `public inherited sharing class {{=it.sobj.getDomainImplementationClassName()}}
    extends fflib_SObjectDomain
    implements {{=it.sobj.getDomainInterfaceClassName()}}
{
    public static {{=it.sobj.getDomainInterfaceClassName()}} newInstance(List<{{=it.sobj.getApiName()}}> records)
    {
        return ({{=it.sobj.getDomainInterfaceClassName()}}) Application.Domain.newInstance(records);
    }

    public static {{=it.sobj.getDomainInterfaceClassName()}} newInstance(Set<Id> recordIds)
    {
        return ({{=it.sobj.getDomainInterfaceClassName()}}) Application.Domain.newInstance(recordIds);
    }

    public {{=it.sobj.getDomainImplementationClassName()}}(List<{{=it.sobj.getApiName()}}> records)
    {
        super(records);
    }

    public class Constructor
        implements fflib_SObjectDomain.IConstructable
    {
        public fflib_SObjectDomain construct(List<SObject> sObjectList)
        {
            return new {{=it.sobj.getDomainImplementationClassName()}}(sObjectList);
        }
    }
}
`;

export default domainFFLIBClass;
