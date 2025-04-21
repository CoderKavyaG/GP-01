import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGamepad, FaCode, FaChartLine, FaUsers, FaTools, FaPlus, FaImage } from 'react-icons/fa';
import PaymentPortal from '../components/PaymentPortal';
import { useGames } from '../context/GamesContext';
import { toast } from 'react-toastify';

const DeveloperPortalContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 70px);
  padding-top: 70px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #ffffff;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(45deg, #8a2be2, #9370db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #cccccc;
  text-align: center;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: rgba(20, 20, 40, 0.8);
  padding: 2rem;
  border-radius: 10px;
  transition: transform 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(138, 43, 226, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(138, 43, 226, 0.3);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #8a2be2;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-family: 'Rajdhani', sans-serif;
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

const PaymentSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(20, 20, 40, 0.8);
  border-radius: 10px;
  border: 1px solid rgba(138, 43, 226, 0.2);
`;

const PaymentTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  text-align: center;
  font-family: 'Orbitron', sans-serif;
`;

const AddGameButton = styled.button`
  background: linear-gradient(45deg, #8a2be2, #9370db);
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  position: relative;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const FormLabel = styled.label`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.9rem;
`;

const FormInput = styled.input`
  padding: 0.6rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.6rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FormSelect = styled.select`
  padding: 0.6rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const ImagePreview = styled.img`
  max-width: 150px;
  max-height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-top: 0.3rem;
`;

const FeaturesInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const FeatureTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
`;

const RemoveFeatureButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.background};
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormButton = styled.button`
  padding: 0.6rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const DevelopersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const DeveloperCard = styled.div`
  background: rgba(20, 20, 40, 0.8);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(138, 43, 226, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(138, 43, 226, 0.3);
  }
`;

const DeveloperImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const DeveloperInfo = styled.div`
  padding: 1.5rem;
`;

const DeveloperName = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-family: 'Rajdhani', sans-serif;
`;

const DeveloperBio = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const DeveloperPortal = ({ showToast }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showGameForm, setShowGameForm] = useState(false);
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null,
    rating: 0,
    category: 'Action',
    price: 0,
    features: []
  });
  const [newFeature, setNewFeature] = useState('');
  const { addGame } = useGames();

  const features = [
    {
      icon: <FaGamepad />,
      title: 'Game Publishing',
      description: 'Publish your games to our platform and reach millions of gamers worldwide.'
    },
    {
      icon: <FaCode />,
      title: 'Development Tools',
      description: 'Access our comprehensive SDK and development tools to create amazing games.'
    },
    {
      icon: <FaChartLine />,
      title: 'Analytics Dashboard',
      description: 'Track your game\'s performance with real-time analytics and insights.'
    },
    {
      icon: <FaUsers />,
      title: 'Community Management',
      description: 'Engage with your players and build a loyal community around your games.'
    },
    {
      icon: <FaTools />,
      title: 'Monetization Tools',
      description: 'Multiple monetization options including in-app purchases and ads.'
    }
  ];

  const developers = [
    {
      id: 1,
      name: 'Alex Chen',
      bio: 'Indie game developer specializing in pixel art games. Creator of "Pixel Quest" and "Retro Runner".',
      image: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      bio: 'VR game developer with a passion for immersive experiences. Lead developer of "Virtual Realms".',
      image: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      bio: 'Mobile game developer with expertise in casual games. Creator of "Puzzle Master" series.',
      image: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&auto=format&fit=crop&q=60'
    }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGameData({
          ...gameData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !gameData.features.includes(newFeature.trim())) {
      setGameData({
        ...gameData,
        features: [...gameData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature) => {
    setGameData({
      ...gameData,
      features: gameData.features.filter(f => f !== feature)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameData.title || !gameData.description || !gameData.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newGame = {
      ...gameData,
      id: Date.now(),
      downloads: '0',
      imageUrl: gameData.imagePreview
    };

    addGame(newGame);
    toast.success('Game added successfully!');
    setShowGameForm(false);
    setGameData({
      title: '',
      description: '',
      image: null,
      imagePreview: null,
      rating: 0,
      category: 'Action',
      price: 0,
      features: []
    });
  };

  return (
    <DeveloperPortalContainer>
      <Title>Developer Portal</Title>
      <Description>
        Welcome to our Developer Portal! Here you can publish your games, access development tools,
        and manage your game's performance and monetization.
      </Description>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <AddGameButton onClick={() => setShowGameForm(true)}>
        <FaPlus /> Add New Game
      </AddGameButton>

      <PaymentSection>
        <PaymentTitle>Choose Your Plan</PaymentTitle>
        <PaymentPortal
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          showToast={showToast}
        />
      </PaymentSection>

      <DevelopersGrid>
        {developers.map(developer => (
          <DeveloperCard key={developer.id}>
            <DeveloperImage src={developer.image} alt={developer.name} />
            <DeveloperInfo>
              <DeveloperName>{developer.name}</DeveloperName>
              <DeveloperBio>{developer.bio}</DeveloperBio>
            </DeveloperInfo>
          </DeveloperCard>
        ))}
      </DevelopersGrid>

      {showGameForm && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowGameForm(false)}>×</CloseButton>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Game Title</FormLabel>
                <FormInput
                  type="text"
                  value={gameData.title}
                  onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormTextarea
                  value={gameData.description}
                  onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Category</FormLabel>
                <FormSelect
                  value={gameData.category}
                  onChange={(e) => setGameData({ ...gameData, category: e.target.value })}
                >
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="RPG">RPG</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Racing">Racing</option>
                  <option value="Survival">Survival</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Rating (0-5)</FormLabel>
                <FormInput
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={gameData.rating}
                  onChange={(e) => setGameData({ ...gameData, rating: parseFloat(e.target.value) })}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Price ($)</FormLabel>
                <FormInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={gameData.price}
                  onChange={(e) => setGameData({ ...gameData, price: parseFloat(e.target.value) })}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Features</FormLabel>
                <FeaturesInput>
                  <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                    <FormInput
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                    />
                    <FormButton type="button" onClick={handleAddFeature}>
                      Add
                    </FormButton>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {gameData.features.map((feature, index) => (
                      <FeatureTag key={index}>
                        {feature}
                        <RemoveFeatureButton onClick={() => handleRemoveFeature(feature)}>
                          ×
                        </RemoveFeatureButton>
                      </FeatureTag>
                    ))}
                  </div>
                </FeaturesInput>
              </FormGroup>

              <FormGroup>
                <FormLabel>Game Cover Image</FormLabel>
                <ImageUpload>
                  <FormInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {gameData.imagePreview && (
                    <ImagePreview src={gameData.imagePreview} alt="Preview" />
                  )}
                </ImageUpload>
              </FormGroup>

              <FormButton type="submit">Submit Game</FormButton>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </DeveloperPortalContainer>
  );
};

export default DeveloperPortal; 