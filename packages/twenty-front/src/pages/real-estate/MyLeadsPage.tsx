import { MyLeads } from '@/real-estate/components/MyLeads';
import { mockLeads } from '@/real-estate/data/sales-tools-mock';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';

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

const Stats = styled.div`
  display: flex;
  gap: 24px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div<{ color?: string }>`
  color: ${({ color }) => color || '#ffffff'};
  font-size: 24px;
  font-weight: 600;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

export const MyLeadsPage = () => {
  const { t } = useLingui();

  const handleLeadClick = (leadId: string) => {
    // [ASSUMPTION: In real implementation, navigate to lead detail or open modal]
    console.log('Lead clicked:', leadId);
  };

  const activeLeads = mockLeads.filter((l) => l.status !== 'LOST').length;
  const overdueLeads = mockLeads.filter(
    (l) => l.slaStatus === 'OVERDUE',
  ).length;
  const warningLeads = mockLeads.filter(
    (l) => l.slaStatus === 'WARNING',
  ).length;

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Title>{t`My Leads`}</Title>
          <Subtitle>{t`Manage your leads and track SLA compliance`}</Subtitle>
        </HeaderContent>
        <Stats>
          <StatItem>
            <StatValue>{activeLeads}</StatValue>
            <StatLabel>{t`Active`}</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue color="#f59e0b">{warningLeads}</StatValue>
            <StatLabel>{t`Warning`}</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue color="#ef4444">{overdueLeads}</StatValue>
            <StatLabel>{t`Overdue`}</StatLabel>
          </StatItem>
        </Stats>
      </Header>
      <MyLeads leads={mockLeads} onLeadClick={handleLeadClick} />
    </PageContainer>
  );
};
