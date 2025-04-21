import { useState } from 'react';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  background: rgba(20, 20, 40, 0.8);
  border-radius: 15px;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 43, 226, 0.2);
`;

const Title = styled.h2`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #8a2be2;
  margin: 1rem 0;
`;

const Instructions = styled.p`
  color: #b8b8d1;
  margin: 1rem 0;
  line-height: 1.6;
`;

const StatusMessage = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.status === 'success' ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 71, 87, 0.2)'};
  color: ${props => props.status === 'success' ? '#2ed573' : '#ff4757'};
  border: 1px solid ${props => props.status === 'success' ? 'rgba(46, 213, 115, 0.4)' : 'rgba(255, 71, 87, 0.4)'};
`;

const PaymentButton = styled.button`
  background: linear-gradient(45deg, #8a2be2, #9370db);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1rem 0;
  width: 100%;
  max-width: 300px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  color: #b8b8d1;
  border: 1px solid #b8b8d1;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: rgba(138, 43, 226, 0.1);
    color: #8a2be2;
    border-color: #8a2be2;
  }
`;

function PaymentPortal({ game, onClose, onPaymentSuccess }) {
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      setIsProcessing(false);
      onPaymentSuccess(game);
    }, 2000);
  };

  return (
    <PaymentContainer>
      <Title>Feature Your Game</Title>
      <Price>$10</Price>
      
      <Instructions>
        Click the button below to feature your game on the main page for one month.
      </Instructions>

      <PaymentButton 
        onClick={handlePayment} 
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay $10 to Feature Game'}
      </PaymentButton>

      {paymentStatus === 'success' && (
        <StatusMessage status="success">
          Payment successful! Your game will be featured.
        </StatusMessage>
      )}

      <CloseButton onClick={onClose}>Close</CloseButton>
    </PaymentContainer>
  );
}

export default PaymentPortal; 