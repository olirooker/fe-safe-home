import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './components/useDarkMode';
import { GlobalStyles } from './components/Globalstyle';
import { lightTheme, darkTheme } from './components/Themes';
import Toggle from './components/Toggler';
import Header from './components/Header';
import MainContent from './components/MainContent';
import './components/styles/App.css';
import './components/styles/header.css';
import './components/styles/mainContent.css';

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className='App'>
          <div className='headerContainer'>
            <Toggle theme={theme} toggleTheme={themeToggler} />
            <Header />
          </div>
          <MainContent />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
