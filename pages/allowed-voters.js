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
  
};

export default allowedVoters;