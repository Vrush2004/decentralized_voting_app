async function main() {
    // Get the contract factory
    const VotingContract = await ethers.getContractFactory("VotingContract");
    
    // Deploy the contract
    const votingContract = await VotingContract.deploy();
    
    // Log the contract address
    console.log("Contract deployed to:", votingContract.address);
}

// Execute the deployment function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
