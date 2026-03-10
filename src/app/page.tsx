'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CharacterCard from '@/components/CharacterCard';

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setCharacters([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      // Usar la URL de Render directamente para evitar problemas de build
      const apiUrl = 'https://rick-morty-backend-72dn.onrender.com';
      
      console.log('Conectando con la API de producción:', apiUrl);
      const response = await fetch(
        `${apiUrl}/characters?name=${encodeURIComponent(query)}`,
        { signal }
      );
      if (!response.ok) throw new Error('Error al buscar personajes');
      const data = await response.json();
      setCharacters(data.results || []);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError('No se pudieron cargar los personajes. El portal dimensional parece estar cerrado.');
      console.error(err);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }

    return () => controller.abort();
  };

  return (
    <div className="relative min-height-screen">
      {/* Portal Background */}
      <div className="portal-container">
        <div className="portal"></div>
      </div>

      <main className="max-w-7xl mx-auto py-20 px-4 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-black mb-4 text-[var(--slime-green)] drop-shadow-[0_0_15px_rgba(151,206,76,0.5)]">
            RICK & MORTY
          </h1>
          <p className="text-xl opacity-60">Busca a tus personajes favoritos de todas las dimensiones</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-center text-2xl animate-pulse text-[var(--slime-green)]">
            Abriendo portal dimensional...
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-900/50 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {!loading && !error && characters.length === 0 && (
          <div className="text-center opacity-40 italic">
            Escribe algo para empezar la búsqueda
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </main>
    </div>
  );
}
