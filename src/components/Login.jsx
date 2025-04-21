import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(20, 20, 40, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(138, 43, 226, 0.2);
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(45deg, #8a2be2, #9370db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  background: linear-gradient(45deg, #8a2be2, #9370db);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #8a2be2;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  text-align: center;
  margin-top: 1rem;
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = isLogin
      ? await login(username, password)
      : await signup(username, password);

    if (!result.success) {
      setError(result.error);
      toast.error(result.error);
    } else {
      toast.success(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
    }
  };

  return (
    <LoginContainer>
      <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
        <ToggleButton
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Login'}
        </ToggleButton>
      </Form>
    </LoginContainer>
  );
};

export default Login; 