const domainFFLIBInterface: string = `public interface {{=it.sobj.getDomainInterfaceClassName()}}
    extends fflib_ISObjectDomain
{
    
}
`;

export default domainFFLIBInterface;
