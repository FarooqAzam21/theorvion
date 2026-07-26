import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard, PenSquare, Trash2, Search, LogOut, Plus,
  Eye, EyeOff, Globe, FileText, Image, Tag, User, Calendar,
  CheckCircle2, XCircle, ChevronDown, X, AlertTriangle, Loader2,
  Filter, BookOpen, TrendingUp, Clock, ShieldCheck
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ── Utility ──────────────────────────────────────────────────
const authHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const readTime = (content) => {
  const words = (content || '').replace(/<[^>]*>/g, '').split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
};

// ── Tiny Rich Text Toolbar ─────────────────────────────────────
const RichToolbar = ({ onFormat }) => {
  const btns = [
    { label: 'B', cmd: 'bold', title: 'Bold' },
    { label: 'I', cmd: 'italic', title: 'Italic' },
    { label: 'U', cmd: 'underline', title: 'Underline' },
    { label: 'H2', cmd: 'h2', title: 'Heading 2' },
    { label: 'H3', cmd: 'h3', title: 'Heading 3' },
    { label: '• List', cmd: 'ul', title: 'Bullet List' },
    { label: '1. List', cmd: 'ol', title: 'Numbered List' },
    { label: '❝', cmd: 'blockquote', title: 'Quote' },
    { label: '</>', cmd: 'code', title: 'Inline Code' },
    { label: '🔗', cmd: 'link', title: 'Link' },
  ];
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-violet-500/15 bg-[#0c051a]">
      {btns.map(b => (
        <button key={b.cmd} type="button" title={b.title}
          onMouseDown={(e) => { e.preventDefault(); onFormat(b.cmd); }}
          className="px-2 py-1 text-xs rounded bg-violet-500/10 hover:bg-violet-500/25 text-violet-300 hover:text-white transition-all cursor-none font-mono">
          {b.label}
        </button>
      ))}
    </div>
  );
};

