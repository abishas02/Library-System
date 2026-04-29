import { useState, useEffect } from 'react';
import { X, BookPlus } from 'lucide-react';

const genres = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Technology', 'Biography', 'Fantasy', 'Mystery', 'Other'];

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  background: 'rgba(15,23,42,0.8)',
  border: '1px solid rgba(99,102,241,0.25)',
  borderRadius: '8px',
  color: '#e2e8f0',
  fontSize: '14px',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#94a3b8',
  marginBottom: '6px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

export default function BookForm({ book, onSubmit, onClose }) {
  const [form, setForm] = useState({
    title: '', author: '', genre: 'Fiction',
    isbn: '', publishedYear: '', quantity: 1,
    available: true, description: ''
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || 'Fiction',
        isbn: book.isbn || '',
        publishedYear: book.publishedYear || '',
        quantity: book.quantity || 1,
        available: book.available !== undefined ? book.available : true,
        description: book.description || ''
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined, quantity: Number(form.quantity) });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b, #1e1b4b)',
        border: '1px solid rgba(99,102,241,0.4)',
        borderRadius: '20px',
        padding: '32px',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '10px', padding: '8px' }}>
              <BookPlus size={20} color="white" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#e2e8f0' }}>
              {book ? 'Update Book' : 'Add New Book'}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: '#ef4444' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Title */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Book Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. The Great Gatsby" style={inputStyle} />
            </div>
            {/* Author */}
            <div>
              <label style={labelStyle}>Author *</label>
              <input name="author" value={form.author} onChange={handleChange} required placeholder="e.g. F. Scott Fitzgerald" style={inputStyle} />
            </div>
            {/* Genre */}
            <div>
              <label style={labelStyle}>Genre *</label>
              <select name="genre" value={form.genre} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                {genres.map(g => <option key={g} value={g} style={{ background: '#1e293b' }}>{g}</option>)}
              </select>
            </div>
            {/* ISBN */}
            <div>
              <label style={labelStyle}>ISBN</label>
              <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="e.g. 978-3-16-148410-0" style={inputStyle} />
            </div>
            {/* Year */}
            <div>
              <label style={labelStyle}>Published Year</label>
              <input name="publishedYear" type="number" value={form.publishedYear} onChange={handleChange} placeholder="e.g. 2023" style={inputStyle} min="1000" max={new Date().getFullYear()} />
            </div>
            {/* Quantity */}
            <div>
              <label style={labelStyle}>Quantity</label>
              <input name="quantity" type="number" value={form.quantity} onChange={handleChange} min="0" style={inputStyle} />
            </div>
            {/* Available checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
              <input type="checkbox" name="available" id="available" checked={form.available} onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: '#6366f1', cursor: 'pointer' }} />
              <label htmlFor="available" style={{ color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Available for borrowing</label>
            </div>
            {/* Description */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Brief description of the book..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: '12px', background: 'rgba(100,116,139,0.2)',
              border: '1px solid rgba(100,116,139,0.3)', borderRadius: '10px',
              color: '#94a3b8', cursor: 'pointer', fontWeight: 600
            }}>Cancel</button>
            <button type="submit" style={{
              flex: 2, padding: '12px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none', borderRadius: '10px',
              color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '15px'
            }}>
              {book ? '✅ Update Book' : '📚 Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}