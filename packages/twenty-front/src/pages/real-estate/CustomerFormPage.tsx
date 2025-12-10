import { CustomerForm } from '@/real-estate/components/CustomerForm';
import type { Customer } from '@/real-estate/types/customer-deal';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useNavigate, useParams } from 'react-router-dom';

const Header = styled.div`
  margin-bottom: 24px;
`;

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

export const CustomerFormPage = () => {
  const { t } = useLingui();
  const navigate = useNavigate();
  const { id } = useParams();

  // [ASSUMPTION: In real implementation, fetch customer data by id if editing]
  const customer: Customer | undefined = undefined;

  const handleSave = (customerData: Partial<Customer>) => {
    // [ASSUMPTION: In real implementation, save to backend]
    console.log('Saving customer:', customerData);
    navigate('/real-estate/customers');
  };

  const handleCancel = () => {
    navigate('/real-estate/customers');
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>← {t`Back`}</BackButton>
        <Title>{id ? t`Edit Customer` : t`New Customer`}</Title>
        <Subtitle>
          {id
            ? t`Update customer information`
            : t`Add a new customer to the system`}
        </Subtitle>
      </Header>
      <CustomerForm
        customer={customer}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
};
