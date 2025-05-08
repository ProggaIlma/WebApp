


"use client";

import { IconButton } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';


export default function LikeButton() {
return (
    <IconButton
    disableRipple
    sx={{
       backgroundColor: "black", color: "white", borderRadius: "10px", "&.MuiButtonBase-root:hover": {
          bgcolor: "black"
       }
    }} aria-label="add to shopping cart">
       <FavoriteIcon />
    </IconButton>
)}