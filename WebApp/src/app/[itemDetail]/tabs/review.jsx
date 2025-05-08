import TextRating from '@/components/Rating';
import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import * as React from 'react';


export default function Review() {


    return <React.Fragment style={{color:"#00000099"}}>
      <Grid container spacing={2} className="mb-4">
          <Grid size={{ xs: 1,lg:1 }} className="flex justify-center">
          <Avatar>H</Avatar>
          </Grid>

          <Grid size={{ xs: 9 ,lg:10}}>
            <Typography sx={{fontWeight:"bold"}}>Afsana Naznin - February 7, 2022</Typography>
            <Typography>I got a fake product. sajgoj, koster tk gulo diye chok Bazar r shampoo na sell krleo paren. Shame on your business</Typography>
          </Grid>

          <Grid size={{ xs: 2,lg:1 }}>
            <TextRating/>
          </Grid>
       </Grid>
       <Grid container spacing={2} className="mb-2">
          <Grid size={{ xs: 1,lg:1 }} className="flex justify-center">
          <Avatar>H</Avatar>
          </Grid>

          <Grid size={{ xs: 9 ,lg:10}}>
            <Typography>Afsana Naznin - February 7, 2022</Typography>
            <Typography>I got a fake product. sajgoj, koster tk gulo diye chok Bazar r shampoo na sell krleo paren. Shame on your business</Typography>
          </Grid>

          <Grid size={{ xs: 2,lg:1 }}>
            <TextRating/>
          </Grid>
       </Grid>
      
    </React.Fragment>
}