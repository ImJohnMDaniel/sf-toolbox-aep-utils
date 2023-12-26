di_Configurations__c forceIdOrgConfig = di_Configurations__c.getOrgDefaults();

// If no Org Default record is found...
if (forceIdOrgConfig == null)
{
	// ...create a new Org Default record
	forceIdOrgConfig = new di_Configurations__c();
	forceIdOrgConfig.SetupOwnerId = UserInfo.getOrganizationId();
}

// configure the Org Default record
forceIdOrgConfig.OrgCachePartitionName__c = 'ForceDIBindingCache';
forceIdOrgConfig.UsePlatformCacheToStoreBindings__c = true;

upsert forceIdOrgConfig;