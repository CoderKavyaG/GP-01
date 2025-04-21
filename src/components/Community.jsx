import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUsers, FaLock, FaLockOpen, FaPlus, FaTrash, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const CommunityContainer = styled.div`
  padding: 2rem;
  color: #ffffff;
  min-height: calc(100vh - 60px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const CreateButton = styled.button`
  background: linear-gradient(45deg, #00ff00, #00ffff);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
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
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  border: 1px solid #00ffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: #fff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00ffff;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #00ff00, #00ffff);
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.02);
  }
`;

const CommunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CommunityCard = styled.div`
  background: #1a1a1a;
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid #333;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
    border-color: #00ffff;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
`;

const PrivacyBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  background: ${props => props.private ? '#ff4444' : '#00ff00'};
  color: #000;
`;

const CardDescription = styled.p`
  color: #aaa;
  margin-bottom: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #fff;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(45deg, #00ff00, #00ffff)' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: ${props => props.primary ? '#000' : '#fff'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Community = () => {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
    isPrivate: false,
    tags: []
  });
  const [userId, setUserId] = useState('user123'); // For testing purposes

  const API_URL = 'http://localhost:5000/api/communities';

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(API_URL);
      setCommunities(response.data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newCommunity);
      setNewCommunity({
        name: '',
        description: '',
        isPrivate: false,
        tags: []
      });
      setShowModal(false);
      fetchCommunities();
    } catch (error) {
      console.error('Error creating community:', error);
    }
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      await axios.post(`${API_URL}/${communityId}/join`, { userId });
      fetchCommunities();
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    try {
      await axios.post(`${API_URL}/${communityId}/leave`, { userId });
      fetchCommunities();
    } catch (error) {
      console.error('Error leaving community:', error);
    }
  };

  const handleDeleteCommunity = async (communityId) => {
    try {
      await axios.delete(`${API_URL}/${communityId}`);
      fetchCommunities();
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  };

  return (
    <CommunityContainer>
      <Header>
        <Title>Communities</Title>
        <CreateButton onClick={() => setShowModal(true)}>
          <FaPlus /> Create Community
        </CreateButton>
      </Header>

      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Create New Community</h2>
            <Form onSubmit={handleCreateCommunity}>
              <Input
                type="text"
                placeholder="Community Name"
                value={newCommunity.name}
                onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                required
              />
              <TextArea
                placeholder="Community Description"
                value={newCommunity.description}
                onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                required
              />
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={newCommunity.isPrivate}
                  onChange={(e) => setNewCommunity({ ...newCommunity, isPrivate: e.target.checked })}
                />
                <span>Private Community</span>
              </CheckboxContainer>
              <SubmitButton type="submit">Create Community</SubmitButton>
            </Form>
          </ModalContent>
        </Modal>
      )}

      <CommunitiesGrid>
        {communities.map((community) => (
          <CommunityCard key={community.id}>
            <CardHeader>
              <CardTitle>{community.name}</CardTitle>
              <PrivacyBadge private={community.isPrivate}>
                {community.isPrivate ? <FaLock /> : <FaLockOpen />}
                {community.isPrivate ? 'Private' : 'Public'}
              </PrivacyBadge>
            </CardHeader>
            <CardDescription>{community.description}</CardDescription>
            <TagsContainer>
              {community.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
            <CardActions>
              {community.members.includes(userId) ? (
                <ActionButton onClick={() => handleLeaveCommunity(community.id)}>
                  <FaSignOutAlt /> Leave
                </ActionButton>
              ) : (
                <ActionButton primary onClick={() => handleJoinCommunity(community.id)}>
                  <FaSignInAlt /> Join
                </ActionButton>
              )}
              <ActionButton onClick={() => handleDeleteCommunity(community.id)}>
                <FaTrash /> Delete
              </ActionButton>
            </CardActions>
          </CommunityCard>
        ))}
      </CommunitiesGrid>
    </CommunityContainer>
  );
};

export default Community; 