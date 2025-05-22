import * as React from 'react';
import Button from '@mui/material/Button';

export default function Buttons({width}) {
  return (
      <Button variant="contained" sx={{width:width}}>Add to cart</Button>
  );
}