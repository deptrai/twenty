import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useEffect, useState } from 'react';
import { type Property } from '../types';

interface ReservationModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Modal = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  padding: 32px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  align-items: center;
  color: #ffffff;
  display: flex;
  font-size: 20px;
  font-weight: 600;
  gap: 12px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #a0a0a0;
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #2a2a2a;
    color: #ffffff;
  }
`;

const Summary = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const SummaryTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
`;

const SummaryDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  font-size: 14px;
`;

const DetailLabel = styled.div`
  color: #a0a0a0;
`;

const DetailValue = styled.div`
  color: #ffffff;
  font-weight: 500;
`;

const InfoSection = styled.div`
  margin-bottom: 24px;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #a0a0a0;
  line-height: 1.6;
  margin: 0;
`;

const Timer = styled.div`
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.3);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  margin-bottom: 24px;
`;

const TimerLabel = styled.div`
  font-size: 12px;
  color: #a0a0a0;
  margin-bottom: 8px;
`;

const TimerValue = styled.div`
  color: #eab308;
  font-size: 32px;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  transition: all 0.2s;

  ${({ variant = 'secondary' }) =>
    variant === 'primary'
      ? `
    background: #3b82f6;
    color: #ffffff;
    &:hover {
      background: #2563eb;
    }
  `
      : `
    background: #2a2a2a;
    color: #ffffff;
    &:hover {
      background: #3a3a3a;
    }
  `}
`;

export const ReservationModal = ({
  property,
  isOpen,
  onClose,
  onConfirm,
}: ReservationModalProps) => {
  const { t } = useLingui();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>🏠 {t`Reserve Property`}</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Summary>
          <SummaryTitle>
            {t`Plot`} {property.plotNumber} - {property.projectName}
          </SummaryTitle>
          <SummaryDetails>
            <DetailLabel>{t`Block:`}</DetailLabel>
            <DetailValue>{property.block}</DetailValue>
            <DetailLabel>{t`Area:`}</DetailLabel>
            <DetailValue>{property.area} m²</DetailValue>
            <DetailLabel>{t`Price:`}</DetailLabel>
            <DetailValue>{formatPrice(property.price)}</DetailValue>
            <DetailLabel>{t`Status:`}</DetailLabel>
            <DetailValue
              style={{ color: '#22c55e' }}
            >{t`Available`}</DetailValue>
          </SummaryDetails>
        </Summary>

        <Timer>
          <TimerLabel>{t`Reservation Period`}</TimerLabel>
          <TimerValue>{formatTime(timeLeft)}</TimerValue>
        </Timer>

        <InfoSection>
          <InfoTitle>{t`Important Information`}</InfoTitle>
          <InfoText>
            {t`This reservation will hold the property for 24 hours. During this time, you need to:`}
            <br />• {t`Complete the booking form`}
            <br />• {t`Pay the deposit (10% of property value)`}
            <br />• {t`Submit required documents`}
            <br />
            <br />
            {t`If you fail to complete these steps within 24 hours, the reservation will be automatically released.`}
          </InfoText>
        </InfoSection>

        <Actions>
          <Button variant="secondary" onClick={onClose}>
            {t`Cancel`}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {t`Confirm Reservation`}
          </Button>
        </Actions>
      </Modal>
    </Overlay>
  );
};
