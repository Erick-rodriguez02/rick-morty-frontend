'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="flex justify-center w-full px-4 mb-12">
      <input
        type="text"
        placeholder="Busca un personaje... (ej. Rick, Morty, Summer)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="live-search-input"
      />
    </div>
  );
}
