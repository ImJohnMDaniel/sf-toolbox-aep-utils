public inherited sharing class FOOBAR_FOOBARBrokeragesSelector
    extends ApplicationSObjectSelector
    implements FOOBAR_IFOOBARBrokeragesSelector 
{
    public static FOOBAR_IFOOBARBrokeragesSelector newInstance()
    {
        return (FOOBAR_IFOOBARBrokeragesSelector) Application.Selector.newInstance(FOOBAR_Brokerage__c.SObjectType);
    }

    public Schema.sObjectType getSObjectType()
    {
        return FOOBAR_Brokerage__c.SObjectType;
    }

    public override List<Schema.SObjectField> getSObjectFieldList()
    {
        return new List<Schema.SObjectField> {
            FOOBAR_Brokerage__c.Id,
            FOOBAR_Brokerage__c.OwnerId,
            FOOBAR_Brokerage__c.Name,
            FOOBAR_Brokerage__c.CreatedDate,
            FOOBAR_Brokerage__c.CreatedById,
            FOOBAR_Brokerage__c.LastModifiedDate,
            FOOBAR_Brokerage__c.LastModifiedById,
            FOOBAR_Brokerage__c.SystemModstamp
            
        };
        
    }

    @TestVisible
    private List<Schema.SObjectField> getAdditionalSObjectFieldList()
    {
        return new List<Schema.SObjectField> {
            
        };
    }

    public List<FOOBAR_Brokerage__c> selectById(Set<Id> idSet)
    {
        return (List<FOOBAR_Brokerage__c>) selectSObjectsById( idSet == null ? new Set<Id>() : idSet );
    }

    // TODO: Need to add the selectByParent methods
}