// ── Confirm Delete Dialog ─────────────────────────────────────
const ConfirmDialog = ({ title, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      className="relative z-10 glass-card rounded-2xl p-8 max-w-sm w-full mx-4 border border-red-500/20 text-center">
      <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
      <h3 className="text-lg font-bold font-sora mb-2">Delete Article?</h3>
      <p className="text-sm text-[#c4b5fd]/60 mb-6">
        "<span className="text-white font-medium">{title}</span>" will be permanently deleted. This cannot be undone.
      </p>
      <div className="flex gap-3 justify-center">
        <button onClick={onCancel} className="btn-outline py-2 px-6 text-sm cursor-none">Cancel</button>
        <button onClick={onConfirm}
          className="px-6 py-2 text-sm rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all cursor-none">
          Delete
        </button>
      </div>
    </motion.div>
  </div>
);

// ── Main Admin Dashboard ──────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();

  // Auth
  const [adminUser, setAdminUser] = useState(null);

  // Listing state
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState(null);
  const [monitoringResults, setMonitoringResults] = useState([]);

  // Editor state
  const [view, setView] = useState('list'); // 'list' | 'editor'
  const [editingPost, setEditingPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState({ type: '', text: '' });

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form state
  const emptyForm = {
    title: '', content: '', featuredImage: '', category: '',
    tags: '', metaTitle: '', metaDescription: '', status: 'draft',
    authorName: '', publishDate: '',
  };
  const [form, setForm] = useState(emptyForm);
  const [imageUploading, setImageUploading] = useState(false);

  // Stats
  const published = blogs.filter(b => b.status === 'published').length;
  const drafts = blogs.filter(b => b.status === 'draft').length;

  // ── Auth Guard ────────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    if (!token) { navigate('/admin/login'); return; }
    try { setAdminUser(JSON.parse(user)); } catch { setAdminUser({ fullName: 'Admin' }); }
  }, [navigate]);

  // ── Fetch Blogs ───────────────────────────────────────────
  const fetchBlogs = useCallback(async () => {
    setLoadingList(true); setListError(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs`, { headers: authHeaders() });
      if (res.status === 401) { localStorage.clear(); navigate('/admin/login'); return; }
      if (!res.ok) throw new Error('Failed to load blog posts');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setListError(err.message);
    } finally {
      setLoadingList(false);
    }
  }, [navigate]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const fetchMonitoring = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/monitoring`, { headers: authHeaders() });
      if (response.ok) {
        const data = await response.json();
        setMonitoringResults(data.results || []);
      }
    } catch {
      // Monitoring visibility is optional; dashboard access remains available.
    }
  }, []);

  useEffect(() => { fetchMonitoring(); }, [fetchMonitoring]);

  // ── Filter Blogs ──────────────────────────────────────────
  useEffect(() => {
    let list = [...blogs];
    if (statusFilter !== 'all') list = list.filter(b => b.status === statusFilter);
    if (search.trim()) {
      const kw = search.toLowerCase();
      list = list.filter(b => b.title?.toLowerCase().includes(kw) || b.category?.toLowerCase().includes(kw));
    }
    setFiltered(list);
  }, [blogs, search, statusFilter]);

  // ── Editor Helpers ────────────────────────────────────────
  const openNew = () => {
    setEditingPost(null);
    setForm({ ...emptyForm, authorName: adminUser?.fullName || '' });
    setSaveMsg({ type: '', text: '' });
    setView('editor');
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title || '',
      content: post.content || '',
      featuredImage: post.featuredImage || '',
      category: post.category || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      status: post.status || 'draft',
      authorName: post.authorName || '',
      publishDate: post.publishDate ? post.publishDate.split('T')[0] : '',
    });
    setSaveMsg({ type: '', text: '' });
    setView('editor');
  };

  const applyFormat = (cmd) => {
    const ta = document.getElementById('blog-content-editor');
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = ta.value.substring(start, end);
    let replacement = '';
    switch (cmd) {
      case 'bold': replacement = `<strong>${sel || 'bold text'}</strong>`; break;
      case 'italic': replacement = `<em>${sel || 'italic text'}</em>`; break;
      case 'underline': replacement = `<u>${sel || 'underline text'}</u>`; break;
      case 'h2': replacement = `<h2>${sel || 'Heading 2'}</h2>`; break;
      case 'h3': replacement = `<h3>${sel || 'Heading 3'}</h3>`; break;
      case 'ul': replacement = `<ul>\n  <li>${sel || 'List item'}</li>\n</ul>`; break;
      case 'ol': replacement = `<ol>\n  <li>${sel || 'List item'}</li>\n</ol>`; break;
      case 'blockquote': replacement = `<blockquote>${sel || 'Quoted text'}</blockquote>`; break;
      case 'code': replacement = `<code>${sel || 'code here'}</code>`; break;
      case 'link': {
        const url = prompt('Enter URL:', 'https://');
        if (url) replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer">${sel || url}</a>`;
        else return;
        break;
      }
      default: return;
    }
    const newContent = ta.value.substring(0, start) + replacement + ta.value.substring(end);
    setForm(f => ({ ...f, content: newContent }));
  };

  // ── Image Upload ──────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/api/admin/blogs/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setForm(f => ({ ...f, featuredImage: data.url }));
    } catch (err) {
      setSaveMsg({ type: 'error', text: `Image upload failed: ${err.message}` });
    } finally {
      setImageUploading(false);
    }
  };

  // ── Save (Create / Update) ────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setSaveMsg({ type: 'error', text: 'Title and Content are required.' });
      return;
    }
    setSaving(true); setSaveMsg({ type: '', text: '' });
    try {
      const url = editingPost
        ? `${API_BASE}/api/admin/blogs/${editingPost.id}`
        : `${API_BASE}/api/admin/blogs`;
      const method = editingPost ? 'PUT' : 'POST';
      const body = {
        ...form,
        publishDate: form.publishDate ? new Date(form.publishDate).toISOString() : null,
      };
      const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setSaveMsg({ type: 'success', text: editingPost ? 'Article updated successfully!' : 'Article created successfully!' });
      await fetchBlogs();
      setTimeout(() => { setView('list'); }, 1200);
    } catch (err) {
      setSaveMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs/${deleteTarget.id}`, {
        method: 'DELETE', headers: authHeaders(),
      });
      if (!res.ok) throw new Error('Delete failed');
      setBlogs(prev => prev.filter(b => b.id !== deleteTarget.id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteTarget(null);
    }
  };

  // ── Quick Toggle Publish/Draft ────────────────────────────
  const toggleStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs/${post.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ ...post, status: newStatus }),
      });
      if (!res.ok) throw new Error('Status update failed');
      setBlogs(prev => prev.map(b => b.id === post.id ? { ...b, status: newStatus } : b));
    } catch (err) { alert(err.message); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // ─────────────────────────────────────────────────────────
  // RENDER: LIST VIEW
  // ─────────────────────────────────────────────────────────
  const renderList = () => (
    <div className="min-h-screen bg-void text-white">
      <Helmet>
        <title>Admin Dashboard | The Orvion</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Top Nav Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#030008]/90 backdrop-blur-xl border-b border-violet-500/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <span className="font-bold font-sora text-white text-sm">Orvion Admin</span>
            <span className="text-xs text-violet-400/60 ml-3">Blog Management Console</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#c4b5fd]/60 hidden sm:block">
            Hello, <span className="text-white font-medium">{adminUser?.fullName}</span>
          </span>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors cursor-none border border-red-500/20 hover:border-red-500/50 rounded-xl px-3 py-2">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Articles', value: blogs.length, icon: BookOpen, color: 'violet' },
            { label: 'Published', value: published, icon: Globe, color: 'emerald' },
            { label: 'Drafts', value: drafts, icon: FileText, color: 'amber' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`glass-card rounded-2xl p-5 border ${
              color === 'violet' ? 'border-violet-500/15' :
              color === 'emerald' ? 'border-emerald-500/15' : 'border-amber-500/15'
            } flex items-center gap-4`}>
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold font-sora text-white">{value}</div>
                <div className="text-xs text-[#c4b5fd]/60">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <section className="glass-card rounded-2xl p-5 border border-violet-500/15 mb-8" aria-label="CyberGuard monitoring">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-violet-400" />
              <div>
                <h2 className="font-semibold text-white text-sm">CyberGuard monitoring</h2>
                <p className="text-xs text-[#c4b5fd]/60">Recent server-side monitoring outcomes</p>
              </div>
            </div>
            <button onClick={fetchMonitoring} className="text-xs text-violet-300 hover:text-white transition-colors">Refresh</button>
          </div>
          {monitoringResults.length ? (
            <div className="flex flex-wrap gap-2">
              {monitoringResults.slice(0, 8).map((result, index) => (
                <span key={`${result.at}-${index}`} className="rounded-lg border border-violet-500/15 bg-violet-500/5 px-2.5 py-1 text-xs text-[#c4b5fd]/80">
                  {result.type}: {result.outcome} ({result.status}){result.score !== undefined ? ` · risk ${result.score}` : ''}
                </span>
              ))}
            </div>
          ) : <p className="text-xs text-[#c4b5fd]/50">No monitoring results recorded in this server session.</p>}
        </section>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-violet-400/50" />
              <input type="text" placeholder="Search articles..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 text-sm bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl outline-none text-white transition-all cursor-none w-64" />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="py-2.5 px-4 text-sm bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl outline-none text-white transition-all cursor-none">
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button onClick={openNew}
            className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2 cursor-none">
            <Plus className="w-4 h-4" /> New Article
          </button>
        </div>

        {/* Blog Table */}
        {loadingList ? (
          <div className="glass-card rounded-2xl border border-violet-500/10 p-16 text-center">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin mx-auto mb-3" />
            <p className="text-[#c4b5fd]/60 text-sm">Loading articles...</p>
          </div>
        ) : listError ? (
          <div className="glass-card rounded-2xl border border-red-500/15 p-10 text-center text-red-400">
            {listError}
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card rounded-2xl border border-violet-500/10 p-20 text-center">
            <BookOpen className="w-12 h-12 text-violet-400/30 mx-auto mb-4" />
            <p className="font-bold text-xl font-sora mb-2">No Articles Yet</p>
            <p className="text-[#c4b5fd]/60 text-sm mb-6">Get started by creating your first blog article.</p>
            <button onClick={openNew} className="btn-primary py-2 px-8 text-sm cursor-none">
              <Plus className="w-4 h-4 inline mr-2" /> Create First Article
            </button>
          </div>
        ) : (
          <div className="glass-card rounded-2xl border border-violet-500/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-violet-500/10 bg-violet-500/5">
                  <th className="text-left px-6 py-4 text-xs text-violet-400/70 font-semibold uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-4 text-xs text-violet-400/70 font-semibold uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-4 text-xs text-violet-400/70 font-semibold uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-center px-4 py-4 text-xs text-violet-400/70 font-semibold uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-xs text-violet-400/70 font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post, i) => (
                  <motion.tr key={post.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-violet-500/5 hover:bg-violet-500/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white line-clamp-1">{post.title}</div>
                      <div className="text-xs text-[#c4b5fd]/50 mt-0.5 hidden sm:block">
                        {readTime(post.content)} · {post.views || 0} views
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/15">
                        {post.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[#c4b5fd]/60 hidden lg:table-cell text-xs">
                      {formatDate(post.publishDate || post.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => toggleStatus(post)}
                        title="Click to toggle status"
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-none ${
                          post.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                        }`}>
                        {post.status === 'published'
                          ? <><CheckCircle2 className="w-3 h-3" /> Published</>
                          : <><FileText className="w-3 h-3" /> Draft</>}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(post)}
                          className="p-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/25 text-violet-300 hover:text-white transition-all cursor-none"
                          title="Edit Article">
                          <PenSquare className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(post)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-none"
                          title="Delete Article">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {deleteTarget && (
        <ConfirmDialog title={deleteTarget.title} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────
  // RENDER: EDITOR VIEW
  // ─────────────────────────────────────────────────────────
  const renderEditor = () => (
    <div className="min-h-screen bg-void text-white">
      <Helmet>
        <title>{editingPost ? 'Edit Article' : 'New Article'} | Orvion Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Editor Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#030008]/90 backdrop-blur-xl border-b border-violet-500/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')}
            className="flex items-center gap-2 text-sm text-[#c4b5fd]/70 hover:text-white transition-colors cursor-none">
            <X className="w-4 h-4" /> Close Editor
          </button>
          <span className="h-5 w-px bg-violet-500/20" />
          <span className="text-sm font-semibold text-white">
            {editingPost ? 'Edit Article' : 'Create New Article'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button"
            onClick={() => { setForm(f => ({ ...f, status: f.status === 'published' ? 'draft' : 'published' })); }}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border font-medium transition-all cursor-none ${
              form.status === 'published'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
            {form.status === 'published' ? <><Globe className="w-3.5 h-3.5" /> Published</> : <><FileText className="w-3.5 h-3.5" /> Draft</>}
          </button>
          <button form="blog-form" type="submit" disabled={saving}
            className="btn-primary py-2.5 px-6 text-sm cursor-none flex items-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            {saving ? 'Saving...' : (editingPost ? 'Update Article' : 'Save Article')}
          </button>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        {saveMsg.text && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl text-sm flex gap-3 items-center ${
              saveMsg.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                : 'bg-red-500/10 border border-red-500/20 text-red-300'
            }`}>
            {saveMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {saveMsg.text}
          </motion.div>
        )}

        <form id="blog-form" onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="glass-card rounded-2xl p-6 border border-violet-500/10">
                <label className="block text-xs font-semibold text-violet-400/80 uppercase tracking-wider mb-3">
                  Article Title *
                </label>
                <input type="text" required placeholder="Enter a compelling article title..."
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-transparent text-2xl font-bold text-white outline-none placeholder:text-[#c4b5fd]/30 cursor-none" />
              </div>

              {/* Rich Text Content */}
              <div className="glass-card rounded-2xl border border-violet-500/10 overflow-hidden">
                <div className="px-6 pt-5 pb-2 border-b border-violet-500/10">
                  <label className="text-xs font-semibold text-violet-400/80 uppercase tracking-wider">
                    Article Content *
                  </label>
                  <p className="text-xs text-[#c4b5fd]/40 mt-0.5">Write HTML or use the toolbar to format your content</p>
                </div>
                <RichToolbar onFormat={applyFormat} />
                <textarea
                  id="blog-content-editor"
                  required
                  placeholder="<p>Write your article content here...</p>"
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={22}
                  className="w-full p-6 bg-transparent text-[#c4b5fd]/90 outline-none resize-y font-mono text-sm leading-relaxed cursor-none"
                />
              </div>

              {/* Live Preview */}
              {form.content && (
                <div className="glass-card rounded-2xl border border-violet-500/10 p-6">
                  <label className="block text-xs font-semibold text-violet-400/80 uppercase tracking-wider mb-4">
                    Content Preview
                  </label>
                  <div
                    className="rich-text-content text-[#c4b5fd]/85 text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: form.content }}
                  />
                </div>
              )}

              {/* SEO Fields */}
              <div className="glass-card rounded-2xl p-6 border border-violet-500/10 space-y-5">
                <h3 className="text-xs font-semibold text-violet-400/80 uppercase tracking-wider border-b border-violet-500/10 pb-3">
                  SEO Metadata
                </h3>
                <div>
                  <label className="block text-xs text-[#c4b5fd]/60 mb-2">Meta Title</label>
                  <input type="text" placeholder="Custom title for search engines (defaults to article title)"
                    value={form.metaTitle} onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-sm outline-none transition-all cursor-none" />
                </div>
                <div>
                  <label className="block text-xs text-[#c4b5fd]/60 mb-2">
                    Meta Description <span className="text-violet-400/50">({form.metaDescription.length}/160)</span>
                  </label>
                  <textarea placeholder="Write a compelling 160-character summary for search engine snippets..."
                    value={form.metaDescription} onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value.slice(0, 160) }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-sm outline-none transition-all resize-none cursor-none" />
                </div>
              </div>
            </div>

            {/* Right: Sidebar Settings */}
            <div className="space-y-5">
              {/* Publish Settings */}
              <div className="glass-card rounded-2xl p-5 border border-violet-500/10 space-y-4">
                <h3 className="text-xs font-semibold text-violet-400/80 uppercase tracking-wider border-b border-violet-500/10 pb-3">
                  Publish Settings
                </h3>

                <div>
                  <label className="block text-xs text-[#c4b5fd]/60 mb-2">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-sm outline-none transition-all cursor-none">
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Live)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#c4b5fd]/60 mb-2">Publish Date</label>
                  <input type="date" value={form.publishDate} onChange={e => setForm(f => ({ ...f, publishDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-sm outline-none transition-all cursor-none" />
                </div>

                <div>
                  <label className="block text-xs text-[#c4b5fd]/60 mb-2">Author Name</label>
                  <input type="text" placeholder="Author name" value={form.authorName}
                    onChange={e => setForm(f => ({ ...f, authorName: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-sm outline-none transition-all cursor-none" />
                </div>
              </div>

              {/* Featured Image */}
              <div className="glass-card rounded-2xl p-5 border border-violet-500/10 space-y-4">
                <h3 className="text-xs font-semibold text-violet-400/80 uppercase tracking-wider border-b border-violet-500/10 pb-3">
                  Featured Image
                </h3>
                {form.featuredImage && (
                  <div className="relative rounded-xl overflow-hidden h-36 bg-violet-950/20">
                    <img src={form.featuredImage.startsWith('http') ? form.featuredImage : `${API_BASE}${form.featuredImage}`}
                      alt="Featured" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setForm(f => ({ ...f, featuredImage: '' }))}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-600/90 text-white cursor-none hover:bg-red-700">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-violet-500/20 hover:border-violet-500/50 rounded-xl cursor-pointer transition-colors group">
                  {imageUploading ? (
                    <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                  ) : (
                    <Image className="w-5 h-5 text-violet-400/60 group-hover:text-violet-400 transition-colors" />
                  )}
                  <span className="text-xs text-[#c4b5fd]/60 text-center">
                    {imageUploading ? 'Uploading...' : 'Click to upload image\nJPG, PNG, WEBP — Max 5MB'}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={imageUploading} />
                </label>
                <div>
                  <input type="text" placeholder="Or paste image URL..." value={form.featuredImage}
                    onChange={e => setForm(f => ({ ...f, featuredImage: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-xs outline-none transition-all cursor-none" />
                </div>
              </div>

              {/* Taxonomy */}
              <div className="glass-card rounded-2xl p-5 border border-violet-500/10 space-y-4">
                <h3 className="text-xs font-semibold text-violet-400/80 uppercase tracking-wider border-b border-violet-500/10 pb-3">
                  Taxonomy
                </h3>
                <div>
                  <label className="block text-xs text-[#c4b5fd]/60 mb-2">Category</label>
                  <input type="text" placeholder="e.g. Web Development, AI, Marketing"
                    value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-sm outline-none transition-all cursor-none" />
                </div>
                <div>
                  <label className="block text-xs text-[#c4b5fd]/60 mb-2">Tags (comma separated)</label>
                  <input type="text" placeholder="react, node.js, api, tutorial"
                    value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0c051a]/60 border border-violet-500/15 focus:border-violet-500/50 rounded-xl text-white text-sm outline-none transition-all cursor-none" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );

  return view === 'list' ? renderList() : renderEditor();
};

export default AdminDashboard;
