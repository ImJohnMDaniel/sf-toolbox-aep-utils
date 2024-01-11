const domainInterface: string = `public interface {{=it.sobj.getDomainInterfaceClassName()}}
    extends IApplicationSObjectDomain
{
    
}
`;

export default domainInterface;
