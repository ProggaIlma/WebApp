
"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Divider, Typography } from '@mui/material';

function valuetext(value) {
  return `${value}°C`;
}
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

export default function PriceSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
                <Typography className='color_black'>Fiter By Price</Typography>
                <Divider className='pt-3'/>
                <div className='pt-2 px-1'>
                <Slider 
                sx={{'& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',   
  },height: 6}}
      
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
      />
      <div className='flex justify-between'>
          <Typography className='color_black text-sm'>${value[0]}</Typography>
          <Typography className='color_black text-sm'>${value[1]}</Typography>
      </div>
                </div>
      
    </Box>
  );
}
