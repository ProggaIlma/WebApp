


"use client";

import  React,{useState} from 'react';
import {Button,ButtonGroup} from '@mui/material';



export default function CounterButton({catname,img}) {
const [counter, setCounter] = useState(1);
return (
   <ButtonGroup  aria-label="large button group">
   <Button
   disableRipple
     disabled={counter >= 20}
     onClick={() => {
       setCounter((counter) => counter + 1);
     }}
   >
     +
   </Button>
   <Button disableRipple>{counter}</Button>
   <Button
     disableRipple
     onClick={() => {
     if(counter>1)  setCounter((counter) => counter - 1);
     }}
   >
     -
   </Button>
 </ButtonGroup>
)}