import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, User, Key, Eye, EyeOff } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const AdminLogin = () => {
  const navigate = useNavigate();
  
  // Auth state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Registration state (for initial admin setup)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [fullName, setFullName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
    const body = isRegisterMode 
      ? { username, password, fullName }
      : { username, password };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      if (isRegisterMode) {
        setMessage({ type: 'success', text: 'Admin account set up successfully! Please login.' });
        setIsRegisterMode(false);
        setPassword('');
      } else {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void text-white selection:bg-violet-500/30 flex flex-col justify-between">
      <Helmet>
        <title>Access Control | The Orvion Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navigation />

      <main className="pt-36 pb-20 px-5 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md glass-card rounded-3xl p-8 border border-violet-500/15 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 bg-violet-600" />
          
          <div className="relative z-10 text-center mb-8">
            <div className="h-12 w-12 rounded-2xl bg-violet-500/10 border border-violet-500/35 flex items-center justify-center mx-auto mb-4 shadow-lg text-violet-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-sora">
              {isRegisterMode ? 'Setup Initial Admin' : 'Admin Security Portal'}
            </h1>
            <p className="text-sm text-[#c4b5fd]/60 mt-2">
              {isRegisterMode 
                ? 'Create the master administrator account for this system'
                : 'Authentication required to enter Orvion administrative console'}
            </p>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl mb-6 text-sm flex gap-3 items-start ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' 
                : 'bg-red-500/10 border border-red-500/20 text-red-300'
            }`}>
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegisterMode && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder=" "
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="cursor-none"
                />
                <label>Full Name</label>
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                placeholder=" "
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="cursor-none"
              />
              <label>Username</label>
            </div>

            <div className="form-group relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cursor-none pr-12"
              />
              <label>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c4b5fd]/60 hover:text-white transition-colors cursor-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm"
            >
              {loading 
                ? 'Validating Security...' 
                : (isRegisterMode ? 'Register Master Account' : 'Authenticate Session')}
            </button>
          </form>

          {/* Toggle register mode */}
          <div className="mt-8 pt-6 border-t border-violet-500/10 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setMessage({ type: '', text: '' });
                setUsername('');
                setPassword('');
                setFullName('');
              }}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium cursor-none"
            >
              {isRegisterMode 
                ? 'Back to Security Authentication' 
                : 'Need to set up the initial admin account?'}
            </button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;
