
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Search, 
  Settings, 
  HelpCircle, 
  Plus, 
  Grid, 
  List, 
  ChevronRight, 
  Star, 
  Clock, 
  Paperclip,
  X,
  Send,
  MoreVertical,
  Reply,
  Forward,
  Download,
  Eye,
  MessageSquare,
  Bot,
  FileText,
  Inbox,
  HardDrive,
  Trash2,
  Lock,
  Mail as MailIcon,
  Github,
  ArrowRight,
  EyeOff,
  User,
  LogOut,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Users,
  Database,
  ShieldAlert,
  Ban,
  RotateCcw,
  Shield,
  Edit2,
  UserCheck,
  Share2,
  Link as LinkIcon,
  Globe,
  Check
} from 'lucide-react';
import { format } from 'date-fns';
import { ViewMode, MailFolder, Email, DriveFile, ChatMessage, ManagedUser, UserRole } from './types';
import { NAVIGATION_ITEMS, MAIL_FOLDERS, MOCK_EMAILS, MOCK_FILES, MOCK_MANAGED_USERS } from './constants';
import { getGeminiChatResponse } from './services/geminiService';

// --- Auth Component ---

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'email';
  role: UserRole;
}

const AuthScreen: React.FC<{ onLogin: (user: UserProfile) => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleAccounts, setShowGoogleAccounts] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate real authentication process
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: email.split('@')[0] || 'User',
        email: email,
        provider: 'email',
        role: 'editor' // Default role for new email sign-ups
      });
    }, 1500);
  };

  const handleGoogleLogin = (account: { name: string, email: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        name: account.name,
        email: account.email,
        provider: 'google',
        role: 'editor' // Default role for Google sign-ups
      });
    }, 1000);
  };

  if (showGoogleAccounts) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="p-8 text-center border-b border-slate-50">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" className="h-6 mx-auto mb-4" alt="Google" />
            <h2 className="text-xl font-medium text-slate-800">Choose an account</h2>
            <p className="text-sm text-slate-500 mt-1">to continue to DeepMail</p>
          </div>
          <div className="p-2">
            {[
              { name: 'John Doe', email: 'john.doe@gmail.com' },
              { name: 'Jane Smith', email: 'jsmith.dev@gmail.com' }
            ].map((acc) => (
              <button
                key={acc.email}
                onClick={() => handleGoogleLogin(acc)}
                className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {acc.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{acc.name}</p>
                  <p className="text-xs text-slate-500 truncate">{acc.email}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400" />
              </button>
            ))}
            <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left group border-t border-slate-50 mt-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User size={20} />
              </div>
              <p className="text-sm font-medium text-slate-700">Use another account</p>
            </button>
          </div>
          <div className="p-6 text-xs text-slate-400 leading-relaxed bg-slate-50/50">
            To continue, Google will share your name, email address, language preference, and profile picture with DeepMail. Before using this app, you can review DeepMail’s <span className="text-blue-600 cursor-pointer">privacy policy</span> and <span className="text-blue-600 cursor-pointer">terms of service</span>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400"></div>
      
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white shadow-lg mb-6 transform transition-transform hover:scale-110">
            <CloudIcon />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">DeepMail</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium uppercase tracking-widest">Unified Intelligent Workspace</p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,112,184,0.1)] border border-slate-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Welcome back' : 'Start for free'}
            </h2>
            <p className="text-slate-500 text-sm mb-8">
              {isLogin ? "Please enter your details to sign in." : "Create your unified communication account."}
            </p>

            <div className="space-y-3 mb-8">
              <button 
                onClick={() => setShowGoogleAccounts(true)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-semibold text-slate-700 active:scale-[0.98]"
              >
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                Sign in with Google
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-widest">OR</span></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <MailIcon size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-slate-200 border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 pl-11 pr-4 transition-all placeholder:text-slate-300 outline-none text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  {isLogin && <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot?</button>}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border-slate-200 border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 pl-11 pr-12 transition-all placeholder:text-slate-300 outline-none text-sm"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-600 hover:text-blue-600 font-semibold transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-components (Sidebar) ---

const Sidebar: React.FC<{
  currentView: ViewMode;
  setView: (v: ViewMode) => void;
  mailFolder: MailFolder;
  setMailFolder: (f: MailFolder) => void;
  onCompose: () => void;
  onLogout: () => void;
  user: UserProfile;
  onAdminClick: () => void;
  isAdmin: boolean;
}> = ({ currentView, setView, mailFolder, setMailFolder, onCompose, onLogout, user, onAdminClick, isAdmin }) => {
  return (
    <aside className="w-64 flex flex-col h-full bg-white border-r border-slate-200 py-4 px-2">
      <button 
        onClick={onCompose}
        disabled={user.role === 'viewer'}
        className={`flex items-center gap-4 text-white rounded-2xl px-6 py-4 shadow-md transition-all mb-6 mx-2 font-medium ${
          user.role === 'viewer' ? 'bg-slate-300 cursor-not-allowed grayscale' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Plus size={24} />
        Compose
      </button>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Platform</p>
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-2 rounded-r-full transition-colors ${
                currentView === item.id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <button
            onClick={onAdminClick}
            className={`w-full flex items-center gap-4 px-4 py-2 rounded-r-full transition-colors mt-2 ${
              currentView === ViewMode.ADMIN ? 'bg-slate-900 text-white font-semibold' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <ShieldCheck size={20} />
            Admin Panel
          </button>
        </div>

        {currentView === ViewMode.MAIL && (
          <div>
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Mailboxes</p>
            {MAIL_FOLDERS.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setMailFolder(folder.id)}
                className={`w-full flex items-center gap-4 px-4 py-2 rounded-r-full transition-colors ${
                  mailFolder === folder.id ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {folder.icon}
                {folder.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="px-4 pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-3 mb-4 p-2 rounded-xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              <Shield size={10} className="text-blue-500" />
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter font-bold">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          <span>Storage</span>
          <span>78%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-6">
          <div className="bg-blue-500 h-full" style={{ width: '78%' }}></div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100 uppercase tracking-widest"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  );
};

// --- Share Modal Component ---

const ShareModal: React.FC<{ 
  file: DriveFile; 
  onClose: () => void; 
  onSuccess: (msg: string) => void;
  currentUser: UserProfile;
}> = ({ file, onClose, onSuccess, currentUser }) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [permission, setPermission] = useState<'viewer' | 'editor'>('viewer');
  const [generalAccess, setGeneralAccess] = useState<'restricted' | 'anyone'>('restricted');
  const [copied, setCopied] = useState(false);

  const handleAddEmail = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (!emails.includes(inputValue.trim())) {
        setEmails([...emails, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://deepmail.cloud/s/${file.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    onSuccess(`Successfully shared "${file.name}" with ${emails.length} recipients.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Share "{file.name}"
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <div className="relative group">
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                 <Plus size={18} />
              </div>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleAddEmail}
                placeholder="Add people, groups, or emails"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-4 focus:bg-white focus:border-blue-500 transition-all outline-none text-sm"
              />
            </div>
            
            {emails.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {emails.map(email => (
                  <div key={email} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-100">
                    {email}
                    <button onClick={() => removeEmail(email)} className="hover:text-blue-900"><X size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">People with access</h4>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {currentUser.name.charAt(0)}
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">{currentUser.name} (You)</p>
                        <p className="text-xs text-slate-500">{currentUser.email}</p>
                     </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Owner</span>
               </div>
               
               <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Globe size={20} />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">General access</p>
                        <select 
                          value={generalAccess}
                          onChange={(e) => setGeneralAccess(e.target.value as 'restricted' | 'anyone')}
                          className="bg-transparent text-xs font-bold text-blue-600 focus:outline-none cursor-pointer hover:underline"
                        >
                          <option value="restricted">Restricted</option>
                          <option value="anyone">Anyone with the link</option>
                        </select>
                     </div>
                  </div>
                  {generalAccess === 'anyone' && (
                    <select 
                      value={permission}
                      onChange={(e) => setPermission(e.target.value as 'viewer' | 'editor')}
                      className="bg-slate-50 border-2 border-slate-100 rounded-lg py-1 px-2 text-xs font-bold text-slate-600 outline-none"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                    </select>
                  )}
               </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 flex items-center justify-between">
           <button 
             onClick={copyLink}
             className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all active:scale-95"
           >
             {copied ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
             {copied ? 'Copied!' : 'Copy Link'}
           </button>
           <div className="flex gap-3">
              <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">Done</button>
              <button 
                onClick={handleShare}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Send
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Panel Component ---

const AdminPanel: React.FC<{ 
  users: ManagedUser[], 
  onUpdateUser: (id: string, updates: Partial<ManagedUser>) => void 
}> = ({ users, onUpdateUser }) => {
  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    storage: '256.8 GB'
  }), [users]);

  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const roles: UserRole[] = ['viewer', 'editor', 'manager', 'admin'];

  return (
    <div className="h-full flex flex-col bg-slate-50 p-8 overflow-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">System Overview</h2>
        <p className="text-slate-500 text-sm">Real-time user analytics and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</p>
            <p className="text-2xl font-bold text-slate-900">{stats.active}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suspended</p>
            <p className="text-2xl font-bold text-slate-900">{stats.suspended}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Database size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Storage</p>
            <p className="text-2xl font-bold text-slate-900">{stats.storage}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <h3 className="font-bold text-slate-900">Access Control & Roles</h3>
          <div className="relative">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-lg outline-none text-xs w-64" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="py-4 px-6">User Identity</th>
              <th className="py-4 px-6">Assigned Role</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Last Active</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${u.role === 'admin' ? 'bg-slate-900' : 'bg-blue-600'}`}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {u.name} {u.role === 'admin' && <ShieldCheck size={12} className="text-blue-500" />}
                      </p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                   {editingRoleId === u.id ? (
                     <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                        <select 
                          className="bg-white border-2 border-slate-200 rounded-lg py-1 px-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                          value={u.role}
                          onChange={(e) => {
                            onUpdateUser(u.id, { role: e.target.value as UserRole });
                            setEditingRoleId(null);
                          }}
                        >
                          {roles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                        </select>
                        <button onClick={() => setEditingRoleId(null)} className="p-1 hover:bg-slate-200 rounded text-slate-400">
                          <X size={14} />
                        </button>
                     </div>
                   ) : (
                     <button 
                       onClick={() => setEditingRoleId(u.id)}
                       className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-slate-100 hover:bg-white transition-all text-[11px] font-bold uppercase tracking-widest text-slate-600"
                     >
                       <Shield size={12} className="text-blue-500" />
                       {u.role}
                       <Edit2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                     </button>
                   )}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {u.status === 'active' ? <CheckCircle2 size={10} /> : <Ban size={10} />}
                    {u.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-xs text-slate-400 font-bold uppercase tracking-tighter">{format(u.lastActive, 'MMM d, h:mm a')}</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => onUpdateUser(u.id, { status: u.status === 'active' ? 'suspended' : 'active' })}
                        className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"
                        title={u.status === 'active' ? 'Suspend User' : 'Restore User'}
                      >
                        {u.status === 'active' ? <Ban size={18} /> : <RotateCcw size={18} />}
                      </button>
                    )}
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"><MoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-blue-600 rounded-2xl p-8 text-white flex items-center justify-between shadow-xl shadow-blue-200">
        <div>
           <h4 className="text-xl font-bold mb-1 flex items-center gap-2">
             <Bot size={24} /> AI Access Management
           </h4>
           <p className="text-blue-100 text-sm max-w-md">Assigning roles controls platform-wide capabilities. Viewers have restricted access, while Managers can oversee departments.</p>
        </div>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
          Role Documentation
        </button>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('deepmail_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.MAIL);
  const [mailFolder, setMailFolder] = useState<MailFolder>(MailFolder.INBOX);
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [files, setFiles] = useState<DriveFile[]>(MOCK_FILES);
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(MOCK_MANAGED_USERS);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [sharingFile, setSharingFile] = useState<DriveFile | null>(null);

  // Admin Verification State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasskeyPrompt, setAdminPasskeyPrompt] = useState(false);
  const [adminPasskeyInput, setAdminPasskeyInput] = useState('');
  const [adminError, setAdminError] = useState('');

  // Persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('deepmail_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('deepmail_user');
    }
  }, [user]);

  // Toast timers
  useEffect(() => {
    if (errorToast || successToast) {
      const timer = setTimeout(() => {
        setErrorToast(null);
        setSuccessToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorToast, successToast]);

  const handleLogin = (newUser: UserProfile) => {
    setShowSplash(true);
    setTimeout(() => {
      setUser(newUser);
      setShowSplash(false);
      
      const welcomeMail: Email = {
        id: `welcome-${Date.now()}`,
        sender: 'DeepMail Team',
        recipient: newUser.email,
        subject: `Welcome to DeepMail, ${newUser.name}!`,
        content: `Hi ${newUser.name},\n\nWelcome to your new unified intelligence workspace. We've brought together your emails, files, and AI assistant into one seamless experience.\n\nYour assigned role is: ${newUser.role.toUpperCase()}.\n\nHappy productivity!\nThe DeepMail Team`,
        timestamp: new Date(),
        isRead: false,
        folder: MailFolder.INBOX,
        attachments: [],
        starred: true,
        threadId: 'welcome-thread'
      };
      setEmails(prev => [welcomeMail, ...prev]);
    }, 2000);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewMode.MAIL);
    setMailFolder(MailFolder.INBOX);
    setSelectedEmail(null);
    setIsAdminAuthenticated(false);
  };

  const verifyAdminPasskey = () => {
    if (adminPasskeyInput === 'deepmail-admin-2025') {
      setIsAdminAuthenticated(true);
      setAdminPasskeyPrompt(false);
      setCurrentView(ViewMode.ADMIN);
      setAdminError('');
    } else {
      setAdminError('Invalid passkey. Access denied.');
      setAdminPasskeyInput('');
    }
  };

  const handleAdminViewToggle = () => {
    if (isAdminAuthenticated) {
      setCurrentView(ViewMode.ADMIN);
    } else {
      setAdminPasskeyPrompt(true);
    }
  };

  const updateManagedUser = (id: string, updates: Partial<ManagedUser>) => {
    setManagedUsers(prev => {
      const updated = prev.map(u => u.id === id ? { ...u, ...updates } : u);
      const target = updated.find(u => u.id === id);
      if (target && user && target.email === user.email) {
        setUser({ ...user, role: target.role });
      }
      return updated;
    });
  };

  const handleComposeAttempt = () => {
    if (user?.role === 'viewer') {
      setErrorToast('Permission Denied: Your account is restricted to Read-Only mode.');
      return;
    }
    setIsComposeOpen(true);
  };

  const filteredEmails = useMemo(() => {
    return emails.filter(e => 
      e.folder === mailFolder && 
      (e.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
       e.sender.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [emails, mailFolder, searchQuery]);

  const filteredFiles = useMemo(() => {
    return files.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: chatInput, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    const historyForGemini = chatHistory.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await getGeminiChatResponse(chatInput, historyForGemini);
    const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: new Date() };
    
    setChatHistory(prev => [...prev, aiMsg]);
    setIsChatLoading(false);
  };

  if (showSplash) {
    return (
      <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 animate-bounce shadow-2xl shadow-blue-500/50">
          <CloudIcon />
        </div>
        <h2 className="text-xl font-bold tracking-widest uppercase animate-pulse">Initializing DeepMail</h2>
        <div className="w-48 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-blue-600 animate-progress origin-left"></div>
        </div>
        <style>{`
          @keyframes progress {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          .animate-progress {
            animation: progress 2s ease-in-out forwards;
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 animate-in fade-in duration-500">
      
      {/* Toast Notification */}
      {errorToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[1000] flex items-center gap-3 border border-red-500/50 animate-in slide-in-from-top duration-300">
           <ShieldAlert className="text-red-500" size={20} />
           <span className="text-sm font-bold tracking-tight">{errorToast}</span>
           <button onClick={() => setErrorToast(null)} className="ml-2 hover:bg-white/10 p-1 rounded-lg">
             <X size={16} />
           </button>
        </div>
      )}

      {successToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[1000] flex items-center gap-3 border border-green-500/50 animate-in slide-in-from-top duration-300">
           <CheckCircle2 className="text-green-500" size={20} />
           <span className="text-sm font-bold tracking-tight">{successToast}</span>
           <button onClick={() => setSuccessToast(null)} className="ml-2 hover:bg-white/10 p-1 rounded-lg">
             <X size={16} />
           </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        mailFolder={mailFolder} 
        setMailFolder={setMailFolder}
        onCompose={handleComposeAttempt}
        onLogout={handleLogout}
        user={user}
        onAdminClick={handleAdminViewToggle}
        isAdmin={isAdminAuthenticated}
      />

      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-3 text-slate-700">
            <span className="font-bold text-xl text-blue-600 flex items-center gap-2">
              <CloudIcon /> DeepMail
            </span>
            <div className="h-4 w-px bg-slate-200 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg">
               <Shield size={12} className="text-blue-500" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.role}</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search across ${currentView === ViewMode.ADMIN ? 'system' : currentView.toLowerCase()}...`}
                className="w-full bg-slate-100 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-500/5 rounded-xl py-2 pl-12 pr-4 transition-all outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`p-2 rounded-full transition-all ${isChatOpen ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-100'}`}
              title="Assistant"
            >
              <Bot size={22} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><HelpCircle size={22} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Settings size={22} /></button>
            <div className="w-8 h-8 rounded-full bg-blue-600 border border-blue-200 flex items-center justify-center text-white font-bold ml-2">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-white m-2 rounded-2xl shadow-sm border border-slate-200 relative">
          {currentView === ViewMode.ADMIN ? (
            <AdminPanel users={managedUsers} onUpdateUser={updateManagedUser} />
          ) : currentView === ViewMode.MAIL ? (
            <div className="h-full flex flex-col">
              {/* Mail Actions Bar */}
              <div className="p-2 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="ml-2 w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-500" />
                  <button className="p-2 hover:bg-slate-50 rounded" title="Archive"><CheckCircle2 size={18} className="text-slate-500" /></button>
                  <button className="p-2 hover:bg-slate-50 rounded" title="Snooze"><Clock size={18} className="text-slate-500" /></button>
                  <button className="p-2 hover:bg-slate-50 rounded"><MoreVertical size={18} className="text-slate-500" /></button>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest pr-4">
                  <span>{filteredEmails.length} messages</span>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight size={16} className="rotate-180" /></button>
                    <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>

              {/* Email List or Detail */}
              {selectedEmail ? (
                <div className="flex-1 overflow-auto animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="p-8 max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setSelectedEmail(null)}
                          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                          <ChevronRight size={20} className="rotate-180" />
                        </button>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedEmail.subject}</h2>
                        {selectedEmail.starred && <Star size={20} className="text-yellow-400 fill-yellow-400" />}
                      </div>
                    </div>

                    <div className="flex items-start gap-4 mb-8 bg-slate-50 p-4 rounded-2xl">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                        {selectedEmail.sender.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{selectedEmail.sender}</span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{format(selectedEmail.timestamp, 'MMM d, h:mm a')}</span>
                        </div>
                        <p className="text-slate-500 text-xs">to me <ChevronRight size={10} className="inline rotate-90 ml-1" /></p>
                      </div>
                    </div>

                    <div className="whitespace-pre-wrap text-slate-800 leading-relaxed text-lg mb-12 min-h-[200px] font-medium">
                      {selectedEmail.content}
                    </div>

                    {selectedEmail.attachments.length > 0 && (
                      <div className="border-t border-slate-100 pt-8 mb-12">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Files attached</h3>
                        <div className="flex flex-wrap gap-4">
                          {selectedEmail.attachments.map(att => (
                            <div key={att.id} className="group border border-slate-200 rounded-2xl p-4 w-64 hover:border-blue-400 hover:shadow-xl transition-all bg-white">
                              <div className="flex items-start gap-3">
                                <div className="p-3 bg-blue-50 rounded-xl shadow-sm">
                                  <FileText size={24} className="text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-sm truncate text-slate-800">{att.name}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{att.size}</p>
                                </div>
                              </div>
                              <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-black transition-colors">
                                  <Download size={14} /> Download
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-600 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">
                                  <Eye size={14} /> Preview
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 border-t border-slate-50 pt-8">
                      <button 
                        disabled={user.role === 'viewer'}
                        onClick={handleComposeAttempt}
                        className={`flex items-center gap-2 px-8 py-3 rounded-2xl transition-all font-bold shadow-lg text-sm uppercase tracking-widest ${
                          user.role === 'viewer' ? 'bg-slate-300 cursor-not-allowed text-slate-50 shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 active:scale-95'
                        }`}
                      >
                        <Reply size={18} /> Reply
                      </button>
                      <button 
                        disabled={user.role === 'viewer'}
                        className={`flex items-center gap-2 px-8 py-3 border-2 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest ${
                          user.role === 'viewer' ? 'border-slate-100 text-slate-200 cursor-not-allowed' : 'border-slate-200 hover:bg-slate-50 text-slate-700 active:scale-95'
                        }`}
                      >
                        <Forward size={18} /> Forward
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-auto">
                  {filteredEmails.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300">
                      <Inbox size={80} strokeWidth={1} className="mb-6 opacity-20" />
                      <p className="text-xl font-medium">Your inbox is empty</p>
                      <p className="text-sm mt-2 font-bold uppercase tracking-widest opacity-60">Try searching or switch folders</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-slate-50">
                        {filteredEmails.map(email => (
                          <tr 
                            key={email.id} 
                            onClick={() => setSelectedEmail(email)}
                            className={`group cursor-pointer hover:bg-blue-50/20 transition-all border-l-4 ${email.isRead ? 'bg-white border-transparent' : 'bg-blue-50/30 border-blue-600 font-bold'}`}
                          >
                            <td className="w-12 py-4 pl-4">
                              <input 
                                type="checkbox" 
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-500" 
                              />
                            </td>
                            <td className="w-10 py-4">
                              <Star 
                                size={18} 
                                className={`${email.starred ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 hover:text-slate-400'}`} 
                              />
                            </td>
                            <td className="w-64 py-4 px-2 truncate max-w-xs text-sm text-slate-800">{email.sender}</td>
                            <td className="py-4 px-2">
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-900 truncate">{email.subject}</span>
                                <span className="text-slate-400 text-xs font-normal truncate opacity-60">— {email.content.substring(0, 100)}...</span>
                              </div>
                            </td>
                            <td className="w-16 py-4 px-2 text-right">
                              {email.attachments.length > 0 && <Paperclip size={16} className="text-slate-300 inline" />}
                            </td>
                            <td className="w-28 py-4 pr-6 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {format(email.timestamp, 'MMM d')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Drive View */
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">My Drive</span>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <div className="flex items-center bg-slate-100 rounded-xl p-1">
                    <button className="p-2 bg-white shadow-sm rounded-lg"><Grid size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600"><List size={18} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    disabled={user.role === 'viewer'}
                    onClick={() => user.role === 'viewer' && setErrorToast('Viewer role cannot create folders.')}
                    className={`flex items-center gap-2 px-5 py-2.5 bg-white border-2 rounded-xl font-bold transition-all text-sm ${
                      user.role === 'viewer' ? 'border-slate-50 text-slate-300 cursor-not-allowed' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Plus size={18} /> New Folder
                  </button>
                  <button 
                    disabled={user.role === 'viewer'}
                    onClick={() => user.role === 'viewer' && setErrorToast('Viewer role cannot upload files.')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg text-sm ${
                      user.role === 'viewer' ? 'bg-slate-300 cursor-not-allowed shadow-none grayscale' : 'bg-slate-900 text-white hover:bg-black shadow-slate-200 active:scale-95'
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </div>

              <div className="flex-1 p-8 overflow-auto">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Recent items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                  {filteredFiles.map(file => (
                    <div key={file.id} className="group border-2 border-slate-100 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-2xl transition-all bg-white cursor-pointer relative">
                      <div className="aspect-video bg-slate-50 flex items-center justify-center border-b border-slate-100 relative group-hover:bg-blue-50 transition-colors">
                        {file.type === 'folder' ? (
                          <div className="text-amber-400 drop-shadow-sm"><FolderIcon size={64} /></div>
                        ) : (
                          <div className="text-blue-600 drop-shadow-sm"><FileIcon size={64} extension={file.extension || 'file'} /></div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={(e) => { e.stopPropagation(); setSharingFile(file); }}
                             className="p-1.5 bg-white rounded-lg shadow-sm text-slate-400 hover:text-blue-600"
                           >
                             <Share2 size={16} />
                           </button>
                        </div>
                        <div className="absolute bottom-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-lg shadow-sm">
                           <FileIcon size={14} extension={file.extension} className="text-slate-400" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-900 truncate text-sm">{file.name}</span>
                          <Star size={16} className={file.starred ? 'text-yellow-400 fill-yellow-400' : 'text-slate-100 group-hover:text-slate-200'} />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>{file.size}</span>
                          <span className="opacity-30">•</span>
                          <span>{format(file.modified, 'MMM d')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">All storage items</h2>
                  <table className="w-full text-left border-collapse">
                    <thead className="border-b-2 border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <tr>
                        <th className="py-4 px-2">Name</th>
                        <th className="py-4 px-2">Owner</th>
                        <th className="py-4 px-2">Modified</th>
                        <th className="py-4 px-2">Size</th>
                        <th className="py-4 px-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredFiles.map(file => (
                        <tr key={file.id} className="group hover:bg-slate-50 transition-colors cursor-pointer text-sm">
                          <td className="py-4 px-2 flex items-center gap-3">
                            {file.type === 'folder' ? <FolderIcon size={20} className="text-amber-400" /> : <FileIcon size={20} extension={file.extension} className="text-blue-600" />}
                            <span className="font-bold text-slate-800">{file.name}</span>
                          </td>
                          <td className="py-4 px-2 text-slate-500 font-medium">{file.owner === 'Me' ? 'You' : file.owner}</td>
                          <td className="py-4 px-2 text-slate-400 text-xs font-bold uppercase tracking-tighter">{format(file.modified, 'MMM d, yyyy')}</td>
                          <td className="py-4 px-2 text-slate-400 text-xs font-bold uppercase tracking-tighter">{file.size}</td>
                          <td className="py-4 px-2 text-right">
                             <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setSharingFile(file); }}
                                  className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                                >
                                  <Share2 size={18} />
                                </button>
                                <button className="p-2 hover:bg-white rounded-lg text-slate-300 hover:text-slate-600 transition-colors">
                                  <MoreVertical size={18} />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Sharing Modal */}
      {sharingFile && (
        <ShareModal 
          file={sharingFile} 
          onClose={() => setSharingFile(null)} 
          onSuccess={(msg) => setSuccessToast(msg)}
          currentUser={user}
        />
      )}

      {/* Admin Passkey Prompt Modal */}
      {adminPasskeyPrompt && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full p-10 text-center animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Lock size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Restricted Area</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Please enter the secret passkey to access system management.</p>
              
              <div className="space-y-4">
                <input 
                  type="password"
                  value={adminPasskeyInput}
                  onChange={(e) => setAdminPasskeyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && verifyAdminPasskey()}
                  placeholder="Secret Passkey"
                  className="w-full bg-slate-100 border-2 border-slate-100 focus:border-slate-900 focus:bg-white rounded-2xl py-4 px-6 outline-none transition-all text-center font-bold tracking-widest text-lg"
                  autoFocus
                />
                {adminError && <p className="text-red-500 text-xs font-bold animate-bounce">{adminError}</p>}
                
                <button 
                  onClick={verifyAdminPasskey}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Authorize <ShieldCheck size={18} />
                </button>
                <button 
                  onClick={() => setAdminPasskeyPrompt(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest pt-4"
                >
                  Cancel Access
                </button>
              </div>
           </div>
        </div>
      )}

      {/* AI Assistant Chat Panel */}
      {isChatOpen && (
        <aside className="w-[420px] h-full bg-white border-l border-slate-200 flex flex-col shadow-2xl animate-in slide-in-from-right duration-500 z-30">
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">DeepMail Assistant</h3>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-auto p-6 space-y-6 bg-slate-50/20">
            {chatHistory.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                  <Bot size={40} className="text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-2 leading-tight">Ready to boost your productivity?</h4>
                <p className="text-xs text-slate-500 max-w-[240px] mx-auto leading-relaxed">I can summarize your day, find documents, or write complex replies for you.</p>
                
                <div className="mt-10 space-y-3 px-4">
                  {[
                    'Summarize unread messages from Alex',
                    'Find my Q4 Strategy PDF',
                    'Write a professional decline for the invitation'
                  ].map(tip => (
                    <button 
                      key={tip}
                      onClick={() => { setChatInput(tip); handleSendMessage(); }}
                      className="w-full text-left p-4 text-[11px] font-bold bg-white hover:bg-blue-600 hover:text-white rounded-2xl border border-slate-100 text-slate-600 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                    >
                      "{tip}"
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] p-5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' 
                    : 'bg-white text-slate-800 rounded-tl-none shadow-sm border border-slate-100'
                  }`}>
                    <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                    <div className={`text-[9px] font-bold mt-3 uppercase tracking-widest ${msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                      {format(msg.timestamp, 'h:mm a')}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="relative group">
              <textarea
                rows={1}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Talk to your assistant..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-medium resize-none overflow-hidden"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isChatLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl disabled:opacity-30 hover:bg-blue-700 transition-all shadow-lg active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Compose Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl shadow-blue-900/20 overflow-hidden flex flex-col h-[85vh] animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-white/10 rounded-lg"><MailIcon size={18} /></div>
                 <span className="font-bold text-sm tracking-widest uppercase">New Correspondence</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-xl transition-colors"><ChevronRight size={18} className="rotate-90" /></button>
                <button onClick={() => setIsComposeOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={18} /></button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto flex flex-col bg-white">
              <div className="border-b border-slate-100 flex items-center px-8 py-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest w-16">Recipient</span>
                <input type="text" className="flex-1 border-none focus:ring-0 text-sm py-1 font-bold text-slate-800 outline-none" />
              </div>
              <div className="border-b border-slate-100 flex items-center px-8 py-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest w-16">Subject</span>
                <input type="text" className="flex-1 border-none focus:ring-0 text-sm py-1 font-bold text-slate-800 outline-none placeholder:font-normal" placeholder="Add a title..." />
              </div>
              <textarea 
                placeholder="Begin your message..."
                className="flex-1 w-full p-8 border-none focus:ring-0 resize-none text-xl leading-relaxed text-slate-800 font-medium outline-none placeholder:text-slate-200"
              ></textarea>
            </div>

            <div className="p-8 border-t border-slate-50 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 text-sm uppercase tracking-widest">
                  Dispatch <Send size={18} />
                </button>
                <div className="h-10 w-px bg-slate-200 mx-2"></div>
                <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 transition-colors" title="Formatting"><FormattingIcon /></button>
                <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 transition-colors" title="Attach Files"><Paperclip size={20} /></button>
                <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 transition-colors" title="Insert Drive File"><HardDrive size={20} /></button>
              </div>
              <button className="p-3 hover:bg-red-50 rounded-2xl text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Icons and Utils ---

const CloudIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 19C15.0147 19 13 16.9853 13 14.5C13 12.0147 15.0147 10 17.5 10C19.9853 10 22 12.0147 22 14.5C22 16.9853 19.9853 19 17.5 19Z" fill="currentColor"/>
    <path d="M7 19C4.23858 19 2 16.7614 2 14C2 11.2386 4.23858 9 7 9C9.76142 9 12 11.2386 12 14C12 16.7614 9.76142 19 7 19Z" fill="currentColor"/>
    <path d="M12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z" fill="currentColor"/>
  </svg>
);

const FolderIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
  </svg>
);

const FileIcon = ({ size = 24, extension = "file", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const FormattingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

export default App;
