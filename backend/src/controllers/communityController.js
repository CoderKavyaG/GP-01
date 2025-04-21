import { communityStore } from '../data/store.js';

// Create a new community
export const createCommunity = async (req, res) => {
  try {
    const { name, description, isPrivate, rules, tags } = req.body;
    
    // Check if community name already exists
    const existingCommunity = communityStore.getCommunities().find(c => c.name === name);
    if (existingCommunity) {
      return res.status(400).json({ message: 'Community name already exists' });
    }

    const community = communityStore.createCommunity({
      name,
      description,
      isPrivate,
      rules,
      tags,
      members: [],
      moderators: []
    });

    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all communities
export const getCommunities = async (req, res) => {
  try {
    const communities = communityStore.getCommunities();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single community
export const getCommunity = async (req, res) => {
  try {
    const community = communityStore.getCommunity(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    res.json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update community
export const updateCommunity = async (req, res) => {
  try {
    const community = communityStore.getCommunity(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    const updatedCommunity = communityStore.updateCommunity(req.params.id, req.body);
    res.json(updatedCommunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete community
export const deleteCommunity = async (req, res) => {
  try {
    const community = communityStore.getCommunity(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    communityStore.deleteCommunity(req.params.id);
    res.json({ message: 'Community deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Join community
export const joinCommunity = async (req, res) => {
  try {
    const { userId } = req.body;
    const community = communityStore.getCommunity(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    if (community.members.includes(userId)) {
      return res.status(400).json({ message: 'Already a member of this community' });
    }

    communityStore.addMember(req.params.id, userId);
    res.json({ message: 'Joined community successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Leave community
export const leaveCommunity = async (req, res) => {
  try {
    const { userId } = req.body;
    const community = communityStore.getCommunity(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    if (!community.members.includes(userId)) {
      return res.status(400).json({ message: 'Not a member of this community' });
    }

    communityStore.removeMember(req.params.id, userId);
    res.json({ message: 'Left community successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 