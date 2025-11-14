
import React, { useState } from 'react';
import { Page, navItems } from '../types';
import { Theme } from '../App';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink: React.FC<{ page: Page }> = ({ page }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsMenuOpen(false);
      }}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        currentPage === page
          ? 'bg-brand-primary text-white'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      {page}
    </button>
  );

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-none dark:border-b dark:border-slate-800 animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('Tool')} className="flex items-center space-x-2 text-2xl font-bold text-brand-primary">
              <span role="img" aria-label="paint palette">🎨</span>
              <h1 className="text-slate-800 dark:text-slate-100">ColorizePro</h1>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink key={item} page={item} />
              ))}
              <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-white hover:bg-brand-secondary focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in border-t border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink key={item} page={item} />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;