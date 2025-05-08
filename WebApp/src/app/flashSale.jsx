
"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Itemcard from '@/components/Itemcard'
import { Typography,Button,Divider } from '@mui/material';
import { useRouter } from 'next/navigation'


export default function FlashSale() {
    const router = useRouter()
    return (
        <Box sx={{ flexGrow: 1,backgroundColor:"white" }} className='my-4 '>
         <Box sx={{ px: 3 ,py:1}}>   
               <div className='flex justify-between w-full items-center'>
                <Typography className='text-sm' sx={{color:"#44776d",fontWeight:"bold"}}>On Sale Now</Typography>
                <Button sx={{border:'1px solid #009688'}} onClick={() => router.push('/allProducts')}>Show All Products</Button>
               </div>
           </Box>
            <Divider /> 
            <Box sx={{ py: 3 }}>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 6, md: 3 ,lg:2}}>
                    <Itemcard />
                </Grid>
                <Grid size={{ xs: 6, md: 3 ,lg:2 }}>
                    <Itemcard />
                </Grid> 
                <Grid size={{ xs: 6, md: 3 ,lg:2 }}>
                    <Itemcard />
                </Grid>
                 <Grid size={{ xs: 6, md: 3  ,lg:2}}>
                    <Itemcard />
                </Grid>
                <Grid size={{ xs: 6, md: 3  ,lg:2}}>
                    <Itemcard />
                </Grid>
            </Grid></Box>
        </Box>
    );
}
