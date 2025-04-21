// In-memory data store
let communities = [];
let users = [];

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Community store methods
export const communityStore = {
  // Create a new community
  createCommunity: (communityData) => {
    const newCommunity = {
      id: generateId(),
      ...communityData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    communities.push(newCommunity);
    return newCommunity;
  },

  // Get all communities
  getCommunities: () => communities,

  // Get a single community by ID
  getCommunity: (id) => communities.find(c => c.id === id),

  // Update a community
  updateCommunity: (id, updates) => {
    const index = communities.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    communities[index] = {
      ...communities[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return communities[index];
  },

  // Delete a community
  deleteCommunity: (id) => {
    const index = communities.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    communities.splice(index, 1);
    return true;
  },

  // Add member to community
  addMember: (communityId, userId) => {
    const community = communities.find(c => c.id === communityId);
    if (!community) return false;
    
    if (!community.members.includes(userId)) {
      community.members.push(userId);
      return true;
    }
    return false;
  },

  // Remove member from community
  removeMember: (communityId, userId) => {
    const community = communities.find(c => c.id === communityId);
    if (!community) return false;
    
    community.members = community.members.filter(id => id !== userId);
    community.moderators = community.moderators.filter(id => id !== userId);
    return true;
  },

  // Add moderator to community
  addModerator: (communityId, userId) => {
    const community = communities.find(c => c.id === communityId);
    if (!community) return false;
    
    if (!community.moderators.includes(userId)) {
      community.moderators.push(userId);
      return true;
    }
    return false;
  },

  // Remove moderator from community
  removeModerator: (communityId, userId) => {
    const community = communities.find(c => c.id === communityId);
    if (!community) return false;
    
    community.moderators = community.moderators.filter(id => id !== userId);
    return true;
  }
};

// User store methods
export const userStore = {
  // Create a new user
  createUser: (userData) => {
    const newUser = {
      id: generateId(),
      ...userData
    };
    users.push(newUser);
    return newUser;
  },

  // Get user by ID
  getUser: (id) => users.find(u => u.id === id),

  // Get user by email
  getUserByEmail: (email) => users.find(u => u.email === email)
}; 