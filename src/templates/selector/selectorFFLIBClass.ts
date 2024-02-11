const selectorFFLIBClass: string = `public inherited sharing class {{=it.sobj.getSelectorImplementationClassName()}}
    extends fflib_SObjectSelector
    implements {{=it.sobj.getSelectorInterfaceClassName()}} 
{
    public static {{=it.sobj.getSelectorInterfaceClassName()}} newInstance()
    {
        return ({{=it.sobj.getSelectorInterfaceClassName()}}) Application.Selector.newInstance({{=it.sobj.getApiName()}}.SObjectType);
    }

    public Schema.sObjectType getSObjectType()
    {
        return {{=it.sobj.getApiName()}}.SObjectType;
    }

    public override List<Schema.SObjectField> getSObjectFieldList()
    {
        return new List<Schema.SObjectField> {
            {{~it.sobj.getFieldsForSObjectFieldList() :field }}{{=it.sobj.getApiName()}}.{{=field}}
            {{~}}
        };
        
    }

    public List<{{=it.sobj.getApiName()}}> selectById(Set<Id> idSet)
    {
        return (List<{{=it.sobj.getApiName()}}>) Database.query(newQueryFactory().setCondition('id in :idSet').toSOQL());
    }

    // TODO: Need to add the selectByParent methods
}
`;

export default selectorFFLIBClass;
