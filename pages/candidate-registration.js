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

  // JSX PART
  return (
    <div className={Style.createVoter}>
        <div>
            {fileUrl && (
              <div className={Style.voterInfo}>
                  <img src={ fileUrl } alt='Voter Image'/>
                  <div className={Style.voterInfo_paragraph}>
                      <p>
                        Name: <span>&nbps; {candidateForm.name}</span>
                      </p>
                      <p>
                        Address: &nbps;<span> {candidateForm.address.slice(0,20)}</span>
                      </p>
                      <p>
                        Age: &nbps;<span> {candidateForm.address.age}</span>
                      </p>
                  </div>
              </div>
            )}
            {
              !fileUrl && (
                <div className='Style.sideInfo'>
                  <div className='Style.sideInfo_box'>
                      <h4>Create Candidate For Voting</h4>
                      <p>
                        Blockchain voting organition, provide ethereum Ecosystem !!!
                      </p>
                      <p className={Style.sideInfo_para}>Contract Candidate</p>
                  </div>
                  <div className={Style.card}>
                      {/* {voterArray.map((el,i) => (
                          <div key={i+1} className={Style.card_box}>
                              <div className={Style.image}>
                                <img src="" alt="Profile photo" />
                              </div>

                              <div className={Style.card_info}>
                                <p>Name</p>
                                <p>Address</p>
                                <p>Details</p>
                              </div>
                          </div>
                      ))} */}
                  </div>
                </div>
              )
            }
        </div>
    </div>
  )

};

export default candidateRegistration;