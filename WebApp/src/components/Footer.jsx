'use client';

import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: 'white'}}>
      {' '}
      
      <Box sx={{ position: 'relative', overflow: 'hidden', color: 'white' }}>
       
        <Box sx={{ display: {  xs: 'none',sm: 'block', md: 'none' }}}>
        <svg viewBox="0 25 100 15" preserveAspectRatio="none" >
 <g>
  <path d="M100,30 Q70,40 50,30 T0,30 v10 h100Z" 
        style={{fill:'#44776d', strokeLinejoin:'round', stroke:'#ffffff',strokeWidth:"0"}} 
        />
 </g>
</svg></Box>
        <Box
          component="svg"
          viewBox="0 0 1240 280" 
          sx={{
            fill: '#44776d', display: { xs: 'none', md: 'block' } 
          }}
        >
          <path
           d="M0,192L40,202.7C80,213,160,235,240,237.3C320,240,400,224,480,213.3C560,202,640,192,
           720,186.7C800,181,880,181,960,186.7C1040,192,1120,202,1200,213.3C1280,224,1360,235,1400
           ,240L1440,245L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,
           320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </Box>

        <Box
          sx={{
            position: 'relative',
            backgroundColor: '#44776d',
            zIndex: 1, // Ensure content appears above wave
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {/* Logo */}
              <Grid item xs={12} sm={4} display="flex" flexDirection="column" >
                <Typography variant="body2"align='center' className="text-[28px] pt-2 bold">
                  ApexCart
                </Typography>
                <Typography variant="body2"align='center' className="text-[14px] pt-2">
                  Share Your Love on Social Media
                </Typography>
                <Box mt={2} display="flex" justifyContent='center'>
                  <IconButton href="https://www.facebook.com" color="inherit" target="_blank" rel="noopener">
                    <Facebook />
                  </IconButton>
                  <IconButton href="https://www.twitter.com" color="inherit" target="_blank" rel="noopener">
                    <Twitter />
                  </IconButton>
                  <IconButton href="https://www.instagram.com" color="inherit" target="_blank" rel="noopener">
                    <Instagram />
                  </IconButton>
                </Box>
                <Typography variant="body2" align="center" gutterBottom className="text-[14px] pt-2">
                  Payments Accepted:
                </Typography>
                {/* Payments Accepted */}
                <Box mt={2} display="flex" justifyContent="center">
                  <Box display="flex" >
                    <img src={'/images/visa.jpg'} alt="Visa" style={{ width: '40px', margin: '0 8px' }} />
                    <img src={'/images/mastercard.jpg'} alt="MasterCard" style={{ width: '40px', margin: '0 8px' }} />
                    <img src={'/images/paypal.jpg'} alt="PayPal" style={{ width: '40px', margin: '0 8px' }} />
                  </Box>
                </Box>
              </Grid>
              {/* Top Categories */}
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" className="text-[16px] pt-2 secondary_color" gutterBottom>
                  Top Categories
                </Typography>
                {['Makeup', 'Skin', 'Hair', 'Personal Care', 'Natural'].map((category) => (
                  <Typography variant="body2" key={category} className="text-[14px] pt-2">
                    <a href={`/${category.toLowerCase().replace(/ & /g, '-')}`} className="text-white hover:text-[#ea4b2d] no-underline">
                      {category}
                    </a>
                  </Typography>
                ))}
              </Grid>

              {/* Quick Links */}
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" className="text-[16px] pt-2 secondary_color" gutterBottom>
                  Quick Links
                </Typography>
                {['Offers', 'Mens Products', 'Skin Concerns', 'New Arrival', 'Makeup'].map((link) => (
                  <Typography variant="body2" key={link} className="text-[14px] pt-2">
                    <a href={`/${link.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-white hover:text-[#ea4b2d] no-underline">
                      {link}
                    </a>
                  </Typography>
                ))}
              </Grid>

              {/* Help */}
              <Grid item xs={12} sm={2}>
                <Typography variant="h6" className="text-[16px] pt-2 secondary_color" gutterBottom>
                  Help
                </Typography>
                {['Contact Us', 'FAQs', 'Shipping & Delivery', 'Terms & Conditions', 'Refund & Return Policy', 'Privacy Policy'].map((helpLink) => (
                  <Typography variant="body2" key={helpLink} className="text-[14px] pt-2">
                    <a href={`/${helpLink.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-white hover:text-[#ea4b2d] no-underline">
                      {helpLink}
                    </a>
                  </Typography>
                ))}
              </Grid>
            </Grid>

            {/* Social Media Icons */}

            {/* Copyright Text */}
            <Box mt={2} display="flex" justifyContent="center">
              <Typography variant="body2" align="center" className="text-[14px] pt-2">
                &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
