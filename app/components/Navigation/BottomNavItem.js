import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import H5 from 'components/fonts/H5';
import colors from 'themes/colors';
import NavItem from './NavItem';

const Wrapper = styled(NavItem)`
  align-items: center;
  padding: 1em 0;
  border-bottom: ${props => props.selected && `2px solid ${colors.bsPrimary}`}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    color: #6cc0e5;
  }
  &:focus {
    color: #6cc0e5;
  }
`;

function BottomNavItem({ item, index, pathname }) {
  return (
    <Wrapper first={index === 0} selected={pathname === item.path}>
      <StyledLink to={item.path}>
        <H5 mb="0">
          {item.name}
        </H5>
      </StyledLink>
    </Wrapper>
  );
}

export default BottomNavItem;
