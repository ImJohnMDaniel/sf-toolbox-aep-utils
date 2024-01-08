public interface FOOBAR_IPropertiesSelector
	extends IApplicationSObjectSelector
{
	List<Property__c> selectById(Set<Id> idSet);
}
