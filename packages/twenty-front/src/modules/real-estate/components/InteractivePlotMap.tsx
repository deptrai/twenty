import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import type { PlotProperty } from '../data/executive-mock';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledControls = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 14px;
  cursor: pointer;
`;

const StyledCheckboxGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-left: auto;
`;

const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: 13px;
  color: ${({ theme }) => theme.font.color.secondary};
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;

const StyledMapSection = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledSVGContainer = styled.div`
  width: 100%;
  height: 500px;
  background: ${({ theme }) => theme.background.primary};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  position: relative;
  overflow: hidden;
`;

const StyledSVG = styled.svg`
  height: 100%;
  width: 100%;
`;

const StyledPlotPolygon = styled.polygon<{
  $status: string;
  $filtered: boolean;
}>`
  stroke: ${({ theme }) => theme.border.color.strong};
  stroke-width: 1.5;
  cursor: pointer;
  opacity: ${({ $filtered }) => ($filtered ? 0.2 : 1)};
  transition:
    opacity 0.3s ease,
    filter 0.2s ease;

  fill: ${({ $status }) => {
    switch ($status) {
      case 'available':
        return '#22c55e'; // Green
      case 'reserved':
        return '#eab308'; // Yellow
      case 'deposit':
        return '#f97316'; // Orange
      case 'sold':
        return '#ef4444'; // Red
      default:
        return '#9ca3af'; // Gray
    }
  }};

  &:hover {
    filter: brightness(1.2);
  }
`;

const StyledLegend = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border.color.medium};
  display: flex;
  gap: ${({ theme }) => theme.spacing(6)};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-top: ${({ theme }) => theme.spacing(4)};
`;

const StyledLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: 13px;
  color: ${({ theme }) => theme.font.color.secondary};
`;

const StyledLegendColor = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  background: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.border.color.strong};
`;

const StyledLegendCount = styled.span`
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: 600;
`;

const StyledPreview = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const StyledPreviewTitle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.medium};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 15px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledPreviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
`;

const StyledPreviewLabel = styled.div`
  color: ${({ theme }) => theme.font.color.tertiary};
`;

const StyledPreviewValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: 500;
`;

const StyledPreviewButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
    background: #3b82f6;
    color: white;
    border: none;

    &:hover {
      background: #2563eb;
    }
  `
      : `
    background: transparent;
    color: ${theme.font.color.tertiary};
    border: 1px solid ${theme.border.color.medium};

    &:hover {
      background: ${theme.background.transparent.light};
    }
  `}
