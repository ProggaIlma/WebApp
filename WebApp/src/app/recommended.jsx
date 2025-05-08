
"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import RecomItemcard from '@/components/RecomItemcard';



export default function Recom() {
    return (
        <Box sx={{ flexGrow: 1}} className='my-5 '>
        
            
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 6, md: 3 ,lg:2 }}>
                    <RecomItemcard />
                </Grid>
                <Grid size={{ xs: 6, md: 3 ,lg:2 }}>
                    <RecomItemcard />
                </Grid> 
                <Grid size={{ xs: 6, md: 3 ,lg:2 }}>
                    <RecomItemcard />
                </Grid>
                 <Grid size={{ xs: 6, md: 3 ,lg:2 }}>
                    <RecomItemcard />
                </Grid>
                <Grid size={{ xs: 6, md: 3 ,lg:2 }}>
                    <RecomItemcard />
                </Grid>
            </Grid>
        </Box>
    );
}
