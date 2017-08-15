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
import NavContainer from './NavContainer';
import NavItem from './NavItem';

function Navigation({ logout, viewDashboard, viewAccount }) {
  return (
    <NavContainer>
      <NavItem first>HAVEN</NavItem>
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
    </NavContainer>
  );
}

export default Navigation;
