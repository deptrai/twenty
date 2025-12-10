import { DealKanban } from '@/real-estate/components/DealKanban';
import { mockDeals } from '@/real-estate/data/customer-deal-mock';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from 'react-router-dom';

const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContent = styled.div``;

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

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: #3b82f6;
  color: #ffffff;

  &:hover {
    background: #2563eb;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #2a2a2a;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #a0a0a0;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
`;

export const DealKanbanPage = () => {
  const { t } = useLingui();
  const navigate = useNavigate();

  const handleDealClick = (dealId: string) => {
    navigate(`/real-estate/deals/${dealId}`);
  };

  // Calculate stats
  const totalDeals = mockDeals.length;
  const totalValue = mockDeals.reduce((sum, deal) => sum + deal.dealValue, 0);
  const totalCommission = mockDeals
    .filter((d) => d.stage === 'WON')
    .reduce((sum, deal) => sum + deal.commission, 0);
  const wonDeals = mockDeals.filter((d) => d.stage === 'WON').length;

  const formatCurrency = (value: number) => {
    return (value / 1000000000).toFixed(1) + 'B VND';
  };

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Title>{t`Deal Pipeline`}</Title>
          <Subtitle>{t`Manage your sales opportunities`}</Subtitle>
        </HeaderContent>
        <Actions>
          <Button onClick={() => navigate('/real-estate/customers/new')}>
            + {t`New Customer`}
          </Button>
        </Actions>
      </Header>

      <Stats>
        <StatCard>
          <StatLabel>{t`Total Deals`}</StatLabel>
          <StatValue>{totalDeals}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>{t`Pipeline Value`}</StatLabel>
          <StatValue style={{ color: '#3b82f6' }}>
            {formatCurrency(totalValue)}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>{t`Won Deals`}</StatLabel>
          <StatValue style={{ color: '#22c55e' }}>{wonDeals}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>{t`Total Commission`}</StatLabel>
          <StatValue style={{ color: '#f59e0b' }}>
            {formatCurrency(totalCommission)}
          </StatValue>
        </StatCard>
      </Stats>

      <DealKanban deals={mockDeals} onDealClick={handleDealClick} />
    </PageContainer>
  );
};
