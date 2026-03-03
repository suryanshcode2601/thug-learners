import React, { useState } from 'react';
import { 
  Shield, 
  ChevronLeft,
  Upload,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Search,
  Crosshair,
  Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useApp } from '../AppContext';

export default function SubmitIssue() {
  const navigate = useNavigate();
  const { refreshIssues, userSettings } = useApp();
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!description) return;
    setIsSubmitting(true);
    try {
      await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          type: 'Infrastructure',
          location_name: 'Downtown District',
          lat: 37.7749 + (Math.random() - 0.5) * 0.01,
          lng: -122.4194 + (Math.random() - 0.5) * 0.01
        })
      });
      await refreshIssues();
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c12] text-slate-200 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">GovConnect</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-200 uppercase tracking-widest">My Issues</a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-slate-200 uppercase tracking-widest">Notifications</a>
          <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Link to="/" className="hover:text-slate-300">Home</Link>
              <ChevronLeft size={12} className="rotate-180" />
              <span>Issue Submission</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tight">Submit a New Issue</h2>
            <p className="text-slate-500 text-lg">Help us improve your neighborhood by reporting local concerns. Most issues are reviewed within 24 hours.</p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Form Sections */}
            <div className="col-span-8 space-y-6">
              {/* Step 1 */}
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">1</div>
                  <h3 className="text-2xl font-bold">Issue Description</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-300">What is the issue?</p>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-300 focus:outline-none focus:border-blue-500 min-h-[160px] transition-colors"
                    placeholder="Please provide details about the problem (e.g., Pothole on 5th Ave, broken street light, etc.)"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">2</div>
                  <h3 className="text-2xl font-bold">Evidence Upload</h3>
                </div>
                <div className="border-2 border-dashed border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                    <Upload className="text-slate-500 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Drag and drop photos or videos</p>
                    <p className="text-slate-500 text-sm">PNG, JPG, or MP4 up to 50MB</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
                    Select Files
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">3</div>
                  <h3 className="text-2xl font-bold">Location Tagging</h3>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Search for address or drag marker on map" 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden">
                    <img 
                      src="https://picsum.photos/seed/map-large/1200/600" 
                      alt="Map" 
                      className="w-full h-full object-cover opacity-40 grayscale"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="text-blue-500 w-12 h-12 fill-blue-500/20" />
                    </div>
                    <button className="absolute bottom-6 right-6 p-3 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
                      <Crosshair size={20} className="text-slate-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="col-span-4 space-y-6">
              <div className="glass-card p-8 space-y-8">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Sparkles size={20} />
                  AI Classification
                </div>
                <p className="text-sm text-slate-400">Our AI suggests this issue belongs to:</p>
                
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <Settings className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest">Infrastructure</p>
                    <p className="text-[10px] text-blue-400 font-bold">98% Confidence Score</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Department</span>
                    <span className="font-bold">Public Works</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Estimated Response</span>
                    <span className="font-bold">48 Hours</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="font-bold text-blue-500">Drafting</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !description}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'} <Send size={20} />
                </button>
                <p className="text-[10px] text-center text-slate-500 font-medium leading-relaxed">
                  By submitting, you agree to our terms of service regarding public safety reporting.
                </p>
              </div>

              <div className="glass-card p-8 space-y-6">
                <h4 className="font-bold text-lg">Tips for a fast resolution</h4>
                <ul className="space-y-4">
                  <TipItem text="Include a photo of the surrounding area for context." />
                  <TipItem text="Describe the urgency (e.g., 'blocking traffic')." />
                  <TipItem text="Tag the exact GPS location if possible." />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-16 border-t border-slate-800 flex items-center justify-between px-12 text-xs text-slate-500 font-medium shrink-0">
        <div className="flex items-center gap-2">
          <Shield size={14} />
          © 2024 GovConnect Local Authority Portal
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Help Center</a>
          <a href="#" className="hover:text-slate-300">Accessibility</a>
        </div>
      </footer>
    </div>
  );
}

function TipItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3 items-start">
      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
        <CheckCircle2 size={12} className="text-white" />
      </div>
      <span className="text-sm text-slate-400 leading-relaxed">{text}</span>
    </li>
  );
}
