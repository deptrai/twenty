import { PropertyFilter } from '@/real-estate/components/PropertyFilter';
import { mockProperties } from '@/real-estate/data/mock-data';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from 'react-router-dom';

const Header = styled.div`
  margin-bottom: 24px;
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
  margin: 0;
`;

export const PropertyFilterPage = () => {
  const { t } = useLingui();
  const navigate = useNavigate();

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/real-estate/properties/${propertyId}`);
  };

  return (
    <PageContainer>
      <Header>
        <Title>{t`Property Search`}</Title>
        <Subtitle>{t`Find the perfect property with advanced filters`}</Subtitle>
      </Header>
      <PropertyFilter
        properties={mockProperties}
        onPropertyClick={handlePropertyClick}
      />
    </PageContainer>
  );
};
