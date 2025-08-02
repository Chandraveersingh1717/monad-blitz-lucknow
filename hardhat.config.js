require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.REACT_APP_ALCHEMY_API_URL, 
      accounts: [process.env.REACT_APP_PRIVATE_KEY] 
    },
    monadTestnet:{
      url: "https://testnet-rpc.monad.xyz",
      accounts:[process.env.REACT_APP_PRIVATE_KEY]
    }
  }
};
