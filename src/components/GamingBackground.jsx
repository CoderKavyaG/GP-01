import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%);
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(138, 43, 226, 0.2);
  border-radius: 50%;
  animation: ${float} ${props => props.duration || '6s'} infinite ease-in-out;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  opacity: ${props => props.opacity};
`;

const Glow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
  animation: ${pulse} 4s infinite ease-in-out;
`;

const Grid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
`;

function GamingBackground() {
  const particles = [
    { left: 10, top: 20, size: 100, opacity: 0.1, duration: '8s' },
    { left: 80, top: 40, size: 150, opacity: 0.15, duration: '10s' },
    { left: 30, top: 70, size: 80, opacity: 0.2, duration: '7s' },
    { left: 70, top: 10, size: 120, opacity: 0.1, duration: '9s' },
    { left: 50, top: 50, size: 200, opacity: 0.05, duration: '12s' },
  ];

  return (
    <BackgroundContainer>
      <Grid />
      <Glow />
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
    </BackgroundContainer>
  );
}

export default GamingBackground; 