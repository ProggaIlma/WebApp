'use client';

import React, { useState } from 'react';
import {  Typography, Button , ButtonGroup } from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function CartItem({removeFromCart,item}) {
  const [counter, setCounter] = useState(1);

  return (
    <div className='bg-white rounded-lg px-2 pt-2 mb-2'>
      <div className="flex justify-around w-full">
        <img src={item?.image} style={{ height: '70px', width: '70px', borderRadius: '8px' }} />
        <div style={{ width: '80%' }} className='px-1'>
          <Typography className="text-sm">{item?.title}</Typography>
         <Typography className="text-sm">৳ {item?.price}</Typography>
        </div>
        <div className='flex flex-col justify-between items-end'>
            <DeleteOutlineIcon onClick={()=>{
              console.log('fsdf');
              
              removeFromCart(item);}} className='secondary_color'/>
         
         
            <ButtonGroup size="small" aria-label="Small button group" >
              <Button
              sx={{minWidth:"5px !important"}}
                disableRipple
                disabled={counter >= 20}
                onClick={() => {
                  setCounter((counter) => counter + 1);
                }}
              >
                +
              </Button>
              <Button disableRipple  sx={{minWidth:"15px !important"}}>{counter}</Button>
              <Button
                disableRipple
                sx={{minWidth:"5px !important"}}
                onClick={() => {
                  if (counter > 1) setCounter((counter) => counter - 1);
                }}
              >
                -
              </Button>
            </ButtonGroup>
         
        </div>
      </div>
     
      <div className='mt-1 flex justify-end pb-1'>
    
      <Typography className="text-sm">   ৳ 149.00</Typography>
      </div>
    </div>
  );
}
