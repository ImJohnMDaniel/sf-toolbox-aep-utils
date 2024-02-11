const selectorAT4DXBinding: string = `<?xml version="1.0" encoding="UTF-8"?>
<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <label>{{=it.sobj.getApplicationFactorySObjectLabel()}}</label>
    <protected>false</protected>
    <values>
        <field>BindingSObjectAlternate__c</field>
        {{=it.sobj.getBindingSObjectAlternateValue()}}
    </values>
    <values>
        <field>BindingSObject__c</field>
        {{=it.sobj.getBindingSObjectValue()}}
    </values>
    <values>
        <field>To__c</field>
        <value xsi:type="xsd:string">{{=it.sobj.getSelectorImplementationClassName()}}</value>
    </values>
</CustomMetadata>
`;

export default selectorAT4DXBinding;
