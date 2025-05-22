import { IconButton, Typography, Button, Grid2 } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import CartItem from './CartItem';
import { useContext } from 'react';
import { CartContext } from '@/shared/CartContext/CartCtx';
import { useState } from "react";


import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Fragment } from 'react';


export default function MobileSideMenu({ handleDrawerToggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
  const images = [
    '/images/one.jpg',
    '/images/fish.jpg',
    '/images/one.jpg',
    // Add more image paths as needed
  ];
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
    
    const [selectedNode, setSelectedNode] = React.useState(null);
    
    // Update pathText when a new node is selected
    const handleNodeSelect = (nodeId) => {
      setSelectedNode(nodeId);
     
    };
  return (
    <div className="bg-slate-200 flex flex-col justify-between" style={{ height: '100%' }}>
      <Toolbar className="bg-white" >
        <IconButton color="inherit" aria-label="close drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, color: 'black' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
        <Divider />
      </Toolbar>
      

  
    
      <Grid2 className="p-2 overflow-auto flex flex-col justify-start" sx={{height:"100%"}}>
      <TreeView data={data} selectedNode={selectedNode} setSelectedNode={handleNodeSelect} />
      </Grid2>
    
      
    </div>
  );
}




// Helper function to determine if a node is on the path to the selected node
const isNodeInPath = (node, selectedNode) => {
  if (node.id === selectedNode) return true;
  if (node.children) {
    return node.children.some((child) => isNodeInPath(child, selectedNode));
  }
  return false;
};



const TreeNode = ({ node, selectedNode, setSelectedNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
    setSelectedNode(node.id); // Select the node when expanding/collapsing
  };

  const isInPath = isNodeInPath(node, selectedNode);

  return (
    <div className="mt-2 ml-2">
      <div
        onClick={toggleExpand}
        className="flex justify-between items-center cursor-pointer mb-2"
        role="treeitem"
        aria-expanded={isExpanded}
      >
        <Typography
          variant="body1"
          className={`text-sm ${
            isExpanded ? "text-[#ea4b2d] font-bold" : "text-[#00000099]"
          }`}
        >
          {node.name}
        </Typography>
        {hasChildren && (
          <IconButton
            size="small"
            sx={{
              color: isExpanded ? '#ea4b2d' : '#00000099', // Icon color changes when expanded
              transition: 'color 0.3s',
            }}
          >
            {isExpanded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        )}
      </div>
      {isExpanded &&
        hasChildren &&
        node.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        ))}
    </div>
  );
};

const TreeView = ({ data,selectedNode,setSelectedNode }) => {


  return (
    <div>
      
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
      ))}
    </div>
  );
};

