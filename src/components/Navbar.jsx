import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUser, FaGamepad, FaNewspaper, FaUsers, FaBlog } from 'react-icons/fa';

const Nav = styled.nav`
  background: rgba(0, 0, 0, 0.8);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
`;

const NavLogo = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #00ffff;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #00ffff;
    transform: translateY(-2px);
  }
`;

const MobileIcon = styled.div`
  display: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavLogo to="/">
        <FaGamepad /> Gameipedia
      </NavLogo>

      <MobileIcon onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileIcon>

      <NavMenu isOpen={isOpen}>
        <NavLink to="/games">
          <FaGamepad /> Games
        </NavLink>
        <NavLink to="/news">
          <FaNewspaper /> News
        </NavLink>
        <NavLink to="/community">
          <FaUsers /> Community
        </NavLink>
        <NavLink to="/posts">
          <FaBlog /> Posts
        </NavLink>
        <NavLink to="/login">
          <FaUser /> Login
        </NavLink>
      </NavMenu>
    </Nav>
  );
};

export default Navbar; 