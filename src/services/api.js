// Mock data for games
const mockGames = [
  {
    id: 1,
    title: "Cyberpunk 2077",
    subtitle: "The future is now",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    genre: "Action RPG",
    rating: "4.5/5",
    players: "Single Player",
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    extendedDescription: "You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character's cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
    developer: "CD Projekt Red",
    releaseDate: "December 10, 2020",
    platforms: ["PC", "PlayStation 5", "Xbox Series X/S"],
    price: "$59.99"
  },
  {
    id: 2,
    title: "Elden Ring",
    subtitle: "Rise, Tarnished",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    genre: "Action RPG",
    rating: "4.8/5",
    players: "Single Player, Multiplayer",
    description: "Elden Ring is a fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.",
    extendedDescription: "In the Lands Between ruled by Queen Marika the Eternal, the Elden Ring, the source of the Erdtree's blessing, has been shattered. Marika's offspring, demigods all, claimed the shards of the Elden Ring known as the Great Runes, and the mad taint of their newfound strength triggered a war: The Shattering.",
    developer: "FromSoftware",
    releaseDate: "February 25, 2022",
    platforms: ["PC", "PlayStation 5", "Xbox Series X/S", "PlayStation 4", "Xbox One"],
    price: "$59.99"
  },
  {
    id: 3,
    title: "God of War Ragnarök",
    subtitle: "The end is coming",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    genre: "Action Adventure",
    rating: "4.9/5",
    players: "Single Player",
    description: "Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives.",
    extendedDescription: "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world.",
    developer: "Santa Monica Studio",
    releaseDate: "November 9, 2022",
    platforms: ["PlayStation 5", "PlayStation 4"],
    price: "$69.99"
  }
];

// Mock data for news
const mockNews = [
  {
    id: 1,
    title: "New Game Release: Starfield Takes Players to the Stars",
    description: "Bethesda's highly anticipated space RPG Starfield has finally launched, offering players an expansive universe to explore.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "2023-09-06"
  },
  {
    id: 2,
    title: "E3 2023: Biggest Gaming Announcements",
    description: "From new console reveals to blockbuster game announcements, here are the biggest moments from E3 2023.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    date: "2023-06-15"
  },
  {
    id: 3,
    title: "Gaming Industry Reaches New Milestone",
    description: "The global gaming industry has surpassed $200 billion in revenue, marking a new record for the entertainment sector.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "2023-08-22"
  }
];

// API service functions
export const api = {
  // Get game by ID
  getGame: async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const game = mockGames.find(game => game.id === parseInt(id));
    if (!game) {
      throw new Error('Game not found');
    }
    return game;
  },

  // Get top games
  getTopGames: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockGames;
  },

  // Get top news
  getTopNews: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNews;
  }
}; 