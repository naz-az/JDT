import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';

// Import pages (we'll create these)
import Home from './pages/Home';
import ProductsServices from './pages/ProductsServices';
import Newsroom from './pages/Newsroom';
import Contact from './pages/Contact';
import PastProjects from './pages/PastProjects';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Theme interface
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    glow: string;
  };
  isDark: boolean;
}

// Light and Dark themes
const lightTheme: Theme = {
  colors: {
    primary: '#1a1a1a',
    secondary: '#2d5a41',
    accent: '#00c853',
    background: 'linear-gradient(135deg, #f1f8f4 0%, #c8e6c9 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#1a1a1a',
    textSecondary: '#666666',
    border: 'rgba(255, 255, 255, 0.3)',
    glow: '#00e676',
  },
  isDark: false,
};

const darkTheme: Theme = {
  colors: {
    primary: '#ffffff',
    secondary: '#00e676',
    accent: '#4caf50',
    background: 'linear-gradient(135deg, #0d1b0f 0%, #1b2e1f 50%, #263238 100%)',
    surface: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: 'rgba(255, 255, 255, 0.1)',
    glow: '#00e676',
  },
  isDark: true,
};

// Global styles
const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

// Theme Context
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: darkTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Router>
          <AppContainer>
            <Navbar />
            <MainContent>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products-services" element={<ProductsServices />} />
                  <Route path="/newsroom" element={<Newsroom />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/past-projects" element={<PastProjects />} />
                </Routes>
              </AnimatePresence>
            </MainContent>
            <Footer />
          </AppContainer>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
