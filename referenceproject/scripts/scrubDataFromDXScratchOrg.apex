delete [select id from Case];
delete [select id from Contact where name != 'Jon Amos' ];
delete [select id from Opportunity];
delete [select id from Lead];
delete [select Id from Entitlement];
delete [select id from Account where name != 'Global Media'];