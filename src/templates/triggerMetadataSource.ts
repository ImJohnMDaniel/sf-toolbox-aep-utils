const triggerMetadataSource: string = `<?xml version="1.0" encoding="UTF-8"?>
<ApexTrigger xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>{{=it.apiVersion}}</apiVersion>
    <status>Active</status>
</ApexTrigger>`;

export default triggerMetadataSource;
