import styled from 'styled-components';
import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarouselContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  padding: 0 2rem;
`;

const CarouselTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
  padding-left: 1rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const CarouselContent = styled.div`
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.translateX}px);
`;

const Card = styled.div`
  min-width: 300px;
  height: 400px;
  background: rgba(138, 43, 226, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
`;

const CardTitle = styled.h3`
  color: #fff;
  margin: 0;
  font-size: 1.2rem;
`;

const CardInfo = styled.p`
  color: #b8b8d1;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(138, 43, 226, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(138, 43, 226, 0.8);
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function GameCarousel({ title, items }) {
  const [translateX, setTranslateX] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    const cardWidth = 316; // 300px + 16px gap
    const newTranslate = translateX + (direction === 'left' ? cardWidth : -cardWidth);
    
    if (newTranslate > 0) {
      setTranslateX(0);
    } else if (newTranslate < maxTranslate) {
      setTranslateX(maxTranslate);
    } else {
      setTranslateX(newTranslate);
    }
  };

  // Calculate max translate on mount and window resize
  useState(() => {
    const updateMaxTranslate = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const contentWidth = items.length * 316; // 300px + 16px gap
        setMaxTranslate(containerWidth - contentWidth);
      }
    };

    updateMaxTranslate();
    window.addEventListener('resize', updateMaxTranslate);
    return () => window.removeEventListener('resize', updateMaxTranslate);
  }, [items.length]);

  return (
    <CarouselContainer>
      <CarouselTitle>{title}</CarouselTitle>
      <CarouselWrapper ref={carouselRef}>
        <NavButton 
          className="left" 
          onClick={() => handleScroll('left')}
          disabled={translateX === 0}
        >
          <FaChevronLeft />
        </NavButton>
        <CarouselContent translateX={translateX}>
          {items.map((item, index) => (
            <Card key={index}>
              <CardImage src={item.image} alt={item.title} />
              <CardOverlay>
                <CardTitle>{item.title}</CardTitle>
                <CardInfo>{item.info}</CardInfo>
              </CardOverlay>
            </Card>
          ))}
        </CarouselContent>
        <NavButton 
          className="right" 
          onClick={() => handleScroll('right')}
          disabled={translateX <= maxTranslate}
        >
          <FaChevronRight />
        </NavButton>
      </CarouselWrapper>
    </CarouselContainer>
  );
}

export default GameCarousel; 