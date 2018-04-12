/**
 *
 * Navigation
 *
 */

import React from 'react';
// import styled from 'styled-components';
import DashboardIcon from 'react-icons/lib/md/format-list-bulleted';
import PastStaysIcon from 'react-icons/lib/md/history';
import AccountIcon from 'react-icons/lib/md/supervisor-account';
import LogoutIcon from 'react-icons/lib/md/input';
import images from 'themes/images';
import { getNavIconColor } from 'utils/helpers';
import NavContainer from './NavContainer';
import NavItem from './NavItem';
import Logo from './Logo';

function Navigation({ logout, navigate, pathname }) {
  return (
    <NavContainer>
      <NavItem first>
        <Logo src={images.havenLogoWhite} />
      </NavItem>
      <div>
        <NavItem onClick={() => navigate('/')}>
          <DashboardIcon size={24} color={getNavIconColor(pathname, ['/'])} />
        </NavItem>
        <NavItem onClick={() => navigate('/paststays')}>
          <PastStaysIcon
            size={24}
            color={getNavIconColor(pathname, ['/paststays'])}
          />
        </NavItem>
        <NavItem onClick={() => navigate('/hotelprofile')}>
          <AccountIcon
            size={24}
            color={getNavIconColor(pathname, [
              '/hotelprofile',
              '/earnings',
              '/teammanagement',
            ])}
          />
        </NavItem>
        <NavItem onClick={logout}>
          <LogoutIcon size={24} color="rgba(255, 255, 255, 0.5)" />
        </NavItem>
      </div>
    </NavContainer>
  );
}

export default Navigation;
