"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function Itemcard() {
  return (
    <Card sx={{ maxWidth: 545, borderRadius: '10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image='/images/cake.jpg'
          alt="green iguana"
          sx={{ objectFit: "contain",transition: "transform 0.7s ease-in-out",
            "&:hover": { transform: "scale3d(1.05, 1.05, 1)" } }}
        />
        <CardContent>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} className='text-sm'>

            NESTLE NESCAFE Classic Instant Coffee Jar 100g
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#EA4B2D' }} className='text-lg'>
            ৳399
          </Typography>
          <div className="flex align-center text-xs">

            <Typography sx={{ mr: 1, textDecoration: 'line-through', color: "#9e9e9e" }} className='text-xs'>৳1200</Typography>

            <Typography className='text-xs'>-74%</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
