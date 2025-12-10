import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import type { Customer } from '../types/customer-deal';

const FormContainer = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  padding: 32px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 24px 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormGroupFull = styled(FormGroup)`
  grid-column: span 2;
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

const TextArea = styled.textarea`
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s;
  min-height: 100px;
  resize: vertical;

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

const BudgetGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const ButtonGroup = styled.div`
  grid-column: span 2;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
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

interface CustomerFormProps {
  customer?: Customer;
  onSave: (customer: Partial<Customer>) => void;
  onCancel: () => void;
}

export const CustomerForm = ({
  customer,
  onSave,
  onCancel,
}: CustomerFormProps) => {
  const { t } = useLingui();

  const [formData, setFormData] = useState<Partial<Customer>>({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    budget: customer?.budget || { min: 0, max: 0 },
    locations: customer?.locations || [],
    propertyTypes: customer?.propertyTypes || [],
    leadSource: customer?.leadSource || 'Website',
    assignedTo: customer?.assignedTo || 'agent-1',
    notes: customer?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCurrency = (value: number) => {
    return (value / 1000000000).toFixed(1) + 'B VND';
  };

  return (
    <FormContainer>
      <FormTitle>{customer ? t`Edit Customer` : t`New Customer`}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label>{t`Full Name *`}</Label>
            <Input
              type="text"
              placeholder={t`Enter customer name`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>{t`Email *`}</Label>
            <Input
              type="email"
              placeholder={t`email@example.com`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>{t`Phone Number *`}</Label>
            <Input
              type="tel"
              placeholder={t`+84 90 123 4567`}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>{t`Lead Source`}</Label>
            <Select
              value={formData.leadSource}
              onChange={(e) =>
                setFormData({ ...formData, leadSource: e.target.value })
              }
            >
              <option value="Website">{t`Website`}</option>
              <option value="Facebook Ads">{t`Facebook Ads`}</option>
              <option value="Google Ads">{t`Google Ads`}</option>
              <option value="Referral">{t`Referral`}</option>
              <option value="Walk-in">{t`Walk-in`}</option>
              <option value="Other">{t`Other`}</option>
            </Select>
          </FormGroup>

          <FormGroupFull>
            <Label>{t`Budget Range`}</Label>
            <BudgetGroup>
              <div>
                <Label style={{ marginBottom: '8px' }}>{t`Minimum`}</Label>
                <Input
                  type="number"
                  placeholder="2000000000"
                  value={formData.budget?.min || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budget: {
                        ...formData.budget!,
                        min: Number(e.target.value),
                      },
                    })
                  }
                />
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: '4px',
                  }}
                >
                  {formData.budget?.min
                    ? formatCurrency(formData.budget.min)
                    : '0B VND'}
                </div>
              </div>
              <div>
                <Label style={{ marginBottom: '8px' }}>{t`Maximum`}</Label>
                <Input
                  type="number"
                  placeholder="3000000000"
                  value={formData.budget?.max || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budget: {
                        ...formData.budget!,
                        max: Number(e.target.value),
                      },
                    })
                  }
                />
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: '4px',
                  }}
                >
                  {formData.budget?.max
                    ? formatCurrency(formData.budget.max)
                    : '0B VND'}
                </div>
              </div>
            </BudgetGroup>
          </FormGroupFull>

          <FormGroupFull>
            <Label>{t`Preferred Locations (comma-separated)`}</Label>
            <Input
              type="text"
              placeholder={t`District 9, District 2, Vung Tau`}
              value={formData.locations?.join(', ') || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  locations: e.target.value
                    .split(',')
                    .map((l) => l.trim())
                    .filter(Boolean),
                })
              }
            />
          </FormGroupFull>

          <FormGroupFull>
            <Label>{t`Property Types (comma-separated)`}</Label>
            <Input
              type="text"
              placeholder={t`Villa, Apartment, Townhouse`}
              value={formData.propertyTypes?.join(', ') || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  propertyTypes: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
          </FormGroupFull>

          <FormGroupFull>
            <Label>{t`Notes`}</Label>
            <TextArea
              placeholder={t`Additional information about the customer...`}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </FormGroupFull>

          <ButtonGroup>
            <SecondaryButton type="button" onClick={onCancel}>
              {t`Cancel`}
            </SecondaryButton>
            <PrimaryButton type="submit">
              {customer ? t`Update Customer` : t`Create Customer`}
            </PrimaryButton>
          </ButtonGroup>
        </FormGrid>
      </form>
    </FormContainer>
  );
};
