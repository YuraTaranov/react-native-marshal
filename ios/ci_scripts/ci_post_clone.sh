#!/bin/zsh

# fail if any command fails

echo " Stage: Post-clone is activated .... "

set -e
# debug log
set -x
git config --local http.postBuffer 4800000000

# Install dependencies using Homebrew. This is MUST! Do not delete.
brew install node@16 yarn cocoapods fastlane
brew link node@16

# Install yarn and pods dependencies.
# If you're using Flutter or Swift
# just install pods by "pod install" command
cd .. && yarn install
 
echo " Stage: Post-clone is done .... "

exit 0
