import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const NavContainer = styled(motion.nav)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${props => props.scrolled ? '0.8rem 2rem' : '1.5rem 2rem'};
  background: ${props => props.scrolled 
    ? `${props.theme.colors.surface}` 
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${props => props.scrolled 
    ? `1px solid ${props.theme.colors.border}` 
    : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  
  .jdt {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 10px ${props => props.theme.colors.glow}40;
  }
  
  .engineering {
    font-size: 0.9rem;
    font-weight: 400;
    color: ${props => props.theme.colors.textSecondary};
    display: block;
    margin-top: -5px;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.colors.surface};
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    gap: 3rem;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  position: relative;
  color: ${props => props.isActive 
    ? props.theme.colors.accent 
    : props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.surface};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${props => props.theme.colors.glow}20;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.colors.accent};
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 50px;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.accent}20;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 15px ${props => props.theme.colors.glow}30;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products-services', label: 'Products & Services' },
    { path: '/past-projects', label: 'Past Projects' },
    { path: '/newsroom', label: 'Newsroom' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <NavContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="jdt">JDT</span>
            <span className="engineering">ENGINEERING</span>
          </Link>
        </Logo>

        <NavLinks isOpen={mobileMenuOpen}>
          <CloseButton onClick={() => setMobileMenuOpen(false)}>
            ×
          </CloseButton>
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              isActive={location.pathname === item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <ThemeToggle
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{theme.isDark ? '☀️' : '🌙'}</span>
            <span>{theme.isDark ? 'Light' : 'Dark'}</span>
          </ThemeToggle>
        </NavLinks>

        <MenuButton onClick={() => setMobileMenuOpen(true)}>
          ☰
        </MenuButton>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar; 