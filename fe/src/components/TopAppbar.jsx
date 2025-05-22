import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Toolbar } from '@mui/material';
import MouseHoverPopover from './AppBarCategoryPopover';

export default function TopAppbar() {
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
  ];

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        flexGrow: 1,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          top: { sm: '66px', md: '66px', lg: '56px' },
          backgroundColor: 'white',
          boxShadow: 'none',
          transition: 'top 0.3s',
      
        }}
      >
        <Toolbar
          sx={{
            minHeight: '50px !important',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MouseHoverPopover menuname="Home Appliances" menulist={kitchenItems} />
            <MouseHoverPopover menuname="Kitchen Appliances" menulist={kitchenItems} />
            <MouseHoverPopover menuname="Kids" menulist={kitchenItems} />
            <MouseHoverPopover menuname="Make Up" menulist={kitchenItems} />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button className="bg_secondary_color rounded-3xl text-white px-5 py-2 text-xs">Clearance Sale</Button>
            <Button className="bg_primary_color rounded-3xl text-white px-5 py-2 text-xs">Buy 1 Get 1</Button>
            <Button className="bg-purple-950 rounded-3xl text-white px-5 py-2 text-xs">Anniversary Sale</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
