#!/bin/zsh

 # fail if any command fails

 echo " Stage: Post-clone is activated .... "

 set -e
 # debug log
 set -x

 # Install dependencies using Homebrew. This is MUST! Do not delete.
 brew install node@16 yarn cocoapods fastlane
 
 echo 'export PATH="/usr/local/opt/node@16/bin:$PATH"' >> ~/.zshrc
 export LDFLAGS="-L/usr/local/opt/node@16/lib"
 export CPPFLAGS="-I/usr/local/opt/node@16/include"

 # Install yarn and pods dependencies.
 # If you're using Flutter or Swift
 # just install pods by "pod install" command
 ls && cd .. && yarn && pod install
 node --version
 echo " Stage: Post-clone is done .... "

 exit 0
