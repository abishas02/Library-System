import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { BookOpen, Plus, Library } from 'lucide-react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooks = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const url = query
        ? `${API}/api/books/search?q=${encodeURIComponent(query)}`
        : `${API}/api/books`;
      const res = await axios.get(url);
      setBooks(res.data.data);
    } catch {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchBooks(query);
  };

  const handleAddBook = async (bookData) => {
    try {
      await axios.post(`${API}/api/books`, bookData);
      toast.success('📚 Book added successfully!');
      setShowForm(false);
      fetchBooks(searchQuery);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add book');
    }
  };

  const handleUpdateBook = async (bookData) => {
    try {
      await axios.put(`${API}/api/books/${editingBook._id}`, bookData);
      toast.success('✅ Book updated successfully!');
      setEditingBook(null);
      setShowForm(false);
      fetchBooks(searchQuery);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update book');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`${API}/api/books/${id}`);
      toast.success('🗑️ Book deleted!');
      fetchBooks(searchQuery);
    } catch {
      toast.error('Failed to delete book');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1e293b', color: '#e2e8f0', border: '1px solid #334155' }
      }} />

      {/* Header */}
      <header style={{
        background: 'rgba(15,23,42,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.3)',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', padding: '8px' }}>
              <Library size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                LibraryMS
              </h1>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Management System</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', padding: '6px 14px', fontSize: '13px', color: '#a78bfa' }}>
              <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
              {books.length} Books
            </div>
            <button
              onClick={() => { setShowForm(true); setEditingBook(null); }}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              <Plus size={16} /> Add Book
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Books', value: books.length, color: '#6366f1' },
            { label: 'Available', value: books.filter(b => b.available).length, color: '#10b981' },
            { label: 'Unavailable', value: books.filter(b => !b.available).length, color: '#ef4444' },
            { label: 'Genres', value: [...new Set(books.map(b => b.genre))].length, color: '#f59e0b' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(30,41,59,0.6)',
              border: `1px solid ${stat.color}33`,
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Book Form Modal */}
        {showForm && (
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleAddBook}
            onClose={handleCloseForm}
          />
        )}

        {/* Book List */}
        <BookList
          books={books}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteBook}
        />
      </main>
    </div>
  );
}
