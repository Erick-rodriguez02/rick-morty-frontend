'use client';

interface CharacterCardProps {
  character: {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
  };
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="character-card">
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1 truncate text-[var(--slime-green)]">
          {character.name}
        </h3>
        <p className="text-sm opacity-80">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            character.status === 'Alive' ? 'bg-green-500' : 
            character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
          }`} />
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  );
}
