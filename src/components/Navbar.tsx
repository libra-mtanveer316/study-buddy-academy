import React, { useState, useEffect } from 'react';
import studyBuddyLogo from '../assets/images/study_buddy_logo_1790332834397.jpg';
import {
  LayoutDashboard,
  MessageSquare,
  Layers,
  HelpCircle,
  Timer,
  BarChart3,
  BookOpen,
  Sparkles,
  Workflow,
  Info,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Flame,
  Mail
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  theme,
  onToggleTheme,
  streakDays,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const mainNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'chat', label: 'AI Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'timer', label: 'Focus Timer', icon: <Timer className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const supportingNavItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'library', label: 'Subjects', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'features', label: 'Features', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'how-it-works', label: 'How It Works', icon: <Workflow className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
    { id: 'developer', label: 'Developer', icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full bg-[#112D4E] text-white border-b border-[#1c3e66] shadow-md transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Brand Logo & Name (Strictly Single Line on all devices) */}
          <button
            type="button"
            id="nav-brand-btn"
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-1.5 sm:gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F72AF] rounded-lg p-0.5 sm:p-1 transition-transform active:scale-[0.99] shrink-0 min-h-[44px] cursor-pointer"
          >
            <img
              src={studyBuddyLogo}
              alt="Study Buddy Academy Logo"
              width="36"
              height="36"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain aspect-square shadow-xs border border-[#3F72AF]/40 group-hover:border-[#DBE2EF] transition-colors shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                <span className="font-bold text-xs min-[360px]:text-sm sm:text-base text-white tracking-tight whitespace-nowrap inline-block">
                  Study Buddy
                </span>
                <span className="inline-flex items-center px-1.5 min-[360px]:px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] min-[360px]:text-[10px] sm:text-xs font-semibold bg-[#2DD4BF] text-white tracking-normal whitespace-nowrap shrink-0 hover:bg-[#20c2ad] transition-colors">
                  Academy
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#DBE2EF]/80 hidden sm:block whitespace-nowrap">
                Learn smarter. Stay consistent.
              </p>
            </div>
          </button>

          {/* Desktop Main Navigation (Laptops & Desktops) */}
          <nav id="desktop-main-nav" className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#3F72AF] text-white shadow-xs font-semibold'
                      : 'text-[#DBE2EF] hover:text-white hover:bg-[#1c3e66]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#DBE2EF]/70'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Utilities (Laptops & Desktops) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Supporting Links */}
            <div className="flex items-center gap-1 border-r border-[#1c3e66] pr-2.5 mr-0.5">
              {supportingNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#3F72AF] text-white font-semibold'
                        : 'text-[#DBE2EF] hover:text-white hover:bg-[#1c3e66]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Streak Badge */}
            <div
              id="streak-badge"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-xs tabular-nums select-none"
              title={`${streakDays} Day Study Streak`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-xl text-[#DBE2EF] hover:text-white hover:bg-[#1c3e66] border border-[#1c3e66] transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile & Tablet Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
            {/* Mobile Streak Indicator */}
            <div
              className="hidden min-[360px]:flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 select-none shrink-0"
              title={`${streakDays} Day Streak`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="tabular-nums">{streakDays}d</span>
            </div>

            {/* Mobile Theme Toggle */}
            <button
              type="button"
              id="mobile-theme-toggle"
              onClick={onToggleTheme}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-[#DBE2EF] hover:text-white hover:bg-[#1c3e66] border border-[#1c3e66] active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-[#DBE2EF] hover:text-white hover:bg-[#1c3e66] border border-[#1c3e66] active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile/tablet drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/60 backdrop-blur-xs z-30 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          className="relative z-40 lg:hidden bg-[#112D4E] border-b border-[#1c3e66] px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
        >
          <div>
            <p className="text-xs font-bold text-[#DBE2EF]/80 uppercase tracking-wider px-1 mb-2">
              Study Modules
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {mainNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-[0.98] min-h-[44px] cursor-pointer ${
                      isActive
                        ? 'bg-[#3F72AF] text-white font-semibold shadow-xs'
                        : 'text-[#DBE2EF] hover:text-white hover:bg-[#1c3e66] bg-[#0e243e] border border-[#1c3e66]'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-[#DBE2EF]/70 shrink-0'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#1c3e66]">
            <p className="text-xs font-bold text-[#DBE2EF]/80 uppercase tracking-wider px-1 mb-2">
              Academy & Resources
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {supportingNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs sm:text-sm transition-all active:scale-[0.98] min-h-[44px] cursor-pointer ${
                      isActive
                        ? 'bg-[#3F72AF] text-white font-semibold shadow-xs'
                        : 'text-[#DBE2EF] hover:text-white hover:bg-[#1c3e66] bg-[#0e243e] border border-[#1c3e66]'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-[#DBE2EF]/70 shrink-0'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
