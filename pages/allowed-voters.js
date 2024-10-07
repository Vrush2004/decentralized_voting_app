import React, {useState, useEffect, useCallback, useContext} from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

// INTERNAL IMPORT
import { VotingContext } from '../context/Voter';
import Style from '../styles/allowedVoter.module.css';
import images from '../assets/candidate-1.png';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name : "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const {uploadToIPFS} = useContext(VotingContext)

  // VOTERS IMAGE DROP
  const onDrop = useCallback(async(acceptedFill) => {
    const url = await uploadToIPFS(acceptedFill[0]);
    setFileUrl(url);
  });

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  })

  // JSX PART
  return (
    <div className={Style.createVoter}>
        <div>
            {fileUrl && (
              <div className={Style.voterInfo}>
                  <img src={ fileUrl } alt='Voter Image'/>
                  <div className={Style.voterInfo_paragraph}>
                      <p>
                        Name: <span>&nbps; {formInput.name}</span>
                      </p>
                      <p>
                        Address: &nbps;<span> {formInput.address.slice(0,20)}</span>
                      </p>
                      <p>
                        Pos: &nbps;<span> {formInput.address.position}</span>
                      </p>
                  </div>
              </div>
            )}


};

export default allowedVoters;