import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import { FaGamepad, FaStar, FaDownload, FaEye, FaChevronRight } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%);
  color: #fff;
  padding: 2rem;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80') center/cover;
  opacity: 0.2;
  z-index: 0;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const HeroButton = styled(Link)`
  background: ${props => props.primary ? 'linear-gradient(45deg, #8a2be2, #9370db)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.primary ? '0 10px 20px rgba(138, 43, 226, 0.3)' : '0 10px 20px rgba(255, 255, 255, 0.1)'};
  }
`;

const Title = styled.h1`
  font-family: 'Rajdhani', sans-serif;
  font-size: 6rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #8a2be2, #9370db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 4px;
  line-height: 1;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.5);

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.p`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  margin: 1rem 0 2rem;
  color: #b8b8d1;
  max-width: 600px;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const AboutSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const AboutDescription = styled.p`
  font-size: 1.2rem;
  color: #b8b8d1;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureItem = styled.div`
  background: rgba(138, 43, 226, 0.1);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 43, 226, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const FeatureDescription = styled.p`
  color: #b8b8d1;
  line-height: 1.6;
`;

const Section = styled.section`
  padding: 4rem 2rem;
`;

const FeaturedGame = styled.div`
  background: rgba(138, 43, 226, 0.1);
  border-radius: 20px;
  overflow: hidden;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 43, 226, 0.2);
  animation: ${fadeIn} 1s ease-out;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FeaturedGameHeroImage = styled.div`
  width: 100%;
  height: 300px;
  background: url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80') center/cover;
  position: relative;

  @media (min-width: 768px) {
    width: 50%;
    height: auto;
  }
`;

const FeaturedGameHeroContent = styled.div`
  padding: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const FeaturedGameHeroTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
`;

const FeaturedGameHeroDescription = styled.p`
  color: #b8b8d1;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeaturedGameHeroStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8a2be2;
`;

const FeaturedGameHeroButton = styled.button`
  background: linear-gradient(45deg, #8a2be2, #9370db);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 2rem 0;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: #8a2be2;
  }
`;

// Mock data for latest games
const latestGames = [
  {
    title: 'Cyberpunk 2077: Phantom Liberty',
    image: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    info: 'New DLC • Available Now'
  },
  {
    title: 'Starfield',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'Space RPG • Coming Soon'
  },
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'Action Adventure • Available Now'
  },
  {
    title: 'Baldur\'s Gate 3',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'RPG • Available Now'
  },
  {
    title: 'Marvel\'s Spider-Man 2',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'Action • Coming Soon'
  }
];

// Mock data for trending games
const trendingGames = [
  {
    title: 'Counter-Strike 2',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'FPS • Trending Now'
  },
  {
    title: 'Valorant',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'Tactical Shooter • Popular'
  },
  {
    title: 'League of Legends',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'MOBA • Most Played'
  },
  {
    title: 'Fortnite',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'Battle Royale • Trending'
  },
  {
    title: 'Minecraft',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    info: 'Sandbox • Always Popular'
  }
];

function LandingPage() {
  const [featuredGame] = useState({
    title: "Neural Nexus",
    description: "Step into a world where AI and human consciousness merge in this groundbreaking action-adventure game. Experience a dynamic narrative that adapts to your choices, powered by advanced AI algorithms. Battle through procedurally generated levels, each uniquely crafted based on your playstyle. The game's AI learns from your actions, creating a truly personalized gaming experience.",
    stats: {
      downloads: "50K+",
      views: "100K+"
    }
  });

  return (
    <LandingContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <Title>GAMEIPEDIA</Title>
          <Subtitle>Your Ultimate Gaming Destination</Subtitle>
          <HeroButtons>
            <HeroButton primary to="/games">
              <FaGamepad /> Explore Games
            </HeroButton>
            <HeroButton to="/developer-portal">
              <FaStar /> Developer Portal
            </HeroButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturedGame>
        <FeaturedGameHeroImage />
        <FeaturedGameHeroContent>
          <FeaturedGameHeroTitle>{featuredGame.title}</FeaturedGameHeroTitle>
          <FeaturedGameHeroDescription>{featuredGame.description}</FeaturedGameHeroDescription>
          <FeaturedGameHeroStats>
            <StatItem>
              <FaDownload /> {featuredGame.stats.downloads} Downloads
            </StatItem>
            <StatItem>
              <FaEye /> {featuredGame.stats.views} Views
            </StatItem>
          </FeaturedGameHeroStats>
          <FeaturedGameHeroButton>
            <FaGamepad /> Play Now
          </FeaturedGameHeroButton>
        </FeaturedGameHeroContent>
      </FeaturedGame>

      <Section>
        <SectionTitle>
          <FaChevronRight /> Latest Releases
        </SectionTitle>
        <GameCarousel items={latestGames} />
      </Section>

      <Section>
        <SectionTitle>
          <FaChevronRight /> Trending Now
        </SectionTitle>
        <GameCarousel items={trendingGames} />
      </Section>

      <AboutSection>
        <AboutTitle>What is Gameipedia?</AboutTitle>
        <AboutDescription>
          Gameipedia is your ultimate destination for discovering, exploring, and connecting with the gaming world. 
          Whether you're a casual player or a hardcore enthusiast, we've got something for everyone.
        </AboutDescription>
        <FeaturesGrid>
          <FeatureItem>
            <FeatureTitle>Comprehensive Database</FeatureTitle>
            <FeatureDescription>
              Access detailed information about thousands of games across all platforms
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>Developer Portal</FeatureTitle>
            <FeatureDescription>
              Submit and showcase your games to reach a global audience
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>Community Driven</FeatureTitle>
            <FeatureDescription>
              Join a vibrant community of gamers and developers
            </FeatureDescription>
          </FeatureItem>
        </FeaturesGrid>
      </AboutSection>
    </LandingContainer>
  );
}

export default LandingPage; 