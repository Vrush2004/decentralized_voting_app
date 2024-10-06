const hre = require("hardhat");

async function main() {
    const VotingContract = await hre.ethers.getContractFactory("VotingContract");
    const votingContract = await VotingContract.deploy();

    // Wait until the contract is deployed
    await votingContract.deployed();

    // Log the contract address
    console.log("VotingContract deployed to:", votingContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
