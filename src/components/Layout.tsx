import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Shield, 
  Settings, 
  Search, 
  Bell, 
  User,
  Plus,
  Sparkles,
  ArrowUp,
  ChevronRight,
  MapPin,
  Clock,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showTabs?: boolean;
}

export default function Layout({ children, activeTab, onTabChange, showTabs = true }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { issues, userSettings } = useApp();

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/' },
    { icon: <MapIcon size={18} />, label: 'City Map', path: '/city-map' },
    { icon: <Shield size={18} />, label: 'Transparency', path: '/transparency' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={cn("flex h-screen text-slate-200 overflow-hidden transition-colors duration-300", userSettings.darkMode ? "bg-[#0a0c12]" : "bg-slate-50 text-slate-900")}>
      {/* Sidebar */}
      <aside className={cn("w-64 border-r flex flex-col p-6 gap-8", userSettings.darkMode ? "border-slate-800" : "border-slate-200 bg-white")}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className={cn("font-bold text-lg tracking-tight", !userSettings.darkMode && "text-slate-900")}>GovConnect AI</h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4 mb-2">Navigation</p>
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : cn("text-slate-400 hover:bg-slate-800/50 hover:text-slate-200", !userSettings.darkMode && "text-slate-500 hover:bg-slate-100 hover:text-slate-900")
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-4 mb-2">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Active Reports</p>
              <span className="text-[10px] bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded font-bold">{issues.length} Total</span>
            </div>
            {issues.slice(0, 3).map((issue) => (
              <div 
                key={issue.id} 
                onClick={() => navigate(`/city-map?issueId=${issue.id}`)}
                className={cn("px-4 py-2 space-y-2 cursor-pointer group rounded-lg transition-colors", userSettings.darkMode ? "hover:bg-slate-800/50" : "hover:bg-slate-100")}
              >
                <div className="flex justify-between items-center">
                  <span className={cn("text-[11px] font-medium truncate max-w-[120px]", userSettings.darkMode ? "text-slate-300" : "text-slate-700")}>{issue.description.split('.')[0]}</span>
                  <span className="text-[10px] font-bold text-slate-500">{issue.urgency}%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${issue.urgency}%` }} />
                </div>
              </div>
            ))}
            <button 
              onClick={() => navigate('/city-map')}
              className="w-full text-center text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-4 hover:text-blue-400"
            >
              View All My Reports
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={cn("h-16 border-b flex items-center justify-between px-8 shrink-0", userSettings.darkMode ? "border-slate-800" : "border-slate-200 bg-white")}>
          <div className="flex h-full items-center">
            {showTabs && onTabChange && (
              <nav className="flex h-full gap-8">
                {['Dashboard', 'My Reports', 'Services', 'Community'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={cn(
                      "relative h-full flex items-center text-sm font-medium transition-colors",
                      activeTab === tab ? "text-blue-500" : "text-slate-400 hover:text-slate-200",
                      !userSettings.darkMode && activeTab !== tab && "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                    )}
                  </button>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search services or reports..." 
                className={cn("border rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-blue-500 transition-colors", userSettings.darkMode ? "bg-slate-900/50 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900")}
              />
            </div>
            <button className={cn("p-2 rounded-lg relative", userSettings.darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100")}>
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
            </button>
            <button className={cn("w-8 h-8 rounded-full flex items-center justify-center overflow-hidden", userSettings.darkMode ? "bg-slate-800" : "bg-slate-200")}>
              <img src={`https://picsum.photos/seed/${userSettings.email}/100/100`} alt="User" referrerPolicy="no-referrer" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        <footer className={cn("h-12 border-t flex items-center justify-between px-8 text-[10px] text-slate-500 font-medium shrink-0", userSettings.darkMode ? "border-slate-800" : "border-slate-200 bg-white")}>
          <div className="flex items-center gap-2">
            <Shield size={12} />
            © 2024 GovConnect AI. Your data is handled with strict governance standards.
          </div>
          <div className="flex gap-6">
            <Link to="/admin" className="hover:text-blue-400 text-blue-500 font-bold">Admin Portal</Link>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Accessibility</a>
            <a href="#" className="hover:text-slate-300">Support Center</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
