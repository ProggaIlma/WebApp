import { Typography,Button, Grid, Grid2 } from '@mui/material';
import FlashSale from './flashSale'
import Recom from './recommended';
import Category from './categories';
import FullPageCarousel from '@/components/FullPageCarousel';


const images = [
  '/images/one.jpg',
  '/images/fish.jpg',
  '/images/one.jpg',
  // Add more image paths as needed
];

const Home = ()=>{
    return <div className='mt-15'>
        <Grid2 sx={{marginTop:{xs:"123px",md:"87px"}}}>
        <FullPageCarousel images={images} />
        </Grid2>
        
        <div className='px-5 md:px-7'>
        <Typography sx={{my:2,textAlign:{xs:'center',md:'start'}}} className='text-2xl'>Flash Sale</Typography>
        <FlashSale/>

        <Typography sx={{my:2,textAlign:{xs:'center',md:'start'}}} className='text-2xl'>Categories</Typography>
        <Category/>
        
        <Typography sx={{mt:4,textAlign:{xs:'center',md:'start'}}} className='text-2xl'>Just For You</Typography>
        <Recom/>

        <div className='flex justify-center items-center pb-5'>
        <Button variant="outlined" sx={{width:"400px"}}>Load More</Button>
        </div>
        </div>

        </div>
}

export default Home;