import { PropertyGallery } from '@/real-estate/components/PropertyGallery';
import { ReservationModal } from '@/real-estate/components/ReservationModal';
import { mockProperties } from '@/real-estate/data/mock-data';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BackButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #a0a0a0;
  margin: 0 0 24px 0;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SpecLabel = styled.div`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const SpecValue = styled.div`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

const PriceCard = styled(Card)`
  position: sticky;
  top: 24px;
`;

const PriceLabel = styled.div`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const PriceValue = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 24px;
`;

const StatusBadge = styled.div<{ status: string }>`
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 16px;
  background: ${({ status }) => {
    switch (status) {
      case 'AVAILABLE':
        return '#22c55e20';
      case 'RESERVED':
        return '#eab30820';
      case 'DEPOSIT_PAID':
        return '#f9731620';
      case 'SOLD':
        return '#991b1b20';
      default:
        return '#a0a0a020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'AVAILABLE':
        return '#22c55e';
      case 'RESERVED':
        return '#eab308';
      case 'DEPOSIT_PAID':
        return '#f97316';
      case 'SOLD':
        return '#991b1b';
      default:
        return '#a0a0a0';
    }
  }};
`;

const ReserveButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #2a2a2a;
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const NotFound = styled.div`
  color: #a0a0a0;
  font-size: 16px;
  padding: 48px;
  text-align: center;
`;

export const PropertyDetailPage = () => {
  const { t } = useLingui();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <PageContainer>
        <NotFound>{t`Property not found`}</NotFound>
      </PageContainer>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleReserve = () => {
    setIsModalOpen(false);
    // Here you would typically call an API to create the reservation
    alert(t`Reservation created successfully!`);
  };

  return (
    <PageContainer>
      <BackButton
        onClick={() => navigate(`/real-estate/projects/${property.projectId}`)}
      >
        ← {t`Back to Project`}
      </BackButton>

      <Container>
        <MainContent>
          <div>
            <Title>
              {t`Plot`} {property.plotNumber}
            </Title>
            <Subtitle>
              {t`Block`} {property.block} · {property.projectName}
            </Subtitle>
          </div>

          <PropertyGallery images={property.images || []} />

          <Card>
            <h2
              style={{
                margin: '0 0 20px 0',
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              {t`Property Specifications`}
            </h2>
            <SpecsGrid>
              <SpecItem>
                <SpecLabel>{t`Plot Number`}</SpecLabel>
                <SpecValue>{property.plotNumber}</SpecValue>
              </SpecItem>
              <SpecItem>
                <SpecLabel>{t`Block`}</SpecLabel>
                <SpecValue>{property.block}</SpecValue>
              </SpecItem>
              <SpecItem>
                <SpecLabel>{t`Area`}</SpecLabel>
                <SpecValue>{property.area} m²</SpecValue>
              </SpecItem>
              <SpecItem>
                <SpecLabel>{t`Price`}</SpecLabel>
                <SpecValue>{formatPrice(property.price)}</SpecValue>
              </SpecItem>
            </SpecsGrid>
          </Card>
        </MainContent>

        <Sidebar>
          <PriceCard>
            <PriceLabel>{t`Price`}</PriceLabel>
            <PriceValue>{formatPrice(property.price)}</PriceValue>

            <StatusBadge status={property.status}>
              {property.status.replace('_', ' ')}
            </StatusBadge>

            {property.status === 'RESERVED' && property.reservedByName && (
              <div style={{ marginBottom: 16, color: '#a0a0a0', fontSize: 14 }}>
                {t`Reserved by`}: {property.reservedByName}
                {property.reservedUntil && (
                  <div>
                    {t`Expires`}:{' '}
                    {new Date(property.reservedUntil).toLocaleString()}
                  </div>
                )}
              </div>
            )}

            <ReserveButton
              onClick={() => setIsModalOpen(true)}
              disabled={property.status !== 'AVAILABLE'}
            >
              🏠 {t`Reserve Property`}
            </ReserveButton>
          </PriceCard>
        </Sidebar>
      </Container>

      <ReservationModal
        property={property}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReserve}
      />
    </PageContainer>
  );
};
