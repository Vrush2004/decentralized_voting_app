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
                  <div className={Style.car}>
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

        <div className={Style.voter}>
            <div className={Style.voter__container}>
                <h1>Create New Voter</h1>
                <div className={Style.voter__container__box}>
                    <div className={Style.voter__container__box__div}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()}/>

                            <div className={Style.voter__container__box__div__info}>
                                <p>Upload File: JPG, PNG, WEBM Max 10MB</p>
                                <div className={Style.voter__container__box__div__image}>
                                  <Image src={images.candidate} width={150} height={150} objectFit='contain' alt='File upload'/>
                                </div>
                                <p>Drag & Drop File</p>
                                <p>or Browse Media on your device</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Style.input__container}>
                <input 
                    inputType="text" 
                    title='Name' 
                    placeholder='Voter Name' 
                    handleClick={(e) => setFormInput({...formInput, name: e.target.value})}
                />
                <input 
                    inputType="text" 
                    title='Address' 
                    placeholder='Voter Address' 
                    handleClick={(e) => setFormInput({...formInput, address: e.target.value})}
                />
                <input 
                    inputType="text" 
                    title='Position' 
                    placeholder='Voter Position' 
                    handleClick={(e) => setFormInput({...formInput, position: e.target.value})}
                />
                <div className={Style.Button}>
                    <Button btnName="Authorized Voter" handleClick={() => {}}/>
                </div>
            </div>
        </div>

        {/*  */}
    </div>
  )

};

export default allowedVoters;