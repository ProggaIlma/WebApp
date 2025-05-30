import React, { useContext } from 'react';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Tooltip } from 'antd';
import { ProductOutlined } from '@ant-design/icons';
import './SideNavIcoBtn.css';

// Icon mapping
const selectedIcons = {
  Product: ProductOutlined,
};

const SideNavIcoBtn = ({ el, OpenDrawerOrNavigate, index }) => {
  const { iconsLevel } = useContext(NavContext);

  // Get the appropriate icon component
  const IconComponent = selectedIcons[el.name]; // e.g., el.name = 'Product'

  return (
    <Tooltip
      placement="right"
      title={el.title}
      color={'#201B37'}
      overlayStyle={{ padding: '15px', width: '165px', fontSize: '14px' }}
    >
      <div>
        {IconComponent && (
          <IconComponent
            style={{ fontSize: '24px' }}
            className={iconsLevel === index ? 'siconbtn-selected' : 'siconbtn'}
            onClick={() => OpenDrawerOrNavigate(el.routePath)}
          />
        )}
      </div>
    </Tooltip>
  );
};

export default SideNavIcoBtn;
