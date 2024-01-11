const domainTrigger: string = `trigger {{=it.sobj.getDomainImplementationClassName()}} on {{=it.sobj.getApiName()}} 
    (after delete, after insert, after update, before delete, before insert, before update) 
{
    fflib_SObjectDomain.triggerHandler({{=it.sobj.getDomainImplementationClassName()}}.class);
}`;

export default domainTrigger;
