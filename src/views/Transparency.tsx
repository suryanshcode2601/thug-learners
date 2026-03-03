import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { useApp } from '../AppContext';
import Layout from '../components/Layout';
import { cn } from '../lib/utils';
import { Shield, TrendingUp, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';

export default function Transparency() {
  const { issues, userSettings } = useApp();

  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(i => i.status === 'RESOLVED').length;
  const pendingIssues = issues.filter(i => i.status === 'PENDING').length;
  const dispatchedIssues = issues.filter(i => i.status === 'DISPATCHED').length;

  const typeData = Array.from(new Set(issues.map(i => i.type))).map(type => ({
    name: type,
    value: issues.filter(i => i.type === type).length
  }));

  const statusData = [
    { name: 'Pending', value: pendingIssues, color: '#f59e0b' },
    { name: 'Dispatched', value: dispatchedIssues, color: '#3b82f6' },
    { name: 'Resolved', value: resolvedIssues, color: '#10b981' },
  ];

  const timelineData = [
    { name: 'Jan', issues: 12, resolved: 8 },
    { name: 'Feb', issues: 19, resolved: 14 },
    { name: 'Mar', issues: 15, resolved: 12 },
    { name: 'Apr', issues: 22, resolved: 18 },
    { name: 'May', issues: 30, resolved: 25 },
    { name: 'Jun', issues: 25, resolved: 22 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <Layout showTabs={false}>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className={cn("text-4xl font-bold tracking-tight", !userSettings.darkMode && "text-slate-900")}>City Transparency</h2>
            <p className="text-slate-500 max-w-xl">Real-time data on municipal service performance and issue resolution. We believe in open data and accountability.</p>
          </div>
          <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border", userSettings.darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
            <Shield className="text-blue-500 w-4 h-4" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Verified Data</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard 
            icon={<FileText className="text-blue-500" />} 
            label="Total Reports" 
            value={totalIssues.toString()} 
            trend="+12%" 
          />
          <StatCard 
            icon={<CheckCircle2 className="text-emerald-500" />} 
            label="Resolved" 
            value={resolvedIssues.toString()} 
            trend="+5%" 
          />
          <StatCard 
            icon={<Clock className="text-amber-500" />} 
            label="Pending" 
            value={pendingIssues.toString()} 
            trend="-2%" 
          />
          <StatCard 
            icon={<TrendingUp className="text-purple-500" />} 
            label="Resolution Rate" 
            value={`${Math.round((resolvedIssues / totalIssues) * 100 || 0)}%`} 
            trend="+3%" 
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-8">
          <div className={cn("glass-card p-8 space-y-6", !userSettings.darkMode && "bg-white border-slate-200 shadow-sm")}>
            <div className="flex justify-between items-center">
              <h3 className={cn("font-bold text-lg", !userSettings.darkMode && "text-slate-900")}>Reports by Category</h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Distribution</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={userSettings.darkMode ? "#1e293b" : "#e2e8f0"} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: userSettings.darkMode ? '#0f172a' : '#ffffff', 
                      borderColor: userSettings.darkMode ? '#1e293b' : '#e2e8f0',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: userSettings.darkMode ? '#f1f5f9' : '#0f172a'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={cn("glass-card p-8 space-y-6", !userSettings.darkMode && "bg-white border-slate-200 shadow-sm")}>
            <div className="flex justify-between items-center">
              <h3 className={cn("font-bold text-lg", !userSettings.darkMode && "text-slate-900")}>Resolution Status</h3>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Status</span>
            </div>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: userSettings.darkMode ? '#0f172a' : '#ffffff', 
                      borderColor: userSettings.darkMode ? '#1e293b' : '#e2e8f0',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4 pr-8">
                {statusData.map(status => (
                  <div key={status.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                    <div className="flex flex-col">
                      <span className={cn("text-xs font-bold", !userSettings.darkMode && "text-slate-900")}>{status.name}</span>
                      <span className="text-[10px] text-slate-500">{status.value} Reports</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn("glass-card p-8 space-y-6 col-span-2", !userSettings.darkMode && "bg-white border-slate-200 shadow-sm")}>
            <div className="flex justify-between items-center">
              <h3 className={cn("font-bold text-lg", !userSettings.darkMode && "text-slate-900")}>Monthly Performance Trend</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Issues</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resolved</span>
                 </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={userSettings.darkMode ? "#1e293b" : "#e2e8f0"} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: userSettings.darkMode ? '#0f172a' : '#ffffff', 
                      borderColor: userSettings.darkMode ? '#1e293b' : '#e2e8f0',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }} 
                  />
                  <Area type="monotone" dataKey="issues" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIssues)" strokeWidth={2} />
                  <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  const { userSettings } = useApp();
  const isPositive = trend.startsWith('+');
  return (
    <div className={cn("glass-card p-6 space-y-4", !userSettings.darkMode && "bg-white border-slate-200 shadow-sm")}>
      <div className="flex justify-between items-center">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", userSettings.darkMode ? "bg-slate-900" : "bg-slate-50")}>
          {icon}
        </div>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded",
          isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
        )}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</p>
        <h4 className={cn("text-3xl font-bold mt-1", !userSettings.darkMode && "text-slate-900")}>{value}</h4>
      </div>
    </div>
  );
}
