import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

/**
 * Footer Component
 * Demonstrates:
 * - Staggered link animations on scroll
 * - Hover underline effects
 * - Gradient text on hover
 */
export const Footer: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Resources', links: ['Documentation', 'Help Center', 'Community', 'API'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
  ];

  return (
    <footer className="relative border-t border-border bg-card/30">
      {/* Main footer content */}
      <div ref={ref} className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div
            className={cn(
              'col-span-2 md:col-span-4 lg:col-span-1 transition-all duration-700 ease-out-expo',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" r="6" fill="currentColor" />
              </svg>
              <span className="text-lg font-semibold">Shopify Editions</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              The Renaissance Edition — Winter '26
            </p>
            <p className="text-xs text-muted-foreground">
              Built for learning scroll animations & effects
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((column, columnIndex) => (
            <div
              key={column.title}
              className={cn(
                'transition-all duration-700 ease-out-expo',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${(columnIndex + 1) * 100}ms` }}
            >
              <h4 className="text-sm font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                    >
                      <span className="relative">
                        {link}
                        <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Shopify Editions Clone. For educational purposes.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
