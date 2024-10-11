import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import axios from 'axios';
import { useRouter } from 'next/router';

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from './constants';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const fetchContract = (signerOrProvider) => new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider)

export const VotingContext = React.createContext();
export const VotingProvider = ({children}) => {
    const votingTitle = "My first smart contract app";
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState('');
    const [candidateLength, setCandidateLength] = useState('');
    const pushCandidate = [];
    const candidateIndex =[];
    const [candidateArray, setCandidateArray] = useState(pushCandidate)

    // END OF CANDIDATE DATA

    const [error, setError] = useState('');
    const heigestVote = [];

    // VOTER SECTION
    const pushVoter = [];
    const [voterArray, setVoterArray] = useState(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState([]);

    // CONNECTING METAMASK

    const checkIfWalletIsConnected = async()=>{
        if(!window.ethereum) return setError("Please install MetaMask");

        const account = await window.ethereum.request({method:"eth_account"});

        if (account.length){
            setCurrentAccount(account[0]);
        }else{
            setError("Please install MetaMask & Connect, Reload");
        }
    };

    // CONNECT WALLET
    const connectWallet = async() => {
        if(!window.ethereum) return setError("Please install MetaMask");

        const account = await window.ethereum.request({method:"eth_requestAccounts"});

        setCurrentAccount(account[0])
    }

    // UPLOAD TO IPFS VOTER IMAGE
    const uploadToIPFS = async(file)=>{
        try {
            const added = await client.add({content: file})

            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            return url;
        } catch (error) {
            setError("Error Uploading file to IPFS")
        }
    }

    // UPLOAD TO IPFS Candidate IMAGE
    const uploadToIPFSCandidate = async(file)=>{
        try {
            const added = await client.add({content: file})

            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            return url;
        } catch (error) {
            setError("Error Uploading file to IPFS")
        }
    }

    // Create Voter
    const createVoter = async(formInput, fileUrl,router)=>{
        try {
            const {name, address, position} = formInput;

            if(!name || !address || !position) 
                return setError("Input data is missing")

            // Connecting smart contract
            const web3 = new Web3();
            const connection = await web3.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = fetchContract(signer)
            const data = JSON.stringify({name, address, position, image: fileUrl})
            const added = await client.add(data)

            const url = `https://ipfs.infura.io/ipfs/${added.path}`

            const voter = await contract.voterRight(address, name, url, fileUrl);
            voter.wait()

            router.push("/voterList")

        } catch (error) {
            setError("Something wrong creating voter")
        }
    }

    // Get voter data
    const getAllVoterData = async()=>{
        try {
            const web3 = new Web3();
            const connection = await web3.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = fetchContract(signer)

            // voter list
            const voterListData = await contract.getVoterList;
            setVoterAddress(voterListData); 

            voterListData.map(async(el) =>{
                const singleVoterData = await contract.getVoterData(el);
                pushVoter.push(singleVoterData)
            })

            // voter length
            const voterList = await contract.getVoterLength();
            setVoterLength(voterList.toNumber());
        } catch (error) {
            setError("Something went wrong fetching data")
        }
        
    }

    // useEffect(() => {
    //     getAllVoterData();
    // }, [])

    // Give vote
    const giveVote = async(id) => {
        try {
            
        } catch (error) {
            
        }
    }

    // ---------------------- candidate section ---------------------------
    const setCandidate = async(candidateForm, fileUrl,router)=>{
        try {
            const {name, address, age} = candidateForm;

            if(!name || !address || !age) 
                return setError("Input data is missing")

            // Connecting smart contract
            const web3 = new Web3();
            const connection = await web3.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = fetchContract(signer)
            const data = JSON.stringify({name, address, image: fileUrl, age})
            const added = await client.add(data)

            const ipfs = `https://ipfs.infura.io/ipfs/${added.path}`

            const voter = await contract.voterRight(address, age, name, fileUrl, ipfs);
            voter.wait()

            router.push("/")

        } catch (error) {
            setError("Something wrong creating voter")
        }
    }

    // get candidate data
    const getNewCandidate = async()=>{
        try {
            const web3 = new Web3();
            const connection = await web3.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const signer = provider.getSigner()
            const contract = fetchContract(signer)

            // all candidate
            const allCandidate = await contract.getCandidate();

            allCandidate.map(async(el) =>{
                const singleCandidateData = await contract.getCandidateData(el)
                pushCandidate.push(singleCandidateData)
                candidateIndex.push(singleCandidateData[2].toNumber())
            })

            // candidate length
            const allCandidateLength = await contract.getCandidateLength()
            setCandidateLength(allCandidateLength.toNumber())
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getNewCandidate()
    }, [])

    return(
        <VotingContext.Provider 
            value={{
                votingTitle, 
                checkIfWalletIsConnected, 
                connectWallet, 
                uploadToIPFS,
                createVoter, 
                getAllVoterData, 
                giveVote, 
                setCandidate,
                getNewCandidate,
                error,
                voterArray,
                voterLength,
                voterAddress,
                currentAccount,
                candidateLength,
                candidateArray,
                uploadToIPFSCandidate
            }}
        >
            {children}
        </VotingContext.Provider>
    )
}