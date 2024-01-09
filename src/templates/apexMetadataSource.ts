const apexMetadataSource: string = `<?xml version="1.0" encoding="UTF-8"?>
<ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>{{=it.apiVersion}}</apiVersion>
    <status>Active</status>
</ApexClass>`;

export default apexMetadataSource;
