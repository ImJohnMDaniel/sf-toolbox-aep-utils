public interface FOOBAR_IAccountsSelector
	extends IApplicationSObjectSelector
{
	List<Account> selectById(Set<Id> idSet);
}
