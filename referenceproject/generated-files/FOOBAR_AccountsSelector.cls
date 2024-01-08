public inherited sharing class FOOBAR_AccountsSelector
    extends ApplicationSObjectSelector
    implements FOOBAR_IAccountsSelector 
{
    public static FOOBAR_IAccountsSelector newInstance()
    {
        return (FOOBAR_IAccountsSelector) Application.Selector.newInstance(Account.SObjectType);
    }

    public Schema.sObjectType getSObjectType()
    {
        return Account.SObjectType;
    }

    public override List<Schema.SObjectField> getSObjectFieldList()
    {
        return new List<Schema.SObjectField> {
            Account.Id,
            Account.MasterRecordId,
            Account.Name,
            Account.LastName,
            Account.FirstName,
            Account.Salutation,
            Account.MiddleName,
            Account.Suffix,
            Account.Type,
            Account.RecordTypeId,
            Account.ParentId,
            Account.BillingCity,
            Account.BillingState,
            Account.BillingPostalCode,
            Account.BillingCountry,
            Account.BillingLatitude,
            Account.BillingLongitude,
            Account.BillingGeocodeAccuracy,
            Account.BillingAddress,
            Account.ShippingCity,
            Account.ShippingState,
            Account.ShippingPostalCode,
            Account.ShippingCountry,
            Account.ShippingLatitude,
            Account.ShippingLongitude,
            Account.ShippingGeocodeAccuracy,
            Account.ShippingAddress,
            Account.Phone,
            Account.Fax,
            Account.AccountNumber,
            Account.Website,
            Account.PhotoUrl,
            Account.Sic,
            Account.Industry,
            Account.AnnualRevenue,
            Account.NumberOfEmployees,
            Account.Ownership,
            Account.TickerSymbol,
            Account.Rating,
            Account.Site,
            Account.OwnerId,
            Account.CreatedDate,
            Account.CreatedById,
            Account.LastModifiedDate,
            Account.LastModifiedById,
            Account.SystemModstamp,
            Account.LastActivityDate,
            Account.LastViewedDate,
            Account.LastReferencedDate,
            Account.IsPartner,
            Account.IsCustomerPortal,
            Account.PersonContactId,
            Account.IsPersonAccount,
            Account.PersonMailingCity,
            Account.PersonMailingState,
            Account.PersonMailingPostalCode,
            Account.PersonMailingCountry,
            Account.PersonMailingLatitude,
            Account.PersonMailingLongitude,
            Account.PersonMailingGeocodeAccuracy,
            Account.PersonMailingAddress,
            Account.PersonOtherCity,
            Account.PersonOtherState,
            Account.PersonOtherPostalCode,
            Account.PersonOtherCountry,
            Account.PersonOtherLatitude,
            Account.PersonOtherLongitude,
            Account.PersonOtherGeocodeAccuracy,
            Account.PersonOtherAddress,
            Account.PersonMobilePhone,
            Account.PersonHomePhone,
            Account.PersonOtherPhone,
            Account.PersonAssistantPhone,
            Account.PersonEmail,
            Account.PersonTitle,
            Account.PersonDepartment,
            Account.PersonAssistantName,
            Account.PersonLeadSource,
            Account.PersonBirthdate,
            Account.PersonHasOptedOutOfEmail,
            Account.PersonHasOptedOutOfFax,
            Account.PersonDoNotCall,
            Account.PersonLastCURequestDate,
            Account.PersonLastCUUpdateDate,
            Account.PersonEmailBouncedReason,
            Account.PersonEmailBouncedDate,
            Account.PersonIndividualId,
            Account.Jigsaw,
            Account.JigsawCompanyId,
            Account.AccountSource,
            Account.SicDesc,
            Account.DateOfBirth__pc,
            Account.Gender__pc
            
        };
        
    }

    @TestVisible
    private List<Schema.SObjectField> getAdditionalSObjectFieldList()
    {
        return new List<Schema.SObjectField> {
            
        };
    }

    public List<Account> selectById(Set<Id> idSet)
    {
        return (List<Account>) selectSObjectsById( idSet == null ? new Set<Id>() : idSet );
    }

    // TODO: Need to add the selectByParent methods
}
