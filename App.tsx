
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ToolPage from './components/ToolPage';
import FaqPage from './components/FaqPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { Page } from './types';

export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Tool');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
      case 'Tool':
        return <ToolPage />;
      case 'FAQ':
        return <FaqPage />;
      case 'About Us':
        return <AboutPage />;
      case 'Contact':
        return <ContactPage />;
      default:
        return <ToolPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;