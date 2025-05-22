'use client';
import * as React from 'react';
import { useState } from 'react';

import { Typography, Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid'
import AddRecomItemcard from '@/components/AddRecomItemcard';
import PriceSlider from './priceSlider';
import TreeView from './productCategories';

// Function to generate the path textrr
const generatePathText = (nodeId, nodes, path = []) => {
  for (const node of nodes) {
    const currentPath = [...path, node.name];
    if (node.id === nodeId) {
      return currentPath;
    }
    if (node.children) {
      const result = generatePathText(nodeId, node.children, currentPath);
      if (result) return result;
    }
  }
  return null;
};
const AllProducts = () => {
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const products = [
    {
      id: 1,
      price: 149,
      title: 'NESTLE NESCAFE Classic Instant Coffee Jar 100g',
      image: '/images/bskt1.jpg',
    },
    {
      id: 2,
      price: 299,
      title: 'Lipton Green Tea Bags - 25 Bags',
      image: '/images/bskt2.jpg',
    },
    {
      id: 3,
      price: 499,
      title: 'Tata Tea Premium, 1 kg',
      image: '/images/bskt3.jpg',
    },
    {
      id: 4,
      price: 199,
      title: 'Bru Gold Instant Coffee, 100g',
      image: '/images/cake.jpg',
    },
    {
      id: 5,
      price: 249,
      title: 'Twinings Pure Camomile Tea, 25 Bags',
      image: '/images/egg.jpg',
    },
    {
      id: 6,
      price: 99,
      title: 'Society Tea 250g',
      image: '/images/cake.jpg',
    },
    {
      id: 7,
      price: 349,
      title: 'TGL Co. Himalayan Green Tea Loose Leaf, 100g',
      image: '/images/egg.jpg',
    },
    {
      id: 8,
      price: 599,
      title: 'Lavazza Espresso Italiano Ground Coffee, 250g',
      image: '/images/egg.jpg',
    },
    {
      id: 9,
      price: 129,
      title: 'Wagh Bakri Premium Leaf Tea, 500g',
      image: '/images/bskt2.jpg',
    },
    {
      id: 10,
      price: 179,
      title: 'Tetley Ginger, Mint & Lemon Green Tea, 100g',
      image: '/images/bskt2.jpg',
    },
  ];
  // data.js
  const data = [
    {
      id: 1,
      name: 'Kitchen Appliances',
      children: [
        {
          id: 2,
          name: 'Small Appliances',
          children: [
            { id: 3, name: 'Blenders' },
            { id: 4, name: 'Microwave Ovens' },
            { id: 5, name: 'Toasters' },
            { id: 6, name: 'Coffee Makers' },
          ],
        },
        {
          id: 7,
          name: 'Large Appliances',
          children: [
            { id: 8, name: 'Refrigerators' },
            { id: 9, name: 'Ovens' },
            { id: 10, name: 'Dishwashers' },
            { id: 11, name: 'Stoves' },
          ],
        },
      ],
    },
    {
      id: 12,
      name: 'Home Appliances',
      children: [
        {
          id: 13,
          name: 'Cleaning Appliances',
          children: [
            { id: 14, name: 'Vacuum Cleaners' },
            { id: 15, name: 'Steam Mops' },
            { id: 16, name: 'Robotic Vacuums' },
          ],
        },
        {
          id: 17,
          name: 'Heating and Cooling',
          children: [
            { id: 18, name: 'Air Conditioners' },
            { id: 19, name: 'Space Heaters' },
            { id: 20, name: 'Dehumidifiers' },
          ],
        },
      ],
    },
  ];
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const [selectedNode, setSelectedNode] = useState(null);
  const [pathText, setPathText] = useState('');

  // Update pathText when a new node is selected
  const handleNodeSelect = (nodeId) => {
    setSelectedNode(nodeId);
    const newPathText = generatePathText(nodeId, data)?.join(' > ') || '';
    setPathText(newPathText);
  };

  return (
    <div className="mt-20 pt-6">
      <div
        class=" text-white text-xl h-[120px] mb-2 md:mb-8 flex justify-center items-center"
        style={{
          backgroundImage: "url('https://bk.shajgoj.com/storage/2023/02/Rajkonna-catagory-web-banner.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      ></div>
      <Grid container spacing={4} className="px-5">
        <Grid size={{ xs: 0, md: 3 }} className="pl-5" sx={{display:{xs:"none",md:"block"}}}>
          <PriceSlider />
          <div className="mt-5">
      <Typography className="color_black">Product Categories</Typography>
      <Divider className="pt-3" />


      {/* Pass the handleNodeSelect function as a prop */}
      <TreeView data={data} selectedNode={selectedNode} setSelectedNode={handleNodeSelect} />
    </div>
        </Grid>

        <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
          <Grid size={{ xs: 12 }} className="flex  items-center justify-between">
            <Stack direction="row" spacing={1} className="items-center"sx={{display:{xs:"none",md:"flex"}}}>
              {pathText && <Chip label={pathText} size="small" color="secondary" className="text-xs" onDelete={handleDelete} />}
              <Typography color="secondary" className="text-xs" sx={{ cursor: 'pointer' }}>
                Clear All
              </Typography>
            </Stack>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select id="demo-select-small" value={age} size="small" onChange={handleChange}>
                <MenuItem value={10}>Default Soring</MenuItem>
                <MenuItem value={20}>Price : Low to High</MenuItem>
                <MenuItem value={30}>Price : High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {products.map((product, index) => (
            <Grid size={{ xs: 12, md: 3 }} key={index}>
              <AddRecomItemcard product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default AllProducts;
