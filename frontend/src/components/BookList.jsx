import { Pencil, Trash2, BookOpen, Calendar, Hash, CheckCircle, XCircle } from 'lucide-react';

const genreColors = {
  Fiction: '#6366f1', 'Non-Fiction': '#10b981', Science: '#06b6d4',
  History: '#f59e0b', Technology: '#8b5cf6', Biography: '#ec4899',
  Fantasy: '#14b8a6', Mystery: '#f97316', Other: '#64748b'
};

export default function BookList({ books, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>📚</div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '80px 20px',
        background: 'rgba(30,41,59,0.4)',
        border: '1px dashed rgba(99,102,241,0.3)',
        borderRadius: '20px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📖</div>
        <h3 style={{ color: '#e2e8f0', marginBottom: '8px' }}>No books found</h3>
        <p style={{ color: '#64748b' }}>Add your first book or try a different search.</p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>
        Showing {books.length} book{books.length !== 1 ? 's' : ''}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {books.map(book => (
          <div key={book._id} style={{
            background: 'rgba(30,41,59,0.7)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '16px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
            transition: 'transform 0.2s, border-color 0.2s',
            cursor: 'default'
          }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
          >
            {/* Genre badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{
                background: `${genreColors[book.genre] || '#64748b'}22`,
                border: `1px solid ${genreColors[book.genre] || '#64748b'}55`,
                color: genreColors[book.genre] || '#64748b',
                padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600
              }}>{book.genre}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: book.available ? '#10b981' : '#ef4444' }}>
                {book.available ? <CheckCircle size={13} /> : <XCircle size={13} />}
                {book.available ? 'Available' : 'Unavailable'}
              </span>
            </div>

            {/* Title & Author */}
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', marginBottom: '4px', lineHeight: 1.3 }}>
              {book.title}
            </h3>
            <p style={{ fontSize: '13px', color: '#a78bfa', marginBottom: '12px' }}>by {book.author}</p>

            {/* Description */}
            {book.description && (
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', lineHeight: 1.5,
                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {book.description}
              </p>
            )}

            {/* Meta */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {book.publishedYear && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
                  <Calendar size={12} /> {book.publishedYear}
                </span>
              )}
              {book.isbn && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
                  <Hash size={12} /> {book.isbn}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
                <BookOpen size={12} /> Qty: {book.quantity}
              </span>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => onEdit(book)} style={{
                flex: 1, padding: '8px', background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px',
                color: '#818cf8', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 600
              }}>
                <Pencil size={13} /> Edit
              </button>
              <button onClick={() => onDelete(book._id)} style={{
                flex: 1, padding: '8px', background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px',
                color: '#ef4444', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 600
              }}>
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}