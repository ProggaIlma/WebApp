
"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box,Button} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

import MouseHoverPopover from './AppBarCategoryPopover';


export default function TopAppbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  


  const kitchenItems = [
    "Stainless Steel Knife Set",
    "Non-Stick Frying Pan",
    "Blender",
    "Wooden Cutting Board",
    "Microwave Oven",
    "Electric Kettle",
    "Measuring Cups and Spoons Set",
    "Glass Mixing Bowls",
    "Toaster",
    "Silicone Spatula Set"
  ]
  const menuId = 'primary-search-account-menu';
 
 

  return (
    <Box  sx={{
      display: { xs: 'none',md:'block' },
      flexGrow: 1
    }}>
      <AppBar position="fixed"  sx={{boxShadow:'none',top: { sm: '0px', md: '66px',lg:'56px' } ,transition: 'top 0.3s'}}>
        <Toolbar sx={{minHeight:"50px !important",backgroundColor:"white"}} className='shadow-xl'>
      
        
        
        
          <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
          <MouseHoverPopover menuname={'Home Appliances'} menulist={kitchenItems}/>
          

            <MouseHoverPopover menuname={'Kitchen Appliances'} menulist={kitchenItems}/>


            <MouseHoverPopover menuname={'Kids'} menulist={kitchenItems}/>
          

          <MouseHoverPopover menuname={'Make Up'} menulist={kitchenItems}/>


          <Button className='bg_secondary_color rounded-3xl text-white mr-2 px-5 py-2 text-xs'>Clearance Sale</Button>
          <Button className='bg_primary_color rounded-3xl text-white mr-2 px-5 text-xs py-2'>Buy 1 Get 1</Button>
          <Button className='bg-purple-950 rounded-3xl text-white mr-2 px-5 text-xs py-2'> Anniversary Sale</Button>

           
          </Box>
         
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}
