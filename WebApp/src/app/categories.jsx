
"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Catcard from '@/components/Catcard';
import { Typography,Button,Divider } from '@mui/material';



export default function Category() {
    return (
        <Box sx={{ flexGrow: 1}} className='bg-white'>
        
            <Box >
            <Grid container columns={24} sx={{justifyContent:"center"}}>

                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Coffee and Accessories'} img={'/images/cake.jpg'}/>
                </Grid> 
                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/cake.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Coffee and Accessories'} img={'/images/egg.jpg'}/>
                </Grid>
                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Coffee and Accessories'} img={'/images/egg.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Chain & Link Bracelets'} img={'/images/egg.jpg'}/>
                </Grid>
                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid> 
                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
                 <Grid size={{ xs:6,sm:4, md:3 }}>
                    <Catcard catname={'Egg Boilers'} img={'/images/egg.jpg'}/>
                </Grid>
            </Grid></Box>
        </Box>
    );
}
