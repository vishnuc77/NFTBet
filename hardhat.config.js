require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path: './.env'});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: process.env.alchemy_url,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    hardhat: {
      chainId: 1337
    }
  }
}