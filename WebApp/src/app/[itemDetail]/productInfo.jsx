import TextRating from '@/components/Rating';
import { Typography, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import LikeButton from '@/components/LikeButton';
import Buttons from '@/components/Buttons';
import CounterButton from '@/components/CounterButton';

const ProductInfo = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography>Refreshing Beauty COMBO Offer 01 (Rajkonna Glow Booster Facial Wash With Jojoba Beads + Pond’s Super Light Gel with Hyaluronic Acid + Vitamin E)</Typography>
        </Grid>

        <div className="flex justify-between items-center w-full">
          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#EA4B2D', fontWeight: 'bold' }} className="text-lg mr-2">
            ৳ 399.00
          </Typography>
          <TextRating />
        </div>
        <div className="flex items-center w-full">
          <LikeButton />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <CounterButton />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Buttons />
        </div>
        <div
          style={{
            backgroundColor: '#f3f4f6',
            borderRadius: '10px',
            padding: '15px',
          }}
        >
          <Typography sx={{ color: '#00000099' }}>
            Niacinamide (Vitamin B3) is indicated to reduce the appearance of skin blemishes and congestion. A high 10% concentration of this vitamin is supported in the formula by
            zinc salt of pyrrolidone carboxylic acid to balance visible aspects of sebum activity. Contraindications: If topical Vitamin C (L-Ascorbic Acid and/or Ethylated
            L-Ascorbic Acid) is used as part of skincare, it should be applied at alternate times with this formula (ideally Vitamin C in the PM and this formula in the AM).
            Otherwise, Niacinamide can affect integrity of the Vitamin C. Notes: While Niacinamide and Zinc PCA reduce the look of blemishes and balance visible sebum activity,
            neither is a treatment for acne. For persistent acne-related conditions, we recommend the use of Benzoyl Peroxide and/or Retinoic Acid. DECIEM doesn't recommend ongoing
            use of BHA such as Salicylic Acid for persistent blemishes. For temporary improvement in appearance of blemishes, Salicylic Acid would help. This formulation can be
            used alongside acne treatments if desired for added visible skin benefits. Independent studies suggest Niacinamide is also an effective ingredient for brightening skin
            tone.
          </Typography>
        </div>
        <Grid size={{ xs: 12 }}>
          <Typography gutterBottom component="div">
            Delivery & Return
          </Typography>
          <Typography gutterBottom sx={{ color: '#00000099' }}>
            SKU: 4559
          </Typography>
          <Typography gutterBottom sx={{ color: '#00000099' }}>
            Categories: Skin, Offers, Face, Shop By Concern, Skin Lightening, Pigmentation, Acne Treatment, Oil Control, Dull Skin Treatment, Serums/Oils, Pore Care, Top Selling
          </Typography>
          <Typography gutterBottom sx={{ color: '#00000099' }}>
            Tags: FMCG, Hot Deals
          </Typography>
          <Typography gutterBottom sx={{ color: '#00000099' }}>
            Brands: The Ordinary
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInfo;
