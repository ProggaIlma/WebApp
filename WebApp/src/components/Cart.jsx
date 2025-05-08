import { IconButton, Typography, Button, Grid2 } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import CartItem from './CartItem';
import { useContext } from 'react';
import { CartContext } from '@/shared/CartContext/CartCtx';
import { Fragment } from 'react';

const images = [
  '/images/one.jpg',
  '/images/fish.jpg',
  '/images/one.jpg',
  // Add more image paths as needed
];

export default function DrawerBody({ handleDrawerToggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

  return (
    <div className="bg-slate-200 flex flex-col justify-between" style={{ height: '100%' }}>
      <Toolbar className="bg-white" >
        <IconButton color="inherit" aria-label="close drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, color: 'black' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Cart
        </Typography>
        <Divider />
      </Toolbar>
      

    {  cartItems.length==0 ?<div className="flex justify-center items-center flex-col bg-slate-200" style={{height:"100%"}}>

        <ShoppingBagIcon sx={{ height: '116px', width: '130px', paddingTop: '40px' }} />
        <Typography className="mt-8">Your Shopping Bag is Empty</Typography>
        <Button className="mt-10 text-white bg-black" onClick={handleDrawerToggle}>
          Start Shopping
        </Button>
      
      
      </div>:
      <Fragment>
      <Grid2 className="p-2 overflow-auto flex flex-col justify-start" sx={{height:"100%"}}>
      {cartItems.map((item) => (
      <CartItem removeFromCart={removeFromCart} item={item}/>
        ))}
      </Grid2>
      <div className="bg-white flex justify-between p-4" >
        <div>
          <Typography component="div" className="text-sm">Cart Total:</Typography>
          <Typography component="div" className="text-sm secondary_color">৳ 4161.00</Typography>
        </div>
        <div>
          <Button variant="contained" endIcon={<ChevronRightIcon />} size="large">
            PROCEED
          </Button>
        </div>
      </div>
      </Fragment>}
    </div>
  );
}
