import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { api } from '../services/api';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const GameFeatureContainer = styled.div`
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const HeroSection = styled.div`
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 4rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  z-index: 1;
  animation: ${slideIn} 0.8s ease-out;
`;

const GameTitle = styled.h1`
  font-family: 'Rajdhani', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const GameSubtitle = styled.p`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 1rem 0;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

const GameMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FeaturedSection = styled.section`
  margin: 4rem 0;
  animation: ${fadeIn} 0.5s ease-out;
`;

const SectionTitle = styled.h2`
  font-family: 'Rajdhani', sans-serif;
  font-size: 2rem;
  color: white;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeaturedCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.2rem;
  color: white;
  margin: 0 0 0.5rem;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
`;

const GameDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Description = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
`;

const DescriptionTitle = styled.h3`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const DescriptionText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const GameInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 15px;
`;

const InfoItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  color: white;
`;

function GameFeaturePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [topGames, setTopGames] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch game details
        const gameData = await api.getGame(id);
        setGame(gameData);

        // Fetch top games
        const gamesData = await api.getTopGames();
        setTopGames(gamesData.filter(g => g.id !== parseInt(id)).slice(0, 3));

        // Fetch top news
        const newsData = await api.getTopNews();
        setTopNews(newsData.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading game details...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
        <BackButton onClick={() => navigate('/games')}>Back to Games</BackButton>
      </ErrorContainer>
    );
  }

  return (
    <GameFeatureContainer>
      <HeroSection>
        <HeroImage src={game.image} alt={game.title} />
        <HeroContent>
          <GameTitle>{game.title}</GameTitle>
          <GameSubtitle>{game.subtitle}</GameSubtitle>
          <GameMeta>
            <MetaItem>
              <span>🎮</span>
              {game.genre}
            </MetaItem>
            <MetaItem>
              <span>⭐</span>
              {game.rating}
            </MetaItem>
            <MetaItem>
              <span>👥</span>
              {game.players}
            </MetaItem>
          </GameMeta>
        </HeroContent>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Top Games</SectionTitle>
        <FeaturedGrid>
          {topGames.map(game => (
            <FeaturedCard key={game.id} onClick={() => navigate(`/game/${game.id}`)}>
              <CardImage src={game.image} alt={game.title} />
              <CardContent>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardContent>
            </FeaturedCard>
          ))}
        </FeaturedGrid>
      </FeaturedSection>

      <FeaturedSection>
        <SectionTitle>Top News</SectionTitle>
        <FeaturedGrid>
          {topNews.map(news => (
            <FeaturedCard key={news.id}>
              <CardImage src={news.image} alt={news.title} />
              <CardContent>
                <CardTitle>{news.title}</CardTitle>
                <CardDescription>{news.description}</CardDescription>
              </CardContent>
            </FeaturedCard>
          ))}
        </FeaturedGrid>
      </FeaturedSection>

      <GameDetails>
        <Description>
          <DescriptionTitle>About the Game</DescriptionTitle>
          <DescriptionText>{game.description}</DescriptionText>
          <DescriptionText>{game.extendedDescription}</DescriptionText>
        </Description>

        <GameInfo>
          <InfoItem>
            <InfoLabel>Developer</InfoLabel>
            <InfoValue>{game.developer}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Release Date</InfoLabel>
            <InfoValue>{game.releaseDate}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Platforms</InfoLabel>
            <InfoValue>{game.platforms.join(', ')}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Price</InfoLabel>
            <InfoValue>{game.price}</InfoValue>
          </InfoItem>
        </GameInfo>
      </GameDetails>
    </GameFeatureContainer>
  );
}

// Additional styled components for loading and error states
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(155, 77, 202, 0.3);
  border-radius: 50%;
  border-top-color: #9b4dca;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.2rem;
  color: white;
  margin-top: 1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%);
  padding: 2rem;
`;

const ErrorText = styled.p`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  color: #ff6b6b;
  margin-bottom: 2rem;
  text-align: center;
`;

const BackButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #9b4dca, #6a0dad);
  color: white;
  border: none;
  border-radius: 5px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(155, 77, 202, 0.3);
  }
`;

export default GameFeaturePage; 