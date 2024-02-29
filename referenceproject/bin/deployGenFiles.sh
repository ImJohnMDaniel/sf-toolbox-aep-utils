#!/bin/bash

# clean up sfdx-source/untracked/ folder
# rm -f sfdx-source/untracked/*.cls
# rm -f sfdx-source/untracked/*.trigger
# rm -f sfdx-source/untracked/*.xml

# move all generated files to sfdx-source/untracked/
cp -R generated-files/* sfdx-source/untracked/

# deploy code
sf project deploy start --ignore-conflicts