`;

interface InteractivePlotMapProps {
  properties: PlotProperty[];
  projectId?: string;
  onPlotClick?: (propertyId: string) => void;
}

export const InteractivePlotMap = ({
  properties,
  onPlotClick,
}: InteractivePlotMapProps) => {
  const { t } = useLingui();
  const [selectedPlot, setSelectedPlot] = useState<PlotProperty | null>(null);
  const [filters, setFilters] = useState({
    available: true,
    reserved: true,
    deposit: true,
    sold: true,
  });

  const handlePlotClick = (plot: PlotProperty) => {
    setSelectedPlot(plot);
    onPlotClick?.(plot.id);
  };

  const toggleFilter = (status: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  const shouldShowPlot = (status: PlotProperty['status']) => {
    return filters[status];
  };

  const getStatusCounts = () => {
    return {
      available: properties.filter((p) => p.status === 'available').length,
      reserved: properties.filter((p) => p.status === 'reserved').length,
      deposit: properties.filter((p) => p.status === 'deposit').length,
      sold: properties.filter((p) => p.status === 'sold').length,
    };
  };

  const formatCurrency = (value: number) => {
    return (value / 1000000000).toFixed(1) + 'B VND';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return t`Available`;
      case 'reserved':
        return t`Reserved`;
      case 'deposit':
        return t`Deposit Paid`;
      case 'sold':
        return t`Sold`;
      default:
        return status;
    }
  };

  const statusCounts = getStatusCounts();

  return (
    <StyledContainer>
      <StyledControls>
        <span>{t`Project:`}</span>
        <StyledSelect>
          <option>Sunrise City</option>
          <option>Green Hill Garden</option>
          <option>Ocean View</option>
        </StyledSelect>

        <StyledCheckboxGroup>
          <StyledCheckboxLabel>
            <input
              type="checkbox"
              checked={filters.available}
              onChange={() => toggleFilter('available')}
            />
            {t`Available`}
          </StyledCheckboxLabel>
          <StyledCheckboxLabel>
            <input
              type="checkbox"
              checked={filters.reserved}
              onChange={() => toggleFilter('reserved')}
            />
            {t`Reserved`}
          </StyledCheckboxLabel>
          <StyledCheckboxLabel>
            <input
              type="checkbox"
              checked={filters.deposit}
              onChange={() => toggleFilter('deposit')}
            />
            {t`Deposit`}
          </StyledCheckboxLabel>
          <StyledCheckboxLabel>
            <input
              type="checkbox"
              checked={filters.sold}
              onChange={() => toggleFilter('sold')}
            />
            {t`Sold`}
          </StyledCheckboxLabel>
        </StyledCheckboxGroup>
      </StyledControls>

      <StyledMapSection>
        <StyledSVGContainer>
          <StyledSVG viewBox="0 0 640 500">
            {properties.map((plot) => (
              <StyledPlotPolygon
                key={plot.id}
                points={plot.coordinates}
                $status={plot.status}
                $filtered={!shouldShowPlot(plot.status)}
                onClick={() => handlePlotClick(plot)}
              >
                <title>
                  {plot.plotId} - {getStatusLabel(plot.status)} - {plot.area}m²
                  - {formatCurrency(plot.price)}
                </title>
              </StyledPlotPolygon>
            ))}
          </StyledSVG>
        </StyledSVGContainer>

        <StyledLegend>
          <StyledLegendItem>
            <StyledLegendColor $color="#22c55e" />
            🟢 {t`Available`} (
            <StyledLegendCount>{statusCounts.available}</StyledLegendCount>)
          </StyledLegendItem>
          <StyledLegendItem>
            <StyledLegendColor $color="#eab308" />
            🟡 {t`Reserved`} (
            <StyledLegendCount>{statusCounts.reserved}</StyledLegendCount>)
          </StyledLegendItem>
          <StyledLegendItem>
            <StyledLegendColor $color="#f97316" />
            🟠 {t`Deposit`} (
            <StyledLegendCount>{statusCounts.deposit}</StyledLegendCount>)
          </StyledLegendItem>
          <StyledLegendItem>
            <StyledLegendColor $color="#ef4444" />
            🔴 {t`Sold`} (
            <StyledLegendCount>{statusCounts.sold}</StyledLegendCount>)
          </StyledLegendItem>
        </StyledLegend>
      </StyledMapSection>

      {selectedPlot && (
        <StyledPreview>
          <StyledPreviewTitle>
            {t`Selected:`} {selectedPlot.plotId}
          </StyledPreviewTitle>
          <StyledPreviewGrid>
            <StyledPreviewItem>
              <StyledPreviewLabel>{t`Plot:`}</StyledPreviewLabel>
              <StyledPreviewValue>{selectedPlot.plotId}</StyledPreviewValue>
            </StyledPreviewItem>
            <StyledPreviewItem>
              <StyledPreviewLabel>{t`Block:`}</StyledPreviewLabel>
              <StyledPreviewValue>{selectedPlot.blockId}</StyledPreviewValue>
            </StyledPreviewItem>
            <StyledPreviewItem>
              <StyledPreviewLabel>{t`Status:`}</StyledPreviewLabel>
              <StyledPreviewValue>
                {getStatusLabel(selectedPlot.status)}
              </StyledPreviewValue>
            </StyledPreviewItem>
            <StyledPreviewItem>
              <StyledPreviewLabel>{t`Area:`}</StyledPreviewLabel>
              <StyledPreviewValue>{selectedPlot.area} m²</StyledPreviewValue>
            </StyledPreviewItem>
            <StyledPreviewItem>
              <StyledPreviewLabel>{t`Price:`}</StyledPreviewLabel>
              <StyledPreviewValue>
                {formatCurrency(selectedPlot.price)}
              </StyledPreviewValue>
            </StyledPreviewItem>
          </StyledPreviewGrid>
          <StyledPreviewButtons>
            <StyledButton $variant="primary">{t`View Details`}</StyledButton>
            {selectedPlot.status === 'available' && (
              <StyledButton>{t`Reserve`}</StyledButton>
            )}
          </StyledPreviewButtons>
        </StyledPreview>
      )}
    </StyledContainer>
  );
};
