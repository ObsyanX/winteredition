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
    { label: 'About', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo',
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

        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="group flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-editions-gold/50">
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
                <span className="text-xs text-muted-foreground ml-2">
                  Software Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle className="hidden sm:flex" />
              
              {/* Resume Button - PDF Generator */}
              <ResumeGenerator className="hidden sm:flex" />

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-out-expo md:hidden',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'text-3xl font-light tracking-wide transition-all duration-500',
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div
            className={cn(
              'mt-8 transition-all duration-500',
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '700ms' }}
          >
            <ResumeGenerator className="px-8 py-4 text-lg" />
          </div>
        </div>
      </div>
    </>
  );
};
