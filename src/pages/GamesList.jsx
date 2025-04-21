import { useState } from 'react';
import styled from 'styled-components';
import { useGames } from '../context/GamesContext';
import { FaSearch, FaFilter, FaStar, FaGamepad, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GamesListContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  margin-left: 250px; /* Account for sidebar width */
  padding-top: 80px; /* Account for navbar height */
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
    padding-top: 80px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin: 0;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
  flex: 1;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const FilterLabel = styled.label`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PriceInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
`;

const GameCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const GameContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const GameTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.text};
`;

const GameDescription = styled.p`
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  flex-grow: 1;
`;

const GameDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const GameInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

const GameFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FeatureTag = styled.span`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const GameActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const GamePrice = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-weight: bold;
`;

const DownloadButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

function GamesList() {
  const { games } = useGames();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);

  const categories = ['all', 'Action', 'Adventure', 'RPG', 'Strategy', 'Puzzle', 'Racing', 'Survival'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || game.category === category;
    const matchesPrice = (!minPrice || game.price >= parseFloat(minPrice)) &&
                        (!maxPrice || game.price <= parseFloat(maxPrice));
    const matchesRating = game.rating >= minRating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const handleDownload = (gameId) => {
    const game = games.find(g => g.id === gameId);
    toast.success(`Downloading ${game?.title}...`);
  };

  return (
    <GamesListContainer>
      <Header>
        <Title>Explore Games</Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
      </Header>

      <FilterSection>
        <FilterGroup>
          <FilterLabel>Category</FilterLabel>
          <FilterSelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Price Range</FilterLabel>
          <PriceRange>
            <PriceInput
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
              step="0.01"
            />
            <span>to</span>
            <PriceInput
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </PriceRange>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Minimum Rating</FilterLabel>
          <FilterSelect
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
          >
            <option value="0">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </FilterSelect>
        </FilterGroup>
      </FilterSection>

      <GamesGrid>
        {filteredGames.map((game) => (
          <GameCard key={game.id}>
            <GameImage src={game.imageUrl} alt={game.title} />
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              
              <GameDetails>
                <GameInfo>
                  <FaStar />
                  {game.rating.toFixed(1)} Rating
                </GameInfo>
                <GameInfo>
                  <FaGamepad />
                  {game.category}
                </GameInfo>
                <GameInfo>
                  <FaDownload />
                  {game.downloads} Downloads
                </GameInfo>
              </GameDetails>

              <GameFeatures>
                {game.features.map((feature, index) => (
                  <FeatureTag key={index}>{feature}</FeatureTag>
                ))}
              </GameFeatures>

              <GameActions>
                <GamePrice>${game.price.toFixed(2)}</GamePrice>
                <DownloadButton onClick={() => handleDownload(game.id)}>
                  Download
                </DownloadButton>
              </GameActions>
            </GameContent>
          </GameCard>
        ))}
      </GamesGrid>
    </GamesListContainer>
  );
}

export default GamesList; 