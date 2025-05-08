// components/TreeView.js
import { useState } from "react";
import Typography from "@mui/material/Typography";

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

  // Generate a random number between 1 and 100 for each node
  const randomNumber = 45;

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleSelect = () => setSelectedNode(node.id);

  const isInPath = isNodeInPath(node, selectedNode);

  return (
    <div className="mt-2 ml-2">
      <div
        onClick={() => {
          toggleExpand();
          handleSelect();
        }}
        className="flex justify-between items-center cursor-pointer mb-2"
      >
        <Typography
          variant="body1"
          className={`text-sm ${isInPath ? "text-[#ea4b2d] font-bold" : "text-[#00000099]"}`}
        >
          {node.name}
        </Typography>
        <Typography
          variant="body1"
          className={`text-sm ${
            isInPath 
              ? "text-white bg-[#ea4b2d] rounded-xl text-[12px] px-3" // Styled selected number
              : "text-[#232323] bg-[#ffffff] rounded-xl text-[12px] px-3" // Styled unselected number
          }`}
        >
          {randomNumber}
        </Typography>
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

export default TreeView;
