import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';

interface PropertyGalleryProps {
  images: string[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MainImage = styled.div`
  position: relative;
  height: 480px;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavButton)`
  left: 16px;
`;

const NextButton = styled(NavButton)`
  right: 16px;
`;

const Counter = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  bottom: 16px;
  color: white;
  font-size: 14px;
  left: 50%;
  padding: 8px 16px;
  position: absolute;
  transform: translateX(-50%);
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 3px;
  }
`;

const Thumbnail = styled.div<{ active: boolean }>`
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  border: 2px solid ${({ active }) => (active ? '#3b82f6' : 'transparent')};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ active }) => (active ? '#3b82f6' : '#a0a0a0')};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PropertyGallery = ({ images }: PropertyGalleryProps) => {
  const { t } = useLingui();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Container>
        <MainImage>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#a0a0a0',
            }}
          >
            {t`No images available`}
          </div>
        </MainImage>
      </Container>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Container>
      <MainImage>
        <Image
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
        />
        {images.length > 1 && (
          <>
            <PrevButton onClick={handlePrev}>‹</PrevButton>
            <NextButton onClick={handleNext}>›</NextButton>
            <Counter>
              {currentIndex + 1} / {images.length}
            </Counter>
          </>
        )}
      </MainImage>

      {images.length > 1 && (
        <Thumbnails>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </Thumbnail>
          ))}
        </Thumbnails>
      )}
    </Container>
  );
};
