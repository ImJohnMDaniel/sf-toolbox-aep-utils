public inherited sharing class FOOBAR_PropertiesSelector
    extends ApplicationSObjectSelector
    implements FOOBAR_IPropertiesSelector 
{
    public static FOOBAR_IPropertiesSelector newInstance()
    {
        return (FOOBAR_IPropertiesSelector) Application.Selector.newInstance(Property__c.SObjectType);
    }

    public Schema.sObjectType getSObjectType()
    {
        return Property__c.SObjectType;
    }

    public override List<Schema.SObjectField> getSObjectFieldList()
    {
        return new List<Schema.SObjectField> {
            Property__c.Id,
            Property__c.OwnerId,
            Property__c.Name,
            Property__c.CreatedDate,
            Property__c.CreatedById,
            Property__c.LastModifiedDate,
            Property__c.LastModifiedById,
            Property__c.SystemModstamp,
            Property__c.LastActivityDate
            
        };
        
    }

    @TestVisible
    private List<Schema.SObjectField> getAdditionalSObjectFieldList()
    {
        return new List<Schema.SObjectField> {
            
        };
    }

    public List<Property__c> selectById(Set<Id> idSet)
    {
        return (List<Property__c>) selectSObjectsById( idSet == null ? new Set<Id>() : idSet );
    }

    // TODO: Need to add the selectByParent methods
}
