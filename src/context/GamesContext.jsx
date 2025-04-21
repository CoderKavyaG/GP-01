import { createContext, useState, useContext } from 'react';

const GamesContext = createContext();

export const useGames = () => useContext(GamesContext);

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Cyberpunk 2077',
      description: 'An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.',
      imageUrl: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&auto=format&fit=crop&q=60',
      rating: 4.5,
      downloads: '1M+',
      category: 'RPG',
      price: 59.99,
      features: ['Open World', 'RPG', 'Action']
    },
    {
      id: 2,
      title: 'Elden Ring',
      description: 'A new fantasy action-RPG where you become an Elden Lord in the Lands Between.',
      imageUrl: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      downloads: '500K+',
      category: 'Action',
      price: 59.99,
      features: ['Open World', 'RPG', 'Souls-like']
    }
  ]);

  const addGame = (newGame) => {
    const gameWithId = {
      ...newGame,
      id: Date.now(),
      rating: newGame.rating || 0,
      downloads: '0',
      features: newGame.features || []
    };
    setGames([...games, gameWithId]);
  };

  return (
    <GamesContext.Provider value={{ games, addGame }}>
      {children}
    </GamesContext.Provider>
  );
}; 