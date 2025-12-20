import React, { useState } from 'react';
import { useScrollDirection, useScrollProgress } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

/**
 * Navigation Component
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
    { label: 'Sidekick', href: '#sidekick' },
    { label: 'Agentic', href: '#agentic' },
    { label: 'Online', href: '#online' },
    { label: 'Updates', href: '#updates' },
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
              <div className="relative">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-all group-hover:stroke-editions-gold"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="6"
                    fill="currentColor"
                    className="transition-all group-hover:fill-editions-gold"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-medium tracking-wide">
                  Shopify Editions
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  Winter '26
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

              {/* Editions Dropdown */}
              <button className="group flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <span>Editions</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search button */}
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Search className="h-5 w-5" />
              </button>

              {/* CTA Button */}
              <a
                href="#"
                className="hidden sm:block relative overflow-hidden px-5 py-2.5 text-sm font-medium bg-foreground text-background rounded-full group"
              >
                <span className="relative z-10">Start for free</span>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-editions-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>

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

          <a
            href="#"
            className={cn(
              'mt-8 px-8 py-4 text-lg font-medium bg-foreground text-background rounded-full transition-all duration-500',
              isMobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            Start for free
          </a>
        </div>
      </div>
    </>
  );
};
