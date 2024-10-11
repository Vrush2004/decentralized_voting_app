import React, {useState, useEffect, useCallback, useContext} from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import '../styles/allowedVoter.module.css';

// INTERNAL IMPORT
import { VotingContext } from '../context/Voter';
import Style from '../styles/allowedVoter.module.css';
import images from '../assets/candidate-1.png';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const candidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [candidateForm, setCandidateForm] = useState({
    name : "",
    address: "",
    age: "",
  });

  const router = useRouter();
  const { setCandidate, uploadToIPFSCandidate} = useContext(VotingContext)

  // VOTERS IMAGE DROP
  const onDrop = useCallback(async(acceptedFill) => {
    const url = await uploadToIPFSCandidate(acceptedFill[0]);
    setFileUrl(url);
  });

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  })

};

export default candidateRegistration;