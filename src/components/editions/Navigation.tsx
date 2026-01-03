import React, { useState } from 'react';
import { useScrollDirection, useScrollProgress } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import avatarLogo from '@/assets/avatar-logo.png';
import { ResumeGenerator } from './ResumeGenerator';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Navigation Component - Portfolio Version
 * Demonstrates:
 * - Scroll-based show/hide behavior
 * - Backdrop blur on scroll
 * - Mobile menu animations
 * - Hover state micro-interactions
 */
export const Navigation: React.FC = () => {
  const { scrollDirection, scrollY } = useScrollDirection();
  const { progress } = useScrollProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;
  const isHidden = scrollDirection === 'down' && scrollY > 200;

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo safe-area-top',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        )}
      >
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-editions-gold via-editions-purple to-editions-blue transition-all duration-100"
          style={{ width: `${progress}%` }}
        />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="group flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-editions-gold/50 flex-shrink-0">
                <img 
                  src={avatarLogo} 
                  alt="Sayan Dutta"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-medium tracking-wide">
                  Sayan Dutta
                </span>
                <span className="text-xs text-muted-foreground ml-2 hidden lg:inline">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative px-3 xl:px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-[1px] bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle */}
              <ThemeToggle className="hidden sm:flex" />
              
              {/* Resume Button - PDF Generator */}
              <ResumeGenerator className="hidden md:flex" />

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-out-expo lg:hidden safe-area-inset',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'text-2xl sm:text-3xl font-light tracking-wide transition-all duration-500 min-h-[44px] flex items-center',
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 80 + 150}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          {/* Theme Toggle in Mobile Menu */}
          <div
            className={cn(
              'mt-4 sm:mt-6 transition-all duration-500',
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <ThemeToggle />
          </div>

          <div
            className={cn(
              'mt-2 sm:mt-4 transition-all duration-500',
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '700ms' }}
          >
            <ResumeGenerator className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px]" />
          </div>
        </div>
      </div>
    </>
  );
};
