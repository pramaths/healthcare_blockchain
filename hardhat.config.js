require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers"); // Ensure ethers.js integration
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/412f73eebb7346ca851ea413c2923731",
      accounts: [`0x${process.env.PRIVATE_KEY}`]  // Your wallet private key
    }
  }
};
