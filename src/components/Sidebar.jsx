import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGamepad, FaNewspaper, FaUserCog } from 'react-icons/fa';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 70px;
  height: calc(100vh - 70px);
  width: ${props => props.sidebarOpen ? '250px' : '70px'};
  background: rgba(10, 10, 20, 0.95);
  backdrop-filter: blur(10px);
  transition: width 0.3s ease;
  z-index: 1000;
  border-right: 1px solid rgba(138, 43, 226, 0.2);
`;

const ToggleButton = styled.button`
  position: absolute;
  right: -15px;
  top: 20px;
  width: 30px;
  height: 30px;
  background: rgba(138, 43, 226, 0.2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(138, 43, 226, 0.4);
    transform: scale(1.1);
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(138, 43, 226, 0.2);
  }

  &.active {
    background: rgba(138, 43, 226, 0.3);
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.sidebarOpen ? '1rem' : '0'};
  transition: all 0.3s ease;
`;

const LinkText = styled.span`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  opacity: ${props => props.sidebarOpen ? '1' : '0'};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`;

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <SidebarContainer sidebarOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? '◀' : '▶'}
      </ToggleButton>
      <NavLinks>
        <NavLink to="/developer-portal">
          <IconWrapper sidebarOpen={isOpen}>
            <FaUserCog size={20} />
          </IconWrapper>
          <LinkText sidebarOpen={isOpen}>Developer Portal</LinkText>
        </NavLink>
        <NavLink to="/games">
          <IconWrapper sidebarOpen={isOpen}>
            <FaGamepad size={20} />
          </IconWrapper>
          <LinkText sidebarOpen={isOpen}>Explore Games</LinkText>
        </NavLink>
        <NavLink to="/news">
          <IconWrapper sidebarOpen={isOpen}>
            <FaNewspaper size={20} />
          </IconWrapper>
          <LinkText sidebarOpen={isOpen}>News</LinkText>
        </NavLink>
      </NavLinks>
    </SidebarContainer>
  );
}

export default Sidebar; 