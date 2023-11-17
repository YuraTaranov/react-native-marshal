#!/bin/zsh

# fail if any command fails

echo " Stage: Post-clone is activated .... "

set -e
# debug log
set -x
git config --local http.postBuffer 4800000000

# Install dependencies using Homebrew. This is MUST! Do not delete.
brew install node@14 yarn cocoapods fastlane
brew link node@14

# Install yarn and pods dependencies.
cd ..
npm install -g react-native-cli
#npm install -g react-native@0.64.1
yarn install
cd .. && node -v && react-native --version
ls
cd ios

echo " Stage: Post-clone is done .... "

exit 0

