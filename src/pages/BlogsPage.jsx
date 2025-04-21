import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown, FaComment, FaShare, FaBookmark, FaImage } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const CommunityContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 70px);
  padding-top: 70px;
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
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(45deg, #8a2be2, #9370db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CreatePostButton = styled.button`
  background: linear-gradient(45deg, #8a2be2, #9370db);
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostCard = styled.div`
  background: rgba(20, 20, 40, 0.8);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid rgba(138, 43, 226, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(138, 43, 226, 0.3);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #9b4dca, #6a0dad);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  color: #fff;
  font-weight: 600;
  font-family: 'Rajdhani', sans-serif;
`;

const PostTime = styled.div`
  color: #b8b8d1;
  font-size: 0.8rem;
`;

const PostTitle = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Rajdhani', sans-serif;
`;

const PostContent = styled.p`
  color: #b8b8d1;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const PostActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const VoteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.voted ? '#8a2be2' : '#b8b8d1'};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(138, 43, 226, 0.1);
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #b8b8d1;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: rgba(138, 43, 226, 0.1);
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
  background: rgba(20, 20, 40, 0.95);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: #fff;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormTextarea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormButton = styled.button`
  background: linear-gradient(45deg, #8a2be2, #9370db);
  color: #fff;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  }
`;

const ImageUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

function BlogsPage() {
  const { user } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'gamer123',
      time: '2 hours ago',
      title: 'Just finished Cyberpunk 2077!',
      content: 'What an amazing game! The story and graphics are incredible. What did you all think about the ending?',
      image: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&auto=format&fit=crop&q=60',
      votes: 42,
      voted: null,
      comments: [
        { id: 1, username: 'gameDevPro', content: 'Glad you enjoyed it! The story was indeed amazing.', time: '1 hour ago' },
        { id: 2, username: 'cyberpunkFan', content: 'Which ending did you get? I got the secret ending!', time: '30 minutes ago' }
      ]
    },
    {
      id: 2,
      username: 'gameDevPro',
      time: '5 hours ago',
      title: 'New indie game release next week!',
      content: 'Excited to announce that our new game "Pixel Quest" will be releasing next week! Check out the trailer.',
      image: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=800&auto=format&fit=crop&q=60',
      votes: 28,
      voted: null,
      comments: [
        { id: 1, username: 'indieGamer', content: 'Looking forward to it! The art style looks amazing.', time: '4 hours ago' }
      ]
    }
  ]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');

  const handleVote = (postId, direction) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newVotes = post.votes + (direction === 'up' ? 1 : -1);
        return {
          ...post,
          votes: newVotes,
          voted: direction
        };
      }
      return post;
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewPost({ ...newPost, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPostObj = {
      id: posts.length + 1,
      username: user?.username || 'Anonymous',
      time: 'Just now',
      title: newPost.title,
      content: newPost.content,
      image: imagePreview,
      votes: 0,
      voted: null,
      comments: []
    };
    setPosts([newPostObj, ...posts]);
    setShowCreatePost(false);
    setNewPost({ title: '', content: '', image: null });
    setImagePreview(null);
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              username: user?.username || 'Anonymous',
              content: newComment,
              time: 'Just now'
            }
          ]
        };
      }
      return post;
    }));
    
    setNewComment('');
  };

  return (
    <CommunityContainer>
      <Header>
        <Title>Gaming Community</Title>
        <CreatePostButton onClick={() => setShowCreatePost(true)}>
          <FaImage /> Create Post
        </CreatePostButton>
      </Header>

      <PostsContainer>
        {posts.map(post => (
          <PostCard key={post.id}>
            <PostHeader>
              <UserAvatar>
                <span>👤</span>
              </UserAvatar>
              <PostInfo>
                <Username>{post.username}</Username>
                <PostTime>{post.time}</PostTime>
              </PostInfo>
            </PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
            {post.image && (
              <PostImage src={post.image} alt={post.title} />
            )}
            <PostActions>
              <VoteButton
                voted={post.voted === 'up'}
                onClick={() => handleVote(post.id, 'up')}
              >
                <FaArrowUp /> {post.votes}
              </VoteButton>
              <VoteButton
                voted={post.voted === 'down'}
                onClick={() => handleVote(post.id, 'down')}
              >
                <FaArrowDown />
              </VoteButton>
              <ActionButton onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}>
                <FaComment /> {post.comments.length} Comments
              </ActionButton>
              <ActionButton>
                <FaShare /> Share
              </ActionButton>
              <ActionButton>
                <FaBookmark /> Save
              </ActionButton>
            </PostActions>

            {selectedPost === post.id && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ marginBottom: '1rem' }}>
                  {post.comments.map(comment => (
                    <div key={comment.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#fff', fontWeight: '600' }}>{comment.username}</span>
                        <span style={{ color: '#b8b8d1', fontSize: '0.8rem' }}>{comment.time}</span>
                      </div>
                      <p style={{ color: '#b8b8d1', margin: 0 }}>{comment.content}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <FormInput
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <FormButton onClick={() => handleAddComment(post.id)}>
                    Comment
                  </FormButton>
                </div>
              </div>
            )}
          </PostCard>
        ))}
      </PostsContainer>

      {showCreatePost && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowCreatePost(false)}>×</CloseButton>
            <Form onSubmit={handleSubmit}>
              <FormInput
                type="text"
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
              />
              <FormTextarea
                placeholder="What's on your mind?"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
              />
              <ImageUpload>
                <label style={{ cursor: 'pointer' }}>
                  <FaImage style={{ marginRight: '0.5rem' }} />
                  Add Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {imagePreview && (
                  <ImagePreview src={imagePreview} alt="Preview" />
                )}
              </ImageUpload>
              <FormButton type="submit">Post</FormButton>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </CommunityContainer>
  );
}

export default BlogsPage; 