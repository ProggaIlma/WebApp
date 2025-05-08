import { Typography, Divider } from '@mui/material';
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import OrderItemTable from './orderItemTable';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function OrderDetails() {
  return (
    <Grid container className="p-7 pb-20">
      <Grid size={{ xs: 12 }} className="flex justify-between p-2 items-center rounded-md">
        <Typography gutterBottom  className="font-bold">
          ORDER ID : <span className="secondary_color">#12fgw2</span>
        </Typography>

        <Typography gutterBottom  className="font-bold">
          Status : <span className="secondary_color">CANCELLED</span>
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} container className="p-3">
        <OrderItemTable />
      </Grid>

      <Grid size={{ xs: 12 }} container className="p-3">
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Grid size={{ xs: 12 }} container >
              <Grid size={12} className="py-3">
                <Typography className="uppercase font-bold">Customer & Order Details</Typography>{' '}
              </Grid>
              <Grid size={6} className="py-3">
                <Typography gutterBottom  component="div" className='text-sm font-bold'>
                  Customer Name
                </Typography>
              </Grid>
              <Grid size={6} className="py-3">
                <Typography gutterBottom  component="div" className='text-sm'>
                  Progga
                </Typography>
              </Grid>
              <Grid size={12} >   <Divider /></Grid>
           
              <Grid size={6} className="py-3">
                <Typography gutterBottom  component="div"className='text-sm font-bold'>
                  Phone Number
                </Typography>
              </Grid>
              <Grid size={6} className="py-3">
                <Typography gutterBottom  component="div"className='text-sm'>
                  123312312
                </Typography>
              </Grid>
              <Grid size={12} >   <Divider /></Grid>

              <Grid size={6} className="py-3">
                <Typography gutterBottom  component="div"className='text-sm font-bold'>
                  Email Address
                </Typography>
              </Grid>
              <Grid size={6} className="py-3">
                <Typography gutterBottom  component="div"className='text-sm'>
                  sdfs@ggg.ghj
                </Typography>
              </Grid>
              <Grid size={12} >   <Divider /></Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 6 }} container className="p-3">
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Grid size={{ xs: 12 }} container >
              <Grid size={12} className="py-3">
                <Typography className="uppercase font-bold">Delivery Address</Typography>{' '}
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div"className='text-sm font-bold'>
                  Address
                </Typography>
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div"className='text-sm'>
                  Progga
                </Typography>
              </Grid>
             
           
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div"className='text-sm font-bold'>
               Area
                </Typography>
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div"className='text-sm'>
                  123312312
                </Typography>
              </Grid>

              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div"className='text-sm  font-bold'>
                City
                </Typography>
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div"className='text-sm'>
                  sdfs@ggg.ghj
                </Typography>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 6 }} container className="p-3">
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Grid size={{ xs: 12 }} container >
              <Grid size={12} className="py-3">
                <Typography className="uppercase font-bold">Order Summary</Typography>{' '}
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm font-bold'>
                Order Date
                </Typography>
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm'>
                March 10, 2023
                </Typography>
              </Grid>
             
           
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm font-bold'>
                Order Time
                </Typography>
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm'>
                10:24 pm
                </Typography>
              </Grid>

              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm font-bold'>
                Sub Total
                </Typography>
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm'>
                ৳ 948.00
                </Typography>
              </Grid>

              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm font-bold'>
                Delivery Fee
                </Typography>
              </Grid>
              <Grid size={6} className="py-1">
                <Typography gutterBottom  component="div" className='text-sm'>
                ৳ 49.00
                </Typography>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }} container className="p-3">
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Grid size={{ xs: 12 }} container >
              <Grid size={12} className="py-3">
                <Typography className="uppercase font-bold">Order Summary</Typography>{' '}
              </Grid>
            

            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
