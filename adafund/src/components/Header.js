import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #20232a;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: white;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    color: #61dafb;
  }
`;

const Header = () => (
  <HeaderContainer>
    <Logo>ADAFund</Logo>
    <NavMenu>
      <NavItem href="#">Home</NavItem>
      <NavItem href="#">Requests</NavItem>
      <NavItem href="#">Contact</NavItem>
    </NavMenu>
  </HeaderContainer>
);

export default Header;
