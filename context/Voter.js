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

    return(
        <VotingContext.Provider value={{}}>
            {children}
        </VotingContext.Provider>
    )
}