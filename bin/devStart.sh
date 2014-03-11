#/bin/bash
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh # This loads NVM
nvm use 0.11.11
nodemon --harmony ./server.js