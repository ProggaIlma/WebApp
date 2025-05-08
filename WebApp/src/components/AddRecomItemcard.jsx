'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { CartContext } from '@/shared/CartContext/CartCtx';
import { useContext, useEffect, useState } from 'react';
import Grid2 from '@mui/material/Grid2';

const AddRecomItemcard = ({ product }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  return (
    <Card sx={{ maxWidth: 545, borderRadius: '10px',}}>
      <Grid container spacing={1}className="w-full flex items-center justify-center">
        <Grid size={{ xs: 3, md: 12 }}>
          <CardMedia
            component="img"
            image={product?.image}
            alt="green iguana"
            sx={{
              objectFit: 'contain',
              transition: 'transform 0.7s ease-in-out',
             
              padding: { xs: '8px', md: '0px' },
              '&:hover': { transform: 'scale3d(1.05, 1.05, 1)' },
            }}
          />
        </Grid>
        <Grid size={{ xs: 9, md: 12 }}>
          <CardContent>
            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', minHeight: '50px' }} className="text-sm">
              {product?.title}
            </Typography>

            <div className="flex  items-center text-xs">
              <Typography gutterBottom variant="h5" component="div" color="secondary" className="text-lg mr-2">
                ৳ {product?.price}
              </Typography>

              <Typography sx={{ mr: 1, textDecoration: 'line-through', color: '#9e9e9e' }} className="text-xs">
                ৳1200
              </Typography>
            </div>
          </CardContent>
        </Grid>
        <div className="w-full flex items-center justify-center pl-3 pr-3 pb-3">
          <Button variant="contained" sx={{ width: '100%', borderRadius: '8px' }} onClick={() => addToCart(product)}>
            Add to cart
          </Button>{' '}
        </div>
      </Grid>
    </Card>
  );
};
export default AddRecomItemcard;
