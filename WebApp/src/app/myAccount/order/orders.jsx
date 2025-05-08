import { Typography } from '@mui/material';
import  React,{Fragment, useState} from 'react';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import OrderDetails from './orderDetails';

export default function Orders() {


  const [showDetails,setshowDetails] = useState(false);

  return (
    <Fragment>

   {!showDetails && <Grid container className='p-7 pb-20'>
      <Grid size={{ xs: 12 }} className="flex justify-between p-2 items-center rounded-md" sx={{ backgroundColor: '#44776d', color: 'white' }}>
        <Typography>
          ORDER ID <span>#12fgw2</span>
        </Typography>
        <Button sx={{ backgroundColor: '#e91e63', color: 'white' }} onClick={()=>setshowDetails(!showDetails)}>View</Button>
      </Grid>
      <Grid size={{ xs: 12 }} container sx={{ backgroundColor: 'white' }} className="p-3">
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography className='font-bold'>Shipping Address</Typography>
          <Typography>Uttara, sector 14,road 16,house 78, B2 , Dhaka, Dhaka </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography>Order Date:</Typography>
          <Typography>Status:</Typography> 
          <Typography>Payment:</Typography>
          <Typography>Method:</Typography> 
                 </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
        <Typography className='text-end'>March 10, 2023</Typography>
          <Typography className='text-end'>Cancelled</Typography> 
          <Typography className='text-end'>cod</Typography>
          <Typography className='text-end font-bold'>৳ 1234</Typography> 
        </Grid>
      </Grid>
    </Grid>}
   {showDetails && <OrderDetails/>}
    
    </Fragment>
  );
}
