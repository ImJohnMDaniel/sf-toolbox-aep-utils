#!/bin/bash

# validation stage

# initializeStage
sf org delete scratch --no-prompt
sf org create scratch --wait 30 --duration-days 1 --set-default --definition-file config/foobar-project-scratch-def.json --alias foobar
sf data record update --sobject Organization --where "Name='FOOBAR Company'" --values "TimeZoneSidKey='America/New_York'" 
sf data record update --sobject User --where "Name='User User'" --values "TimeZoneSidKey='America/New_York'" 

# processResoucesStage
sf toolbox package dependencies install 

# clean up sfdx-source/untracked/ folder
rm -f sfdx-source/untracked/*.cls
rm -f sfdx-source/untracked/*.trigger
rm -f sfdx-source/untracked/*.xml

# compilationStage
sf project deploy start --ignore-conflicts

# testingStage
# sfdx force:apex:execute -f scripts/configureForceDIBindingCache.apex
# sfdx force:source:deploy --sourcepath sfdx-source/unpackaged-post-deployment
sfdx force:user:permset:assign -n FooBarAccess 
# sfdx sfdmu:run -s csvfile -u foobar -p data/Accounts
