public interface FOOBAR_IFOOBARBrokeragesSelector
	extends IApplicationSObjectSelector
{
	List<FOOBAR_Brokerage__c> selectById(Set<Id> idSet);
}
