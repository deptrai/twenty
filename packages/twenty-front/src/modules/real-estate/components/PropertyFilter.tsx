import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import type { Property } from '../types';
import type { PropertySearchCriteria } from '../types/sales-tools';

const FilterContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #2a2a2a;
`;

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const Select = styled.select`
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s;
  cursor: pointer;

  &:focus {
    border-color: #3b82f6;
  }

  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
`;

const PrimaryButton = styled(Button)`
  background: #3b82f6;
  color: #ffffff;

  &:hover {
    background: #2563eb;
  }
`;

const SecondaryButton = styled(Button)`
  background: #2a2a2a;
  color: #e0e0e0;

  &:hover {
    background: #374151;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 24px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ResultsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const ResultsCount = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const PropertyCard = styled.div`
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
  }
`;

const PropertyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const PropertyTitle = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

const PropertyStatus = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ status }) => {
    switch (status) {
      case 'AVAILABLE':
        return '#15803d';
      case 'RESERVED':
        return '#b45309';
      case 'SOLD':
        return '#991b1b';
      default:
        return '#374151';
    }
  }};
  color: #ffffff;
`;

const PropertyDetails = styled.div`
  color: #a0a0a0;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 8px;
`;

const PropertyPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #22c55e;
  margin-top: 12px;
`;

interface PropertyFilterProps {
  properties: Property[];
  onPropertyClick: (propertyId: string) => void;
}

export const PropertyFilter = ({
  properties,
  onPropertyClick,
}: PropertyFilterProps) => {
  const { t } = useLingui();
  const [criteria, setCriteria] = useState<PropertySearchCriteria>({});
  const [results, setResults] = useState<Property[]>(properties);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    let filtered = [...properties];

    if (criteria.priceMin) {
      filtered = filtered.filter((p) => p.price >= criteria.priceMin!);
    }

    if (criteria.priceMax) {
      filtered = filtered.filter((p) => p.price <= criteria.priceMax!);
    }

    if (criteria.areaMin) {
      filtered = filtered.filter((p) => p.area >= criteria.areaMin!);
    }

    if (criteria.areaMax) {
      filtered = filtered.filter((p) => p.area <= criteria.areaMax!);
    }

    if (criteria.status && criteria.status.length > 0) {
      filtered = filtered.filter((p) => criteria.status!.includes(p.status));
    }

    setResults(filtered);
  };

  const handleReset = () => {
    setCriteria({});
    setResults(properties);
  };

  const formatPrice = (price: number) => {
    return (price / 1000000000).toFixed(1) + 'B VND';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return t`Available`;
      case 'RESERVED':
        return t`Reserved`;
      case 'DEPOSIT_PAID':
        return t`Deposit Paid`;
      case 'SOLD':
        return t`Sold`;
      default:
        return status;
    }
  };

  return (
    <div>
      <FilterContainer>
        <FilterForm onSubmit={handleSearch}>
          <FormRow>
            <FormGroup>
              <Label>{t`Min Price (VND)`}</Label>
              <Input
                type="number"
                placeholder={t`1000000000`}
                value={criteria.priceMin || ''}
                onChange={(e) =>
                  setCriteria({
                    ...criteria,
                    priceMin: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>{t`Max Price (VND)`}</Label>
              <Input
                type="number"
                placeholder={t`5000000000`}
                value={criteria.priceMax || ''}
                onChange={(e) =>
                  setCriteria({
                    ...criteria,
                    priceMax: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>{t`Min Area (m²)`}</Label>
              <Input
                type="number"
                placeholder={t`100`}
                value={criteria.areaMin || ''}
                onChange={(e) =>
                  setCriteria({
                    ...criteria,
                    areaMin: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>{t`Max Area (m²)`}</Label>
              <Input
                type="number"
                placeholder={t`300`}
                value={criteria.areaMax || ''}
                onChange={(e) =>
                  setCriteria({
                    ...criteria,
                    areaMax: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>{t`Status`}</Label>
              <Select
                value={criteria.status?.[0] || ''}
                onChange={(e) =>
                  setCriteria({
                    ...criteria,
                    status: e.target.value ? [e.target.value] : undefined,
                  })
                }
              >
                <option value="">{t`All Status`}</option>
                <option value="AVAILABLE">{t`Available`}</option>
                <option value="RESERVED">{t`Reserved`}</option>
                <option value="DEPOSIT_PAID">{t`Deposit Paid`}</option>
                <option value="SOLD">{t`Sold`}</option>
              </Select>
            </FormGroup>
          </FormRow>

          <ButtonGroup>
            <SecondaryButton type="button" onClick={handleReset}>
              {t`Reset`}
            </SecondaryButton>
            <PrimaryButton type="submit">{t`Search`}</PrimaryButton>
          </ButtonGroup>
        </FilterForm>
      </FilterContainer>

      <ResultsContainer>
        <ResultsHeader>
          <ResultsTitle>{t`Search Results`}</ResultsTitle>
          <ResultsCount>
            {results.length}{' '}
            {results.length === 1 ? t`property` : t`properties`} {t`found`}
          </ResultsCount>
        </ResultsHeader>

        <ResultsGrid>
          {results.map((property) => (
            <PropertyCard
              key={property.id}
              onClick={() => onPropertyClick(property.id)}
            >
              <PropertyHeader>
                <PropertyTitle>
                  {t`Plot`} {property.plotNumber} - {t`Block`} {property.block}
                </PropertyTitle>
                <PropertyStatus status={property.status}>
                  {getStatusLabel(property.status)}
                </PropertyStatus>
              </PropertyHeader>

              <PropertyDetails>
                <div>📍 {property.projectName}</div>
                <div>📐 {property.area} m²</div>
                {property.reservedByName && (
                  <div>
                    👤 {t`Reserved by:`} {property.reservedByName}
                  </div>
                )}
              </PropertyDetails>

              <PropertyPrice>{formatPrice(property.price)}</PropertyPrice>
            </PropertyCard>
          ))}
        </ResultsGrid>

        {results.length === 0 && (
          <div
            style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}
          >
            {t`No properties match your search criteria`}
          </div>
        )}
      </ResultsContainer>
    </div>
  );
};
