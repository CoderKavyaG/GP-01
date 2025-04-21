import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const Toast = styled.div`
  background: ${props => props.type === 'success' ? 'rgba(46, 213, 115, 0.9)' : 'rgba(255, 71, 87, 0.9)'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &.exiting {
    animation: ${slideOut} 0.3s ease-out forwards;
  }
`;

const ToastComponent = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer>
      <Toast type={type}>
        {message}
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent; 