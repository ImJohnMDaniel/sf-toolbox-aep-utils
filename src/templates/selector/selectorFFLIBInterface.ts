const selectorFFLIBInterface: string = `public interface {{=it.sobj.getSelectorInterfaceClassName()}}
    extends fflib_ISObjectSelector
{
    List<{{=it.sobj.getApiName()}}> selectById(Set<Id> idSet);
}
`;

export default selectorFFLIBInterface;
