"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function Catcard({catname,img}) {
  return (
    <Card sx={{  borderRadius: '0px', boxShadow: 'none',
    border:"1px solid #e2e2e2"}}>
      <CardActionArea className="flex flex-col">
        <CardMedia
        
          component="img"
          image={img}
          alt="green iguana"
          sx={{ objectFit: "contain",
            width:'60px',height:'60px',paddingTop:"15px",transition: "transform 0.7s ease-in-out",
            "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }
          }}
        />
        <CardContent>

         <Typography component='div' className='text-center' sx={{ 
        height:'40px',
         padding:'2px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'}} >
        {catname}

         </Typography>

     
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
