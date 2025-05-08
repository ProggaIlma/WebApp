"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import TextRating from './Rating';

export default function RecomItemcard() {
  return (
    <Card sx={{ maxWidth: 545, borderRadius: '8px' }}>
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
         
          <div className="flex items-center text-xs">

          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#EA4B2D' }} className='text-lg mr-2'>
            ৳399
          </Typography>
            <Typography className="text-xs grey">-74%</Typography>
          </div>
          <div className="w-full">
          <TextRating/>   </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
