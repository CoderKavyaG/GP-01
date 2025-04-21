import express from 'express';
import {
  createCommunity,
  getCommunities,
  getCommunity,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity
} from '../controllers/communityController.js';

const router = express.Router();

// Community routes
router.get('/', getCommunities);
router.get('/:id', getCommunity);
router.post('/', createCommunity);
router.put('/:id', updateCommunity);
router.delete('/:id', deleteCommunity);
router.post('/:id/join', joinCommunity);
router.post('/:id/leave', leaveCommunity);

export default router; 