import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #61dafb;
  }
`;

const Header = () => (
  <HeaderContainer>
    <StyledLink to="/"><Logo>ADAFund</Logo> </StyledLink>
    <NavMenu>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/faq">FAQ</StyledLink>
      <StyledLink to="/requests">Requests</StyledLink>
   
      <StyledLink to="/dashboard">Dashboard</StyledLink>
    </NavMenu>
  </HeaderContainer>
);

export default Header;
