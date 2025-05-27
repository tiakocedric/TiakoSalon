import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Scissors } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Handle scroll events to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Scissors className="h-8 w-8 text-primary-600 dark:text-primary-500" />
          <span className="text-xl font-heading font-bold text-gray-900 dark:text-white">
            {t('app.name')}
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/services"
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            {t('nav.services')}
          </Link>
          <Link 
            to="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          >
            {t('nav.about')}
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t('nav.dashboard')}
              </Link>
              <Link 
                to="/profile"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t('nav.profile')}
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {t('nav.admin')}
                </Link>
              )}
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t('nav.login')}
              </Link>
              <Link 
                to="/register"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
          
          <Link to="/booking">
            <Button variant="default" size="default">
              {t('nav.booking')}
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
            >
              {t('nav.logout')}
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 px-4 md:hidden animate-slide-down">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/services"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
              >
                {t('nav.services')}
              </Link>
              <Link 
                to="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
              >
                {t('nav.about')}
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <Link 
                    to="/profile"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    {t('nav.profile')}
                  </Link>
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
                    >
                      {t('nav.admin')}
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    fullWidth
                    onClick={logout}
                    className="justify-start px-0"
                  >
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    to="/register"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-2"
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
              
              <Link to="/booking" className="mt-2">
                <Button variant="default" fullWidth>
                  {t('nav.booking')}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}