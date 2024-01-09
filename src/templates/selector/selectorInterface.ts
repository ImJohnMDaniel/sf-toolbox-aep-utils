const selectorInterface: string = `public interface {{=it.sobj.getSelectorInterfaceClassName()}}
    extends IApplicationSObjectSelector
{
    List<{{=it.sobj.getApiName()}}> selectById(Set<Id> idSet);
}
`;

export default selectorInterface;
