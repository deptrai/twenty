import { InteractivePlotMap } from '@/real-estate/components/InteractivePlotMap';
import { mockPlotProperties } from '@/real-estate/data/executive-mock';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';

const StyledHeader = styled.div`
  margin-bottom: 24px;
  padding: 20px;
`;

const StyledTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0 0 8px 0;
`;

const StyledSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.font.color.tertiary};
  margin: 0;
`;

const StyledContent = styled.div`
  padding: 0 20px 20px 20px;
`;

export const PlotMapPage = () => {
  const { t } = useLingui();

  const handlePlotClick = (propertyId: string) => {
    console.log('Plot clicked:', propertyId);
  };

  return (
    <PageContainer>
      <StyledHeader>
        <StyledTitle>{t`🗺️ Interactive Plot Map`}</StyledTitle>
        <StyledSubtitle>
          {t`Visual master plan with real-time property status`}
        </StyledSubtitle>
      </StyledHeader>
      <StyledContent>
        <InteractivePlotMap
          properties={mockPlotProperties}
          onPlotClick={handlePlotClick}
        />
      </StyledContent>
    </PageContainer>
  );
};
