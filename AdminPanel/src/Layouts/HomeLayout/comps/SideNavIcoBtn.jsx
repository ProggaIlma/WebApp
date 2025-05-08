//SideNavIcoBtn
import React, { useContext } from 'react';
import { NavContext } from '@Shared/NavContexts/nav-contexts';
import { Tooltip, Badge } from 'antd';

import Subscriber from '@Assets/SideNavIcons/Subscriber.svg';
import Payment from '@Assets/SideNavIcons/Payment.svg';
import Subscription from '@Assets/SideNavIcons/Subscription.svg';
import Settings from '@Assets/SideNavIcons/Settings.svg';
import "./SideNavIcoBtn.css";
const SideNavIcoBtn = ({ el, OpenDrawerOrNavigate, index, newAnnouncement, unreadConv }) => {
    const selectedIcons = {
       
        Subscriber: Subscriber,
        Payment: Payment,
       
        Subscription: Subscription,
        Settings: Settings
    };
    const { iconsLevel } = useContext(NavContext);

    return (
        <Tooltip placement="right" title={el.title} color={'#201B37'}

            overlayStyle={{ padding: "15px", width: "165px", fontSize: "14px" }}>
<div>             <img src={selectedIcons[el.name]}
                    className={iconsLevel == index ? 'siconbtn-selected' : 'siconbtn'}

                    onClick={() => OpenDrawerOrNavigate(el.routePath)} />
            </div>   
        </Tooltip>);
}

export default SideNavIcoBtn;

