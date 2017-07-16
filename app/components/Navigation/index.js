/**
*
* Navigation
*
*/

import React from 'react';
// import styled from 'styled-components';
import DashboardIcon from 'react-icons/lib/md/tv';
import AccountIcon from 'react-icons/lib/md/supervisor-account';
import LogoutIcon from 'react-icons/lib/go/sign-out';
import TopNavWrapper from './TopNavWrapper';
import BottomNavWrapper from './BottomNavWrapper';
import BottomNavItem from './BottomNavItem';
import NavItem from './NavItem';

function Navigation({
  logout,
  viewDashboard,
  viewAccount,
  bottomNavItems,
  pathname,
}) {
  return (
    <nav>
      <TopNavWrapper>
        <div>
          <NavItem first>HAVEN</NavItem>
        </div>
        <div>
          <NavItem onClick={viewDashboard}>
            <DashboardIcon size={28} color="white" />
          </NavItem>
          <NavItem onClick={viewAccount}>
            <AccountIcon size={28} color="white" />
          </NavItem>
          <NavItem onClick={logout}>
            <LogoutIcon size={28} color="white" />
          </NavItem>
        </div>
      </TopNavWrapper>
      <BottomNavWrapper>
        {bottomNavItems
          .toJS()
          .map((item, index) =>
            <BottomNavItem
              key={item.name}
              item={item}
              index={index}
              pathname={pathname}
            />
          )}
      </BottomNavWrapper>
    </nav>
  );
}

export default Navigation;
