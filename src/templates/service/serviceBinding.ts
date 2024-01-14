const serviceBinding: string = `<?xml version="1.0" encoding="UTF-8"?>
<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <label>{{=it.svcNames.getServiceInterfaceClassName()}}</label>
    <protected>false</protected>
    <values>
        <field>BindingInterface__c</field>
        <value xsi:type="xsd:string">{{=it.svcNames.getServiceInterfaceClassName()}}</value>
    </values>
    <values>
        <field>To__c</field>
        <value xsi:type="xsd:string">{{=it.svcNames.getServiceImplementationClassName()}}</value>
    </values>
</CustomMetadata>
`;

export default serviceBinding;
