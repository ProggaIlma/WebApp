//SideNavIcoBtn
import React, { useContext } from 'react';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Tooltip, Badge } from 'antd';

import Payment from '@Assets/SideNavIcons/Payment.svg';

import './SideNavIcoBtn.css';
const SideNavIcoBtn = ({ el, OpenDrawerOrNavigate, index, newAnnouncement, unreadConv }) => {
  const selectedIcons = {
    Payment: Payment,
  };
  const { iconsLevel } = useContext(NavContext);

  return (
    <Tooltip placement="right" title={el.title} color={'#201B37'} overlayStyle={{ padding: '15px', width: '165px', fontSize: '14px' }}>
      <div>
        {' '}
        <img src={selectedIcons[el.name]} className={iconsLevel == index ? 'siconbtn-selected' : 'siconbtn'} onClick={() => OpenDrawerOrNavigate(el.routePath)} />
      </div>
    </Tooltip>
  );
};

export default SideNavIcoBtn;
