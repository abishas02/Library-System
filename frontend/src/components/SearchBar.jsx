import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <Search size={18} style={{
        position: 'absolute', left: '16px', top: '50%',
        transform: 'translateY(-50%)', color: '#6366f1'
      }} />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by title, author, or genre..."
        style={{
          width: '100%',
          padding: '14px 48px',
          background: 'rgba(30,41,59,0.8)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '12px',
          color: '#e2e8f0',
          fontSize: '15px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#6366f1'}
        onBlur={e => e.target.style.borderColor = 'rgba(99,102,241,0.3)'}
      />
      {query && (
        <button onClick={handleClear} style={{
          position: 'absolute', right: '16px', top: '50%',
          transform: 'translateY(-50%)', background: 'none',
          border: 'none', cursor: 'pointer', color: '#64748b'
        }}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}